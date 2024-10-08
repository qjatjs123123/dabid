// 관리자 여부에 따라 다른 페이지가 보이도록 할 건지
// 일반 유저: 본인 문의 목록 페이지, 문의 생성 페이지 / 관리자: 전체 문의 목록 페이지, 문의 출력 버튼
// 관리자는 출력 버튼이 따로 있게 할 건지...
// 일반 유저: 본인 문의 목록 페이지, 문의 생성 페이지 / 관리자: 고객센터 클릭 시 문의 파일 출력

import { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { INQUIRY_API_URL } from '../../util/Constants';
import { getImgUrl } from '../../util/Functions';

interface InquiryItem {
  inquiryId: number;
  title: string;
  content: string;
  category: string;
  imageUrls: string[];
}

const InquiryList = () => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getInquiries = async () => {
      try {
        const response = await axios.get(`${INQUIRY_API_URL.INQUIRY_LIST}`);

        if (response.data.code === 'SU') {
          if (response.data.list.length === 0) {
            setError('작성한 문의가 없습니다.');
          } else {
            setInquiries(response.data.list);
          }
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    getInquiries();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-4 flex-col w-full">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry.inquiryId} className="flex flex-row border p-4 rounded shadow w-full">
              <div className="mr-[20px]">
                <img src={inquiry.imageUrls[0]} className="w-40 h-40 object-cover" />
              </div>

              <div className="flex flex-col">
                <h2 className="font-semibold text-[30px]">{inquiry.title}</h2>
                <p className="text-sm italic">카테고리: {inquiry.category}</p>
                <p className="text-[20px] text-gray-600">{inquiry.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <img src={getImgUrl('dabid_tung.png')} alt="휑" className="w-[400px] m-[100px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryList;
