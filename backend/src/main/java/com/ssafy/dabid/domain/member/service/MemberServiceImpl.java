package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.member.dto.PointDto;
import com.ssafy.dabid.domain.member.dto.request.*;
import com.ssafy.dabid.domain.member.dto.response.*;
import com.ssafy.dabid.domain.member.entity.Account;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.entity.Role;
import com.ssafy.dabid.domain.member.repository.MemberAccountRepository;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.domain.member.repository.RandomNicknameMapper;
import com.ssafy.dabid.global.api.ssafy.SsafyApiClient;
import com.ssafy.dabid.global.api.ssafy.SsafyApiException;
import com.ssafy.dabid.global.api.ssafy.response.*;
import com.ssafy.dabid.global.config.CoolSMSConfig;
import com.ssafy.dabid.global.error.GlobalExceptionHandler;
import com.ssafy.dabid.global.status.CommonResponseDto;
import com.ssafy.dabid.global.status.StatusCode;
import com.ssafy.dabid.global.status.StatusMessage;
import com.ssafy.dabid.global.utils.JwtUtils;
import com.ssafy.dabid.global.utils.RedisUtil;
import com.ssafy.dabid.global.utils.S3Util;
import com.ssafy.dabid.global.utils.TokenType;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.function.Function;

import static com.ssafy.dabid.global.consts.StaticConst.ADMIN_ACCOUNT;
import static com.ssafy.dabid.global.consts.StaticConst.ADMIN_USER_KEY;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private static final Logger log = LoggerFactory.getLogger(MemberServiceImpl.class);
    private final MemberRepository memberRepository;
    private final RandomNicknameMapper mapper;
    private final SsafyApiClient ssafyApiClient;

    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final RandomNicknameMapper randomNicknameMapper;
    private final MemberAccountRepository memberAccountRepository;
    private final DefaultMessageService messageService;
    private final RedisUtil redisUtil;
    private final S3Util s3Util;

    private Map<ValueType, Function<String, Optional<?>>> checkFunctions;
    private Map<ValueType, Pair<String, String>> responseMappings;

    @PostConstruct
    void init(){
        checkFunctions = Map.of(
                ValueType.EMAIL, memberRepository::findByEmail,
                ValueType.PHONE, memberRepository::findByPhoneNumber,
                ValueType.NICKNAME, memberRepository::findByNickname
        );

        responseMappings = Map.of(
                ValueType.EMAIL, Pair.of(StatusCode.DUPLICATE_EMAIL, StatusMessage.DUPLICATE_EMAIL),
                ValueType.PHONE, Pair.of(StatusCode.DUPLICATE_PHONE_NUMBER, StatusMessage.DUPLICATE_PHONE_NUMBER),
                ValueType.NICKNAME, Pair.of(StatusCode.DUPLICATE_NICKNAME, StatusMessage.DUPLICATE_NICKNAME)
        );
    }

    @Override
    public CommonResponseDto signUp(SignUpRequestDto dto) {
        log.info("Sign-up user with email {}", dto.getEmail());
        //이메일, 휴대폰번호 중복 체크를 다시 해야할까?
        try {
            String profileUrl = s3Util.uploadFile(dto.getImage());

            Member member = Member
                    .builder()
                    .email(dto.getEmail())
                    .role(Role.USER)
                    .password(passwordEncoder.encode(dto.getPassword()))
                    .nickname(dto.getNickname())
                    .phoneNumber(dto.getPhoneNumber())
                    .imageUrl(profileUrl)
                    .build();

            //랜덤 생성 닉네임에 포함되는 닉네임일 경우 사용 여부 갱신
            randomNicknameMapper.updateUsed(dto.getNickname());

            //금융망 API 를 통해 userKey 등록
            String userKey = generateKey(member.getEmail());
            log.info("{}", userKey);
            member.addKey(userKey);

            //계좌 생성 후 repository 에 저장
            String accountNo = generateAccount(userKey);
            Account account = Account
                    .builder()
                    .account_number(accountNo)
                    .member(member)
                    .build();

            //계좌는 인증 전까지 사용 불가
            account.kill();

            memberAccountRepository.save(account);

            //서비스 이용을 위한 기본금 지급
            ssafyApiClient.depositIn(userKey, accountNo, "1000000");
            memberRepository.save(member);

            return new CommonResponseDto();
        }
        catch (Exception e){
            return CommonResponseDto.fail();
        }
    }

    private String generateKey(String email){
        log.info("Trying to generate ssafy api userkey with email {}", email);
        try {
            return ssafyApiClient.registerUserKey(email).getUserKey();
        } catch (SsafyApiException e1) {
            if(e1.getCode().equals("E4002")){
                try {
                    log.info("Trying to search existing ssafy api userkey with email {}", email);
                    return ssafyApiClient.searchUserKey(email).getUserKey();
                } catch (SsafyApiException e2) {
                    throw new RuntimeException(e2.getMessage());
                }
            }
            throw new RuntimeException(e1.getMessage());
        }
    }

    private String generateAccount(String userKey){
        CreateAccountResponse response = ssafyApiClient.createAccount(userKey);
        return response.getRec().getAccountNo();
    }

    @Override
    public CommonResponseDto signIn(SignInRequestDto dto) {
        Member member = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (passwordEncoder.matches(dto.getPassword(), member.getPassword())){
            String access = jwtUtils.createToken(member.getEmail(), TokenType.ACCESS);
            String refresh = jwtUtils.createToken(null, TokenType.REFRESH);
            member.updateRefreshToken(refresh);

            return new SignInResponseDto(access, refresh);
        }
        return CommonResponseDto.fail();
    }

    @Override
    public CommonResponseDto signOut(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        member.updateRefreshToken(null);

        return new CommonResponseDto();
    }

    @Override
    public CommonResponseDto refresh(RefreshRequestDto dto) {
        Member member = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(dto.getRefreshToken().equals(member.getRefreshToken()))
            return new RefreshResponseDto(jwtUtils.createToken(dto.getEmail(), TokenType.ACCESS));

        return CommonResponseDto.fail();
    }

    @Override
    @Transactional(readOnly = true)
    public CommonResponseDto checkDuplicate(CheckRequestDto dto) {
        ValueType valueType = dto.getValueType();
        String value = dto.getValue();

        if (checkFunctions.containsKey(valueType)) {
            if (checkFunctions.get(valueType).apply(value).isPresent()) {
                Pair<String, String> status = responseMappings.get(valueType);
                return new CommonResponseDto(status.getFirst(), status.getSecond());
            }
            return new CommonResponseDto();
        }

        return CommonResponseDto.fail();
    }

    @Override
    @Transactional(readOnly = true)
    public CommonResponseDto generateNickname() {
        try {
            return new RandomNicknameResponseDto(mapper.selectRandomNickname());
        } catch (Exception e){
            return CommonResponseDto.fail();
        }
    }

    @Override
    public CommonResponseDto pointIn(PointDto dto) {
        String transactionBalance = dto.getAmount();

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String userKey = member.getUserKey();
        Account account = memberAccountRepository.findByMember(member);

        if (!account.getIsActive()) {
            return new CommonResponseDto(StatusCode.NOT_VERIFIED_ACCOUNT, StatusMessage.NOT_VERIFIED_ACCOUNT);
        }
        String userAccountNo = account.getAccount_number();

        TransferResponse response = ssafyApiClient.deposit(userKey, ADMIN_ACCOUNT, userAccountNo, transactionBalance);
        if (response.getHeader().getResponseCode().equals("H0000")) {
            member.increasePoint(Integer.parseInt(transactionBalance));
            return new CommonResponseDto();
        }

        log.error(response.getHeader().getResponseMessage());
        return CommonResponseDto.fail();
    }

    @Override
    public CommonResponseDto pointOut(PointDto dto) {
        String transactionBalance = dto.getAmount();

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Account account = memberAccountRepository.findByMember(member);

        if (!account.getIsActive()) {
            return new CommonResponseDto(StatusCode.NOT_VERIFIED_ACCOUNT, StatusMessage.NOT_VERIFIED_ACCOUNT);
        }

        if (Integer.parseInt(transactionBalance) > member.getPoint()) {
            return new CommonResponseDto(StatusCode.NOT_ENOUGH_POINTS, StatusMessage.NOT_ENOUGH_POINTS);
        }
        String userAccountNo = account.getAccount_number();

        TransferResponse response = ssafyApiClient.deposit(ADMIN_USER_KEY, userAccountNo, ADMIN_ACCOUNT, transactionBalance);
        if (response.getHeader().getResponseCode().equals("H0000")) {
            member.decreasePoint(Integer.parseInt(transactionBalance));
            return new CommonResponseDto();
        }

        log.error(response.getHeader().getResponseMessage());
        return CommonResponseDto.fail();
    }

    @Override
    @Transactional(readOnly = true)
    public CommonResponseDto transaction() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Account account = memberAccountRepository.findByMember(member);
        String accountNo = account.getAccount_number();
        String userKey = member.getUserKey();

        TransactionHistoryResponse response = ssafyApiClient.transactionHistory(userKey, accountNo);
        TransactionResponseDto dto = new TransactionResponseDto();

        List<TransactionHistoryResponse.Rec.HistoryItem> list1 = response.getRec().getList();

        List<TransactionResponseDto.HistoryItem> list = response.getRec().getList().stream()
                .map(item -> TransactionResponseDto.HistoryItem.builder()
                        .transactionDate(item.getTransactionDate())
                        .transactionTime(item.getTransactionTime())
                        .transactionTypeName(item.getTransactionTypeName())
                        .transactionAccountNo(item.getTransactionAccountNo())
                        .transactionBalance(item.getTransactionBalance())
                        .transactionAfterBalance(item.getTransactionAfterBalance())
                        .transactionSummary(item.getTransactionSummary())
                        .build()).toList();

        dto.setList(list);
        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public CommonResponseDto balance() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Account account = memberAccountRepository.findByMember(member);
        String accountNo = account.getAccount_number();
        String userKey = member.getUserKey();

        AccountBalanceResponse response = ssafyApiClient.accountBalance(userKey, accountNo);
        BalanceResponseDto dto = new BalanceResponseDto();
        dto.setBalance(String.valueOf(response.getRec().getAccountBalance()));

        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public CommonResponseDto requestAccountAuth() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Account account = memberAccountRepository.findByMember(member);
        if(account.getIsActive()){
            return new CommonResponseDto("AV", "Already Validated.");
        }

        String accountNo = account.getAccount_number();
        String userKey = member.getUserKey();

        try {
            AccountAuthResponse response = ssafyApiClient.accountAuth(userKey, accountNo);
            if(response.getHeader().getResponseCode().equals("H0000"))
                return new CommonResponseDto();
            return new CommonResponseDto(StatusCode.EXTERNAL_API_ERROR, StatusCode.EXTERNAL_API_ERROR);
        } catch (Exception e) {
            return CommonResponseDto.fail();
        }
    }

    @Override
    public CommonResponseDto checkAccountAuth(AuthCheckRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Account account = memberAccountRepository.findByMember(member);
        if(account.getIsActive()){
            return new CommonResponseDto("AV", "Already Validated.");
        }

        String accountNo = account.getAccount_number();
        String userKey = member.getUserKey();
        CheckAuthCodeResponse response = ssafyApiClient.checkAuth(userKey, accountNo, dto.getCode());

        try{
            if(response.getRec().getStatus().equals("SUCCESS")){
                account.validate();
                return new CommonResponseDto();
            }
            return CommonResponseDto.fail();
        } catch (Exception e) {
            return CommonResponseDto.fail();
        }
    }

    @Override
    public CommonResponseDto requestPhoneAuth(PhoneAuthRequestDto dto) {
        String phoneNumber = dto.getPhoneNumber();

        // 전화번호 중복 확인?
        CheckRequestDto checkDto = new CheckRequestDto();
        checkDto.setValue(phoneNumber);
        checkDto.setValueType(ValueType.PHONE);
        if (checkDuplicate(checkDto).getCode().equals("VF")) {
            return CommonResponseDto.fail();
        }

        // 인증 코드 생성 00000 ~ 99999
        StringBuilder sb = new StringBuilder(5);
        Random random = new SecureRandom();
        for (int i = 0; i < 5; i++) {
            int randomIndex = random.nextInt(10);
            sb.append("0123456789".charAt(randomIndex));
        }
        String code = sb.toString();

        System.out.println("code = " + code);

        // 인증 코드 저장, 만료 시간 설정
        redisUtil.setData(phoneNumber, code);
        redisUtil.setDataExpire(phoneNumber, code, 60 * 5L);


        // 인증 코드 SMS 발송
        Message message = new Message();
        message.setFrom(CoolSMSConfig.SENDER);
        message.setTo(phoneNumber);
        message.setText("다비드 휴대전화 인증 코드: " + code);

        SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));

        return new CommonResponseDto();
    }

    @Override
    public CommonResponseDto checkPhoneAuth(CheckPhoneAuthRequestDto dto) {
        String phoneNumber = dto.getPhoneNumber();
        String code = dto.getCode();

        if (!redisUtil.getData(phoneNumber).equals(code)) {
            return CommonResponseDto.fail();
        }

        return new CommonResponseDto();
    }

    @Override
    public CommonResponseDto getUserInfo() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Account account = memberAccountRepository.findByMember(member);

        GetUserInfoResponseDto dto = new GetUserInfoResponseDto();
        dto.setEmail(member.getEmail());
        dto.setRole(String.valueOf(member.getRole()));
        dto.setPoint(member.getPoint());
        dto.setNickname(member.getNickname());
        dto.setImageUrl(s3Util.generateFileUrl(member.getImageUrl()));
        dto.setPhoneNumber(member.getPhoneNumber());
        dto.setAccountNo(account.getAccount_number());
        dto.setAccountActive(account.getIsActive());

        return dto;
    }

    @Override
    public void checkEmailNonNative(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        memberRepository.findByEmail(email);
    }

    @Override
    public void checkEmailNative(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        memberRepository.findByEmailNative(email);
    }
}
