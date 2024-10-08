import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, randomNickname, phoneNumberAuth, phoneNumberCheck, checkDuplication } from '../../api/MemberAPI'; // API 호출 import
import { DELAY_TIME_END_LONG, MEMBER_API_URL, MESSAGE, PAGE_URL } from '../../util/Constants';
import { useRecoilState } from 'recoil';
import { loginState } from '../../stores/recoilStores/Member/loginState';
import axios from 'axios';
import { init } from '../../api/ChatbotAPI';
import { apiState } from '../../stores/recoilStores/Message/apiState';
import { delaySetApiInfo } from '../../util/Functions';
import { UserInfo, userState } from '../../stores/recoilStores/Member/userState';

const SignUp: React.FC = () => {
  const [_, setToken] = useRecoilState(loginState); // 컴포넌트 최상위에서 호출
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const [apiInfo, setApiInfo] = useRecoilState(apiState);
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    verificationCode: '',
  });

  const [duplicateStatus, setDuplicateStatus] = useState({
    email: false,
    nickname: false,
    phone: false,
  });

  const [passwordStatus, setPasswordStatus] = useState({
    password: false,
    password_check: false,
  });

  const [phoneStatus, setPhoneStatus] = useState({
    duplicated: false,
    success: false,
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
    phoneVerification: false,
    nullEmail: false,
    nullNickname: false,
    nullPhoneNumber: false,
    nullProfileImage: false,
    emailExists: false,
    nicknameExists: false,
    phoneExists: false,
    phoneFormatError: false,
    passwordFormatError: false,
    emailFormatterError: false,
  });

  const canSubmit = () => {
    return (
      !errors.passwordMismatch &&
      !errors.emailExists &&
      !errors.nicknameExists &&
      !errors.phoneExists &&
      !errors.phoneFormatError &&
      !errors.nullEmail &&
      !errors.nullNickname &&
      !errors.nullPhoneNumber &&
      !errors.emailFormatterError &&
      !errors.passwordFormatError &&
      isPhoneVerified &&
      passwordStatus.password &&
      passwordStatus.password_check &&
      duplicateStatus.email &&
      duplicateStatus.nickname &&
      duplicateStatus.phone &&
      imagePreview
    );
  };

  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
  // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,13}$/;
  // 비밀번호: 최소 8자, 최대 13자, 문자 숫자 특수문자 포함

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const formattedValue = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // 입력값 변경 시 중복 확인 상태 초기화
    if (name === 'email') {
      setDuplicateStatus({ ...duplicateStatus, email: false });
      // 이메일 정규식 확인
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, emailFormatterError: true });
      } else {
        setErrors({ ...errors, emailFormatterError: false });
      }
    }

    if (name === 'nickname') {
      setDuplicateStatus({ ...duplicateStatus, nickname: false });
    }

    if (name === 'password') {
      // 비밀번호 정규식 확인
      if (!passwordRegex.test(value)) {
        setErrors({ ...errors, passwordFormatError: true });
        setPasswordStatus({ ...passwordStatus, password: false });
        // setErrors({ ...errors, passwordMismatch: true });
      } else {
        setErrors({ ...errors, passwordFormatError: false });
        setPasswordStatus({ ...passwordStatus, password: true });
      }
      if (passwordStatus.password_check) setPasswordStatus({ ...passwordStatus, password_check: false });
    }

    if (name === 'confirmPassword') {
      // 비밀번호 확인
      if (value !== formData.password) {
        setErrors({ ...errors, passwordMismatch: true });
        setPasswordStatus({ ...passwordStatus, password_check: false });
      } else {
        setErrors({ ...errors, passwordMismatch: false });
        setPasswordStatus({ ...passwordStatus, password_check: true });
      }
    }

    if (name === 'phoneNumber') {
      setDuplicateStatus({ ...duplicateStatus, phone: false });
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ''); // 숫자만 남기기
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value; // 올바른 형식이 아닐 경우 원래 값 반환
  };

  const handleNicknameGeneration = async () => {
    try {
      const nickname = await randomNickname();
      setFormData({ ...formData, nickname });
      setErrors({ ...errors, nicknameExists: false, nullNickname: false });
      setDuplicateStatus({ ...duplicateStatus, nickname: true });
    } catch (error) {
      console.error('닉네임 생성 실패:', error);
    }
  };

  const handlePhoneAuth = async () => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setErrors({ ...errors, phoneFormatError: true });
      return;
    }
    await handleDuplicateCheck('PHONE', formData.phoneNumber);
    if (errors.phoneExists) return;

    try {
      await phoneNumberAuth(formData.phoneNumber);
      setIsPhoneVerified(true);
      setErrors({ ...errors, phoneFormatError: false });
    } catch (error) {
      console.error('전화번호 인증 요청 실패:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await phoneNumberCheck({
        phoneNumber: formData.phoneNumber,
        code: formData.verificationCode,
      });

      if (response.code === 'SU') {
        setErrors({ ...errors, phoneVerification: false });
        setPhoneStatus({ ...phoneStatus, success: true });
      } else {
        setErrors({ ...errors, phoneVerification: true });
      }
    } catch (error) {
      console.error('전화번호 인증 실패:', error);
      setErrors({ ...errors, phoneVerification: true });
    }
  };

  const handleDuplicateCheck = async (valueType: string, value: string) => {
    if (value === '') {
      if (valueType === 'EMAIL') {
        setErrors({ ...errors, nullEmail: true });
      } else if (valueType === 'NICKNAME') {
        setErrors({ ...errors, nullNickname: true });
      } else if (valueType === 'PHONE') {
        setErrors({ ...errors, nullPhoneNumber: true });
      }
      return;
    }
    try {
      const response = await checkDuplication({ valueType, value });
      if (response.code !== 'SU') {
        // 중복일 경우
        if (valueType === 'EMAIL') {
          setErrors({ ...errors, emailExists: true, nullEmail: false });
          setDuplicateStatus({ ...duplicateStatus, email: false });
        } else if (valueType === 'NICKNAME') {
          setErrors({ ...errors, nicknameExists: true, nullNickname: false });
          setDuplicateStatus({ ...duplicateStatus, nickname: false });
        } else if (valueType === 'PHONE') {
          setErrors({ ...errors, phoneExists: true, nullPhoneNumber: false });
          setDuplicateStatus({ ...duplicateStatus, phone: false });
        }
      } else {
        // 중복이 아닐 경우
        if (valueType === 'EMAIL') {
          setErrors({ ...errors, emailExists: false, nullEmail: false });
          setDuplicateStatus({ ...duplicateStatus, email: true });
        } else if (valueType === 'NICKNAME') {
          setErrors({ ...errors, nicknameExists: false, nullNickname: false });
          setDuplicateStatus({ ...duplicateStatus, nickname: true });
        } else if (valueType === 'PHONE') {
          setErrors({ ...errors, phoneExists: false, nullPhoneNumber: false });
          setDuplicateStatus({ ...duplicateStatus, phone: true });
        }
      }
    } catch (error) {
      console.error(`${valueType} 중복 확인 실패:`, error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(file); //reader.result as string);
        // setFormData({ ...formData, image: URL.createObjectURL(file) }); // 파일 데이터 저장
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 변환
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMismatch: true });
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, emailFormatterError: true });
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setErrors({ ...errors, passwordFormatError: true });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMismatch: true });
      return;
    }

    try {
      // console.log(formData);
      // console.log(imagePreview);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}${MEMBER_API_URL.SIGN_UP}`,
        {
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname,
          phoneNumber: formData.phoneNumber,
          image: imagePreview ? imagePreview : null,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      // console.log('회원가입 성공:', response);

      const loginResponse = await login({
        email: formData.email,
        password: formData.password,
      });

      // 로그인 성공 후 홈으로 이동
      if (loginResponse.code === 'SU') {
        setToken(true);
        await delaySetApiInfo(setApiInfo, MESSAGE.API_SIGNUP_SUCCESS, DELAY_TIME_END_LONG); // 요청 성공
        localStorage.setItem('accessToken', loginResponse.accessToken); // 로그인 성공 시 token 저장
        localStorage.setItem('refreshToken', loginResponse.refreshToken);
        init(formData.email);
        const [, setUserInfo] = useRecoilState<UserInfo | null>(userState);
        const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
        await setUserInfo(response.data);

        navigate(`${PAGE_URL.HOME}`); // 홈으로 이동
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_ERROR, DELAY_TIME_END_LONG); // 요청 실패
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 min-w-[500px] max-w-[1000px] flex flex-col justify-center items-center ">
        <h2 className="w-full flex justify-center items-center text-4xl font-bold p-[40px]">회원 가입</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-5 w-full flex flex-col items-center rounded-lg border shadow-md"
        >
          <div className="mt-10 flex flex-row space-x-2 w-2/3 justify-between items-center">
            <label className="block mb-3 text-xl">프로필 사진</label>

            {imagePreview && (
              <img
                src={URL.createObjectURL(imagePreview)}
                alt="미리보기"
                className="max-h-[200px] object-cover mb-4 rounded-full"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 text-sm" />
          </div>

          <div className="mt-10 flex flex-row space-x-2 w-2/3 justify-between">
            <label className="block mb-1 text-xl w-1/5">이메일</label>
            <div className="flex items-center">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleDuplicateCheck('EMAIL', formData.email)}
                className={`border-2 rounded-lg w-[400px] p-2 ${duplicateStatus.email && !errors.emailFormatterError ? 'border-green-500' : ''}`}
                placeholder="test@test.com"
                required
              />
            </div>
          </div>
          {errors.emailExists && <p className="text-red-500">이미 존재하는 이메일입니다.</p>}
          {errors.nullEmail && <p className="text-red-500">이메일을 입력하세요.</p>}
          {errors.emailFormatterError && <p className="text-red-500">이메일 형식이 옳지 않습니다.</p>}

          <div className="mt-10 flex flex-row space-x-2 w-2/3 justify-between">
            <label className="block mb-1 text-xl ">닉네임</label>
            <div className="w-[400px]">
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                onBlur={() => handleDuplicateCheck('NICKNAME', formData.nickname)}
                className={`border-2 rounded-lg w-[300px] p-2 ${duplicateStatus.nickname ? 'border-green-500' : ''}`}
                required
              />
              <button
                type="button"
                onClick={handleNicknameGeneration}
                className="bg-db_main text-white rounded-lg px-4 py-1 ml-2 h-2/3 text-sm hover:bg-db_hover"
              >
                랜덤 생성
              </button>
            </div>
          </div>

          {errors.nicknameExists && <p className="text-red-500">이미 존재하는 닉네임입니다.</p>}
          {errors.nullNickname && <p className="text-red-500">닉네임을 입력하세요.</p>}

          <div className="mt-10 flex flex-row space-x-2 w-2/3 justify-between">
            <label className="block mb-1 text-xl w-1/5">비밀번호</label>
            <div className="flex items-center">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`border-2 rounded-lg w-[400px] p-2 ${passwordStatus.password ? 'border-green-500' : ''}`}
                required
              />
            </div>
          </div>
          {errors.passwordFormatError && (
            <p className="text-red-500">비밀번호는 최소 8자, 최대 13자로 문자와 숫자로 구성되어야 함니다.</p>
          )}

          <div className="mt-10 flex flex-row space-x-3 w-2/3 justify-between">
            <label className="block mb-3 text-xl w-1/5">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`border-2 rounded-lg w-[400px] p-2 ${passwordStatus.password_check ? 'border-green-500' : ''}`}
              required
            />
          </div>
          {errors.passwordMismatch && (
            <p className="text-red-500 mt-4">비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
          )}

          <div className="mt-10 flex flex-row space-x-2 w-2/3 justify-between">
            <label className="block mb-1 text-xl w-1/5">전화번호</label>
            <div className={`flex items-center ${duplicateStatus.phone ? 'w-[400px]' : ''}`}>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={() => handleDuplicateCheck('PHONE', formData.phoneNumber)}
                className={`border-2 rounded-lg p-2 ${duplicateStatus.phone ? 'border-green-500 w-[300px]' : 'w-[400px] '}`}
                placeholder="010-1234-1234"
                maxLength={13}
                required
              />
              {duplicateStatus.phone && (
                <button
                  type="button"
                  onClick={handlePhoneAuth}
                  className="bg-db_main text-white rounded-lg px-4 py-1 ml-2 h-2/3 text-sm hover:bg-db_hover"
                >
                  인증 요청
                </button>
              )}
            </div>
          </div>
          {errors.phoneFormatError && <p className="text-red-500">전화번호 형식이 올바르지 않습니다.</p>}
          {errors.phoneExists && <p className="text-red-500">이미 존재하는 전화번호입니다.</p>}
          {errors.nullPhoneNumber && <p className="text-red-500">전화번호를 입력하세요.</p>}
          {isPhoneVerified && duplicateStatus.phone && (
            <>
              <div className="mt-10 flex flex-row space-x-2 w-2/3 justify-between">
                <label className="block mb-1 text-xl w-1/5">인증 코드</label>
                <div className="flex items-center w-[400px]">
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    className={`border-2 rounded-lg w-[300px] p-2 ${phoneStatus.success ? 'border-green-500' : ''}`}
                    required
                  />

                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    className="bg-db_main text-white rounded-lg px-4 py-1 ml-2 h-2/3 text-sm hover:bg-db_hover"
                  >
                    인증 확인
                  </button>
                </div>
              </div>
              {errors.phoneVerification && <p className="text-red-500">인증 코드가 올바르지 않습니다.</p>}
            </>
          )}

          {!canSubmit() && <p className="text-red-500 text-lg">사진을 포함한 모든 항목을 오류 없이 입력하셨나요?</p>}
          {canSubmit() && (
            <button
              type="submit"
              className="bg-db_main text-white rounded-lg px-4 py-2 hover:bg-db_hover"
              disabled={!canSubmit()}
            >
              회원가입
            </button>
          )}
        </form>
      </div>

      <div className="h-[300px]"></div>
    </>
  );
};

export default SignUp;
