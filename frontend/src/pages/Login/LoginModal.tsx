import React, { useState } from 'react';
import { login } from '../../api/MemberAPI';
import { Link } from 'react-router-dom';
import { PAGE_URL } from '../../util/Constants';
import { getImgUrl } from '../../util/Functions';
import { useRecoilState } from 'recoil';
import { loginState } from '../../stores/recoilStores/Member/loginState';

interface LoginParams {
  email: string;
  password: string;
}

const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void; onLoginSuccess: () => void }> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [values, setValues] = useState<LoginParams>({
    email: '',
    password: '',
  });
  const [_, setToken] = useRecoilState(loginState); // 컴포넌트 최상위에서 호출

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.id]: e.target.value });
    setErrorMessage(''); // 입력할 때 에러 메시지 초기화
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // 이메일과 비밀번호가 빈 값인지 확인
    if (!values.email || !values.password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요.'); // 빈 값일 때 에러 메시지 설정
      return;
    }

    try {
      const response = await login(values);
      if (response.code !== 'SU') {
        setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.'); // 로그인 실패 시 에러 메시지 설정
        return;
      }

      // 로그인 성공 시 토큰 저장
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setToken(response.accessToken); // Recoil 상태 업데이트

      onLoginSuccess(); // 로그인 성공 시 호출
    } catch (error) {
      console.error(error); // 에러를 콘솔에 기록
      setErrorMessage('로그인 중 오류가 발생했습니다.'); // API 호출 중 오류 발생 시 에러 메시지 설정
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  const handleClose = () => {
    // 모달 닫기 전에 폼 데이터 초기화
    setValues({ email: '', password: '' });
    setErrorMessage(''); // 에러 메시지 초기화
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleBackgroundClick} // 배경 클릭 시 모달 닫기
    >
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-[500px]">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">로그인</h2>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-center items-center p-3 mr-3">
            <img src={getImgUrl('about/main-bg.png')} alt="다비드 로고 2" className="w-[150px]" />
            <img src={getImgUrl('navbar/dabid-logo.png')} alt="다비드 로고 1" className="w-[100px]" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-[400px] max-w-lg m-3">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="example@mail.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="비밀번호 입력"
              />
            </div>
            {errorMessage && <p className="text-red-500 mb-3 text-sm">{errorMessage}</p>} {/* 에러 메시지 표시 */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-[300px] focus:outline-none focus:shadow-outline mb-4"
            >
              로그인
            </button>
            <div className="text-right text-sm">
              <Link
                to={`${PAGE_URL.SIGN_UP}`}
                className="text-blue-600 hover:text-blue-800 text-right mr-0 w-[100%]"
                onClick={handleClose}
              >
                아직 다비드 회원이 아니신가요?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
