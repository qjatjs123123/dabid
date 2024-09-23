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
import com.ssafy.dabid.global.api.ssafy.response.*;
import com.ssafy.dabid.global.status.CommonResponseDto;
import com.ssafy.dabid.global.status.StatusCode;
import com.ssafy.dabid.global.status.StatusMessage;
import com.ssafy.dabid.global.utils.JwtUtils;
import com.ssafy.dabid.global.utils.TokenType;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.util.Pair;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
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
        Member member = Member
                .builder()
                .email(dto.getEmail())
                .role(Role.USER)
                .password(passwordEncoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .phoneNumber(dto.getPhoneNumber())
                .build();
        
        //랜덤 생성 닉네임에 포함되는 닉네임일 경우 사용 여부 갱신
        randomNicknameMapper.updateUsed(dto.getNickname());

        //금융망 API 를 통해 userKey 등록
        String userKey = generateKey(member.getEmail());
        member.addKey(userKey);

        //계좌 생성 후 repository 에 저장
        String accountNo = generateAccount(userKey);
        Account account = Account
                .builder()
                .account_number(accountNo)
                .member(member)
                .build();

        account.kill();

        memberAccountRepository.save(account);
        
        //서비스 이용을 위한 기본금 지급
        ssafyApiClient.depositIn(userKey, accountNo, "1000000");
        memberRepository.save(member);

        return new CommonResponseDto();
    }

    private String generateKey(String email){
        GetUserKeyResponse response = ssafyApiClient.registerUserKey(email);
        return response.getUserKey();
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
        return null;
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
    public CommonResponseDto requestAuth() {
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
    public CommonResponseDto checkAuth(AuthCheckRequestDto dto) {
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
}
