import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from '../../../api/axiosConfig';
import { UserInfo, userState } from '../../../stores/recoilStores/Member/userState';
import { MEMBER_API_URL } from '../../../util/Constants';
import { formatNumberWithCommas } from '../../../util/moneyComma';

const MyInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userState);
  const [loading, setLoading] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
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

  useEffect(() => {
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

    fetchUserInfo();
    console.log('userInfo:', userInfo);
  }, [setUserInfo]);

  const accountAuth = async () => {
    try {
      const response = await axios.post(`${MEMBER_API_URL.ACCOUNT_AUTH}`);
      console.log(response);
      if (response.data.code === 'SU') {
        setStatus({ ...status, accountAuth: true, message: '계좌 인증 요청을 보냈습니다.' });
      } else if (response.data.code === 'AV') {
        setStatus({ ...status, accountCheck: true, message: '이미 인증된 계좌입니다.' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const accountCheck = async () => {
    try {
      const response = await axios.post(`${MEMBER_API_URL.ACCOUNT_CHECK}`, { code });
      console.log(response);
      if (response.data.code === 'SU') {
        setStatus({ ...status, accountCheck: true, message: '계좌 인증이 완료되었습니다.' });
      } else {
        setStatus({ ...status, message: '계좌 인증에 실패했습니다.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ ...status, message: '계좌 인증 요청 중 오류가 발생했습니다.' });
    }
  };

  const pointIn = async () => {
    if (pointAmount <= 0) {
      return;
    }
    try {
      const response = await axios.post(`${MEMBER_API_URL.POINT_IN}`, { amount: pointAmount });
      console.log(response);
      if (response.data.code === 'SU') {
        const res = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
        await setUserInfo(res.data);
        setPointStatus({ warning: false, message: '포인트 충전이 완료되었습니다.' });
      } else {
        console.log(response.data);
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
      console.log(response);
      if (response.data.code === 'SU') {
        const res = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
        await setUserInfo(res.data);
        setPointStatus({ warning: false, message: '포인트 환전이 완료되었습니다.' });
      } else if (response.data.code === 'NEP') {
        setPointStatus({ warning: true, message: '포인트가 부족합니다.' });
      } else {
        console.log(response.data);
        setPointStatus({ warning: true, message: response.data.message });
      }
    } catch (error) {
      console.log(error);
      setPointStatus({ warning: true, message: '포인트 환전 요청 중 오류가 발생했습니다.' });
    }
    setPointAmount(0);
  };

  const addPoint = (amount: number) => {
    setPointAmount((prev) => (typeof prev === 'number' ? prev + amount : amount)); // 이전 금액에 추가
  };

  return (
    <div>
      <h1 className="text-4xl mb-3">사용자 정보</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : userInfo ? (
        <>
          <div>
            {userInfo.imageUrl && <img src={userInfo.imageUrl} alt="사용자 이미지" />}
            <p className="text-xl my-3">닉네임: {userInfo.nickname}</p>
            <p className="text-xl my-3">이메일: {userInfo.email}</p>
            <p className="text-xl my-3">전화번호: {userInfo.phoneNumber}</p>
            <div className="text-xl my-3">
              <span>계좌: </span>
              <input type="text" value={userInfo.accountNo} disabled />
              {!status.accountCheck && (
                <>
                  <button
                    onClick={accountAuth}
                    className="bg-black text-white text-lg rounded px-4 py-1 ml-2 w-[160px] h-[35px]"
                    disabled={status.accountCheck}
                  >
                    계좌 등록하기
                  </button>
                </>
              )}
            </div>
            {!status.accountCheck && (
              <div className="text-xl my-3">
                <div className="flex flex-row">
                  <span className="w-[150px]">계좌 인증 코드: </span>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border rounded w-[300px]"
                  />
                  <button
                    onClick={accountCheck}
                    className="bg-black text-white rounded px-4 ml-2 w-[170px] h-[35px]"
                    disabled={status.accountCheck}
                  >
                    계좌 인증하기
                  </button>
                </div>
              </div>
            )}
            <div className="mt-3">{status.message && <p className="text-green-600">{status.message}</p>}</div>
          </div>
          {status.accountCheck && (
            <>
              <br />
              <hr />
              <br />
              <p className="text-xl">포인트: {formatNumberWithCommas(userInfo.point)}</p>
              <div className="my-4">
                <div className="flex flex-row my-4">
                  <p className="text-xl my-3 w-[200px]">충전/환전할 금액: </p>
                  <input
                    type="number"
                    value={pointAmount}
                    onChange={(e) => setPointAmount(Number(e.target.value))}
                    placeholder="충전할 금액"
                    className="border rounded w-full p-2"
                  />
                </div>

                <div className="flex space-x-2 mb-2">
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

                <button
                  onClick={pointIn}
                  className="bg-black text-white text-lg rounded px-4 py-1 w-[160px] h-[35px] mx-4"
                >
                  포인트 충전
                </button>

                <button onClick={pointOut} className="bg-black text-white text-lg rounded px-4 py-1 w-[160px] h-[35px]">
                  포인트 환전
                </button>
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
        <p>사용자 정보를 가져오는 데 실패했습니다.</p>
      )}
    </div>
  );
};

export default MyInfo;
