import React from 'react';
import { useState } from 'react';
import { login } from '../../api/MemberAPI';
import { Link } from 'react-router-dom';
import { PAGE_URL } from '../../util/Constants';
import { getImgUrl } from '../../util/Functions';

interface LoginParams {
  email: string;
  password: string;
}

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    login(values)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem('accessToken', response.accessToken);
        // localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('email', values.email);
        window.location.href = `/home`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-between items-center bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 min-w-[600px]">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">로그인</h2>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-center items-center m-5">
            <img src={getImgUrl('about/main-bg.png')} alt="다비드 로고 2" className="w-[150px]" />
            <img src={getImgUrl('navbar/dabid-logo.png')} alt="다비드 로고 1" className="w-[100px]" />
          </div>

          <div className=" flex justify-center items-centerw-full max-w-md m-3">
            <form onSubmit={handleSubmit} className="min-w-[300px]">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                  이메일
                </label>
                <input
                  type="text"
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
              <div className="flex items-center justify-between mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                >
                  로그인
                </button>
              </div>
              <div className="text-right text-sm">
                <Link to={PAGE_URL.SIGN_UP} className="text-blue-600 hover:text-blue-800">
                  아직 다비드 회원이 아니신가요?
                </Link>
              </div>
            </form>

            {/* {mutation.isLoading && <p className="text-blue-600 text-center mt-2">로그인 중...</p>}
        {mutation.isError && <p className="text-red-600 text-center mt-2">로그인에 실패했습니다. 다시 시도해주세요.</p>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
