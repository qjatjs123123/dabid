import React, { useState } from 'react';
import InquiryList from './InquiryList';
import InquiryInput from './InquiryInput';
import { UserInfo, userState } from '../../stores/recoilStores/Member/userState';
import { useRecoilState } from 'recoil';
import axios from '../../api/axiosConfig';
import { INQUIRY_API_URL } from '../../util/Constants';

const Inquiry = () => {
  const [activePage, setActivePage] = useState<string>('문의 목록');
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userState);

  const renderContent = () => {
    switch (activePage) {
      case '문의 목록':
        return <InquiryList />;
      case '문의 작성':
        return <InquiryInput />;

      default:
        return null;
    }
  };

  const saveInquiry = async () => {
    try {
      const response = await axios.get(`${INQUIRY_API_URL.INQUIRY_PRINT}`);
      // const response = await axios.get(`${INQUIRY_API_URL.INQUIRY_EXCEL}`);
      if (response.data.code !== 'SU') {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container w-full border-gray-300 flex flex-col mt-4 p-6">
      {userInfo?.role !== 'ADMIN' && activePage === '문의 목록' && (
        <button onClick={() => setActivePage('문의 작성')} className="text-left w-[110px]">
          ▶ 문의 작성
        </button>
      )}
      {userInfo?.role !== 'ADMIN' && activePage === '문의 작성' && (
        <button onClick={() => setActivePage('문의 목록')} className="text-left w-[110px]">
          ▶ 문의 목록
        </button>
      )}
      {userInfo?.role === 'ADMIN' && (
        <button onClick={saveInquiry} className="text-left w-[130px]">
          ▶ 문의 파일 저장
        </button>
      )}
      <div className="m-1">{renderContent()}</div>
    </div>
  );
};

export default Inquiry;
