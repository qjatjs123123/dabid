import React, { useState } from 'react';
import { login } from '../../api/MemberAPI';
import { Link } from 'react-router-dom';
import { PAGE_URL } from '../../util/Constants';
import { getImgUrl } from '../../util/Functions';

interface LoginParams {
  email: string;
  password: string;
}

const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void; onLoginSuccess: () => void }> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [values, setValues] = useState<LoginParams>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await login(values);
      localStorage.clear();
      localStorage.setItem('accessToken', response.accessToken);
      onLoginSuccess(); // 로그인 성공 시 호출
    } catch (error) {
      console.log(error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-96">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">로그인</h2>
        <div className="flex flex-col justify-center items-center mb-5">
          <img src={getImgUrl('about/main-bg.png')} alt="다비드 로고 2" className="w-[150px]" />
          <img src={getImgUrl('navbar/dabid-logo.png')} alt="다비드 로고 1" className="w-[100px]" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="비밀번호 입력"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mb-4"
          >
            로그인
          </button>
          <div className="text-right text-sm">
            <Link to={PAGE_URL.SIGN_UP} className="text-blue-600 hover:text-blue-800">
              아직 다비드 회원이 아니신가요?
            </Link>
          </div>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">
          닫기
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
