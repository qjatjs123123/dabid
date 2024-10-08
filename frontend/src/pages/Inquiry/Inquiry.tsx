import { useState } from 'react';
import InquiryList from './InquiryList';
import InquiryInput from './InquiryInput';
import { UserInfo, userState } from '../../stores/recoilStores/Member/userState';
import { useRecoilState } from 'recoil';
import axios from '../../api/axiosConfig';
import { INQUIRY_API_URL } from '../../util/Constants';

const Inquiry = () => {
  const [activePage, setActivePage] = useState<string>('내 문의');
  const [userInfo] = useRecoilState<UserInfo | null>(userState);

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
      const response = await axios.get(`${INQUIRY_API_URL.INQUIRY_EXCEL}`);
      if (response.data.code !== 'SU') {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
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
        <ul className="flex border-gray-300 mb-[10px]">
          {['내 문의', '문의 작성', ...(userInfo?.role === 'ADMIN' ? ['문의 파일 저장'] : [])].map((page) => {
            return (
              <li key={page}>
                <button
                  className={`block text-black p-3 ${activePage === page ? 'bg-gray-200' : ' '} hover:font-bold`}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="m-1">{renderContent()}</div>
      </div>
    </>
  );
};

export default Inquiry;
