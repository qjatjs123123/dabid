// 관리자 여부에 따라 다른 페이지가 보이도록 할 건지
// 일반 유저: 본인 문의 목록 페이지, 문의 생성 페이지 / 관리자: 전체 문의 목록 페이지, 문의 출력 버튼
// 관리자는 출력 버튼이 따로 있게 할 건지...
// 일반 유저: 본인 문의 목록 페이지, 문의 생성 페이지 / 관리자: 고객센터 클릭 시 문의 파일 출력

import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { INQUIRY_API_URL } from '../../util/Constants';

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
        console.log(response.data);
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

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container w-full border-gray-300 flex flex-col mt-4 p-6">
      <h1 className="text-2xl font-bold mb-6">문의 목록</h1>
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry.inquiryId} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{inquiry.title}</h2>
            <p className="text-sm text-gray-600">{inquiry.content}</p>
            <p className="text-sm italic">카테고리: {inquiry.category}</p>
            {inquiry.imageUrls.length > 0 && (
              <div className="flex flex-row mt-2">
                {inquiry.imageUrls.map((url, index) => (
                  <img key={index} src={url} alt={`image-${index}`} className="w-32 h-32 object-cover mr-[10px]" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InquiryList;
