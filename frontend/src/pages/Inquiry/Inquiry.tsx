import { useState } from 'react';
import InquiryList from './InquiryList';
import InquiryInput from './InquiryInput';
import { UserInfo, userState } from '../../stores/recoilStores/Member/userState';
import { useRecoilState } from 'recoil';
import axios from '../../api/axiosConfig';
import { DELAY_TIME_END, DELAY_TIME_END_LONG, INQUIRY_API_URL, MESSAGE } from '../../util/Constants';
import { delaySetApiInfo } from '../../util/Functions';
import { apiState } from '../../stores/recoilStores/Message/apiState';

const Inquiry = () => {
  const [activePage, setActivePage] = useState<string>('내 문의');
  const [userInfo] = useRecoilState<UserInfo | null>(userState);
  const [, setApiInfo] = useRecoilState(apiState);

  const renderContent = () => {
    switch (activePage) {
      case '내 문의':
        return <InquiryList />;
      case '문의 작성':
        return <InquiryInput />;
      default:
        return null;
    }
  };

  const saveInquiry = async () => {
    try {
      const response = await axios.get(`${INQUIRY_API_URL.INQUIRY_EXCEL}`, {
        responseType: 'blob', // 응답 타입을 blob으로 설정
      });

      // Blob 객체 생성
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);

      // a 태그를 만들어 다운로드
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inquiry.xlsx'); // 파일 이름 설정
      document.body.appendChild(link);
      link.click();
      link.remove(); // 링크 제거
      window.URL.revokeObjectURL(url); // URL 메모리 해제

      delaySetApiInfo(setApiInfo, MESSAGE.API_INQUIRY_SUCCESS, DELAY_TIME_END_LONG);
    } catch (error) {
      console.error(error);
      delaySetApiInfo(setApiInfo, MESSAGE.API_INQUIRY_FAIL, DELAY_TIME_END);
    }
  };

  return (
    <>
      <div className="w-full lg:h-[45vh] sm:h-auto bg-[#FFE2D2] px-[15%] flex flex-col lg:flex-row justify-center items-center">
        <div className="flex flex-col mb-8 lg:mb-0 lg:mr-[100px] text-center lg:text-left">
          <div className="text-3xl lg:text-4xl font-bold mb-[15px]">모두가 안전한</div>
          <div className="text-3xl lg:text-4xl font-bold mb-[15px]">고객센터</div>
          <div className="text-[16px] lg:text-[20px] font-normal mb-[10px]">신고, 문의를 해결해주는 서비스를</div>
          <div className="text-[16px] lg:text-[20px]">지금 경험해보세요.</div>
        </div>
        <img src="/center.png" className="h-[25vh] lg:h-[30vh] w-auto"></img>
      </div>
      <div className="container w-full border-gray-300 flex flex-col mt-4 p-6 ">
        <div className={`flex ${userInfo?.role === 'ADMIN' ? 'justify-between' : 'justify-start'}`}>
          <ul className="flex border-gray-300 mb-[10px]">
            {['내 문의', '문의 작성'].map((page) => {
              return (
                <li key={page}>
                  <button
                    className={`block text-black p-3 ${activePage === page ? 'bg-db_main text-white font-bold' : ' '} hover:font-bold`}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
          </ul>
          {userInfo?.role === 'ADMIN' && (
            <button
              className="bg-db_main text-white rounded-lg px-4 py-1 ml-2 h-2/3 hover:bg-db_hover"
              onClick={saveInquiry}
            >
              문의 저장
            </button>
          )}
        </div>

        <div className="m-1">{renderContent()}</div>
      </div>
    </>
  );
};

export default Inquiry;
