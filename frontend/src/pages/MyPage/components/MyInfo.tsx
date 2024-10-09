import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from '../../../api/axiosConfig';
import { UserInfo, userState } from '../../../stores/recoilStores/Member/userState';
import { DELAY_TIME_END, DELAY_TIME_END_LONG, MEMBER_API_URL, MESSAGE } from '../../../util/Constants';
import { formatNumberWithCommas } from '../../../util/moneyComma';
import { delaySetApiInfo } from '../../../util/Functions';
import { apiState } from '../../../stores/recoilStores/Message/apiState';

const MyInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userState);
  const [loading, setLoading] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
  const [apiInfo, setApiInfo] = useRecoilState(apiState);
  const [status, setStatus] = useState({
    accountAuth: false,
    accountCheck: false,
    message: '',
  });

  const [pointAmount, setPointAmount] = useState<number>(0);
  const [pointStatus, setPointStatus] = useState({
    warning: false,
    message: '',
  });

  const [showAccountVerification, setShowAccountVerification] = useState<boolean>(false);
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
      await setUserInfo(response.data);

      if (response && response.data.accountActive) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          accountAuth: true,
          accountCheck: true,
          message: '계좌 인증이 완료되었습니다.',
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [setUserInfo]);

  const accountAuth = async () => {
    try {
      const response = await axios.post(`${MEMBER_API_URL.ACCOUNT_AUTH}`);
      if (response.data.code === 'SU') {
        // setStatus({ ...status, accountAuth: true, message: '계좌 인증 요청을 보냈습니다.' });
        await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_SUCCESS, DELAY_TIME_END); // 요청 성공
        setShowAccountVerification(true); // 계좌 인증 폼 표시
      } else if (response.data.code === 'AV') {
        setStatus({ ...status, accountCheck: true, message: '이미 인증된 계좌입니다.' });
        await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_ERROR, DELAY_TIME_END_LONG); // 요청 실패
      }
    } catch (error) {
      console.error(error);
      await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_ERROR, DELAY_TIME_END_LONG); // 요청 실패
    }
  };

  const accountCheck = async () => {
    try {
      const response = await axios.post(`${MEMBER_API_URL.ACCOUNT_CHECK}`, { code });

      if (response.data.code === 'SU') {
        setStatus({ ...status, accountCheck: true, message: '계좌 인증이 완료되었습니다.' });
        await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_COMPLETE, DELAY_TIME_END); // 요청 보냄
        fetchUserInfo();
      } else {
        setStatus({ ...status, message: '계좌 인증에 실패했습니다.' });
        await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_ERROR, DELAY_TIME_END_LONG); // 요청 실패
      }
    } catch (error) {
      console.error(error);
      setStatus({ ...status, message: '계좌 인증 요청 중 오류가 발생했습니다.' });
      await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_ERROR, DELAY_TIME_END_LONG); // 요청 실패
    }
  };

  const pointIn = async () => {
    if (pointAmount <= 0) {
      return;
    }
    try {
      const response = await axios.post(`${MEMBER_API_URL.POINT_IN}`, { amount: pointAmount });
      if (response.data.code === 'SU') {
        const res = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
        delaySetApiInfo(setApiInfo, MESSAGE.API_POINTIN_SUCCESS, DELAY_TIME_END_LONG);
        setUserInfo(res.data);
        // setPointStatus({ warning: false, message: '포인트 충전이 완료되었습니다.' });
      } else {
        setPointStatus({ warning: true, message: '계좌 잔액이 부족합니다.' });
        delaySetApiInfo(setApiInfo, MESSAGE.API_POINTIN_FAIL, DELAY_TIME_END_LONG);
      }
    } catch (error) {
      console.log(error);
      delaySetApiInfo(setApiInfo, MESSAGE.API_POINTIN_FAIL, DELAY_TIME_END_LONG);
      setPointStatus({ warning: true, message: '포인트 충전 요청 중 오류가 발생했습니다.' });
    }
    setPointAmount(0);
  };

  const pointOut = async () => {
    if (pointAmount <= 0) {
      return;
    }
    try {
      const response = await axios.post(`${MEMBER_API_URL.POINT_OUT}`, { amount: pointAmount });
      if (response.data.code === 'SU') {
        const res = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
        delaySetApiInfo(setApiInfo, MESSAGE.API_POINTOUT_SUCCESS, DELAY_TIME_END_LONG);
        setUserInfo(res.data);
        setPointStatus({ warning: false, message: '포인트 환전이 완료되었습니다.' });
      } else {
        setPointStatus({ warning: true, message: '포인트 잔액이 부족합니다.' });
        delaySetApiInfo(setApiInfo, MESSAGE.API_POINTOUT_FAIL, DELAY_TIME_END_LONG);
      }
    } catch (error) {
      console.log(error);
      setPointStatus({ warning: true, message: '포인트 환전 요청 중 오류가 발생했습니다.' });
      await delaySetApiInfo(setApiInfo, MESSAGE.API_POINTOUT_FAIL, DELAY_TIME_END_LONG);
    }
    setPointAmount(0);
  };

  const addPoint = (amount: number) => {
    setPointAmount((prev) => (typeof prev === 'number' ? prev + amount : amount));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {loading ? (
        <p className="text-gray-500">로딩 중...</p>
      ) : userInfo ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col items-center">
              {userInfo.imageUrl && (
                <img
                  src={userInfo.imageUrl}
                  alt="사용자 이미지"
                  className="rounded-full w-32 h-32 object-cover mb-3 border-4 border-db_black"
                />
              )}
              <p className="text-xl my-3">{userInfo.nickname}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between border-b py-2">
                <span className="text-xl">이메일</span>
                <span className="text-xl font-semibold">{userInfo.email}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-xl">전화번호</span>
                <span className="text-xl font-semibold">{userInfo.phoneNumber}</span>
              </div>
              <div className="flex justify-between border-b py-2">
                <span className="text-xl">계좌</span>
                <div className="flex items-center w-1/2">
                  <input
                    type="text"
                    value={userInfo.accountNo}
                    disabled
                    className="border rounded-md p-1 text-md text-right text-slate-600 bg-gray-200 w-full"
                  />
                </div>
              </div>
              {!showAccountVerification && !status.accountCheck && (
                <div className="flex justify-end border-b py-2">
                  <button
                    onClick={accountAuth}
                    className="bg-db_main text-white text-lg rounded px-4 py-1 ml-2 transition duration-300 hover:bg-db_hover"
                  >
                    계좌 등록하기
                  </button>
                </div>
              )}
              {showAccountVerification && !status.accountCheck && (
                <div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-xl">인증코드</span>
                    <div className="flex items-center w-1/4">
                      <input
                        type="text"
                        name="code"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="ml-2 border-4 rounded-md p-1 text-md text-center w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between border-b py-2">
                      <p className="py-1 text-db_main">우측 하단 다비드뱅크에서 인증코드를 확인하세요!</p>
                      <button
                        onClick={accountCheck}
                        className="bg-db_main text-white rounded px-4 py-1 ml-2 transition duration-300 hover:bg-db_hover"
                      >
                        인증하기
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-3">
                {status.message && <p className="text-db_main text-right">{status.message}</p>}
              </div>
            </div>
          </div>
          {status.accountCheck && (
            <>
              <hr className="my-6" />
              <p className="text-xl font-semibold">
                포인트
                <input
                  type="text"
                  value={formatNumberWithCommas(userInfo.point)}
                  disabled
                  className="border rounded-md p-1 ml-3 text-md text-right bg-gray-200 w-1/5"
                />
              </p>
              <div className="my-4">
                <div className="flex items-center my-4 space-x-2">
                  <p className="text-xl my-3 w-[150px]">충전/환전할 금액 </p>
                  <input
                    type="number"
                    value={pointAmount}
                    onChange={(e) => setPointAmount(Number(e.target.value))}
                    placeholder="충전할 금액"
                    className="border rounded p-2"
                  />
                  <button
                    onClick={() => addPoint(5000)}
                    className="bg-db_sub hover:bg-db_main text-white rounded px-2 py-1"
                  >
                    +5,000
                  </button>
                  <button
                    onClick={() => addPoint(10000)}
                    className="bg-db_sub hover:bg-db_main text-white rounded px-2 py-1"
                  >
                    +10,000
                  </button>
                  <button
                    onClick={() => addPoint(50000)}
                    className="bg-db_sub hover:bg-db_main text-white rounded px-2 py-1"
                  >
                    +50,000
                  </button>
                </div>
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={pointIn}
                    className="bg-db_main hover:bg-db_hover text-white text-md rounded px-4 py-2"
                  >
                    충전하기
                  </button>
                  <button
                    onClick={pointOut}
                    className="bg-db_main hover:bg-db_hover text-white text-md rounded px-4 py-2"
                  >
                    환전하기
                  </button>
                </div>
                {/* {pointStatus.message && (
                  <p className={`mt-2 ${pointStatus.warning ? 'text-red-600' : 'text-db_main'}`}>
                    {pointStatus.message}
                  </p>
                )} */}
              </div>
            </>
          )}
        </>
      ) : (
        <p className="text-red-600">사용자 정보를 가져오는 데 실패했습니다.</p>
      )}
    </div>
  );
};

export default MyInfo;
