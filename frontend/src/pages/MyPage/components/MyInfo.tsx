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
        await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_SUCCESS, DELAY_TIME_END_LONG); // 요청 성공
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
        await delaySetApiInfo(setApiInfo, MESSAGE.API_ACCOUNT_COMPLETE, DELAY_TIME_END_LONG); // 요청 보냄
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
        await setUserInfo(res.data);
        setPointStatus({ warning: false, message: '포인트 충전이 완료되었습니다.' });
      } else {
        setPointStatus({ warning: true, message: response.data.message });
      }
    } catch (error) {
      console.log(error);
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
        await setUserInfo(res.data);
        setPointStatus({ warning: false, message: '포인트 환전이 완료되었습니다.' });
      } else {
        setPointStatus({ warning: true, message: response.data.message });
      }
    } catch (error) {
      console.log(error);
      setPointStatus({ warning: true, message: '포인트 환전 요청 중 오류가 발생했습니다.' });
    }
    setPointAmount(0);
  };

  const addPoint = (amount: number) => {
    setPointAmount((prev) => (typeof prev === 'number' ? prev + amount : amount));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-semibold mb-5">사용자 정보</h1>
      {loading ? (
        <p className="text-gray-500">로딩 중...</p>
      ) : userInfo ? (
        <>
          <div className="mb-6">
            <p className="text-xl font-medium my-3">프로필 사진</p>
            {userInfo.imageUrl && (
              <img src={userInfo.imageUrl} alt="사용자 이미지" className="rounded-full w-32 h-32 object-cover" />
            )}
            <p className="text-xl my-3">닉네임: {userInfo.nickname}</p>
            <p className="text-xl my-3">이메일: {userInfo.email}</p>
            <p className="text-xl my-3">전화번호: {userInfo.phoneNumber}</p>
            <div className="text-xl my-3 flex items-center">
              <span className="">계좌: </span>
              <input type="text" value={userInfo.accountNo} disabled className="ml-2 border rounded-md p-1 text-md" />
              {!status.accountCheck && (
                <button
                  onClick={accountAuth}
                  className="bg-black text-white text-lg rounded px-4 py-1 ml-2 w-[160px] h-[35px]"
                >
                  계좌 등록하기
                </button>
              )}
            </div>
            {showAccountVerification &&
              !status.accountCheck && ( // 계좌 인증 폼 표시 조건
                <div className="text-xl my-3">
                  <div className="flex items-center">
                    <span className="">계좌 인증 코드: </span>
                    <input
                      type="text"
                      name="code"
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="ml-2 border rounded-md p-1 text-md"
                    />
                    <button onClick={accountCheck} className="bg-black text-white rounded px-4 ml-2 w-[170px] h-[35px]">
                      계좌 인증하기
                    </button>
                  </div>
                </div>
              )}
            <div className="mt-3">{status.message && <p className="text-green-600">{status.message}</p>}</div>
          </div>
          {status.accountCheck && (
            <>
              <hr className="my-6" />
              <p className="text-xl font-semibold">포인트: {formatNumberWithCommas(userInfo.point)}</p>
              <div className="my-4">
                <div className="flex items-center my-4 space-x-2 ">
                  <p className="text-xl my-3 w-[150px]">충전/환전할 금액: </p>
                  <input
                    type="number"
                    value={pointAmount}
                    onChange={(e) => setPointAmount(Number(e.target.value))}
                    placeholder="충전할 금액"
                    className="border rounded p-2"
                  />
                  <button onClick={pointIn} className="bg-black text-white text-md rounded px-4 py-2">
                    포인트 충전
                  </button>
                  <button onClick={pointOut} className="bg-black text-white text-md rounded px-4 py-2">
                    포인트 환전
                  </button>
                </div>

                <div className="flex space-x-2 mb-4">
                  <button onClick={() => addPoint(5000)} className="bg-gray-200 rounded px-2 py-1">
                    +5,000
                  </button>
                  <button onClick={() => addPoint(10000)} className="bg-gray-200 rounded px-2 py-1">
                    +10,000
                  </button>
                  <button onClick={() => addPoint(50000)} className="bg-gray-200 rounded px-2 py-1">
                    +50,000
                  </button>
                </div>
                {pointStatus.message && (
                  <p className={`mt-2 ${pointStatus.warning ? 'text-red-600' : 'text-green-600'}`}>
                    {pointStatus.message}
                  </p>
                )}
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
