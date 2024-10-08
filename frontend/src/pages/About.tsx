import React, { useEffect, useState } from 'react';
import { getImgUrl } from '../util/Functions';
import '../../styles.css';

const About = () => {
  const [showFirstText, setShowFirstText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showFirstImage, setShowFirstImage] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const firstTextTimer = setTimeout(() => {
      setShowFirstText(true);
    }, 100); // 텍스트 애니메이션 시작

    const secondTextTimer = setTimeout(() => {
      setShowSecondText(true);
    }, 500); // 텍스트 애니메이션 시작

    const firstImageTimer = setTimeout(() => {
      setShowFirstImage(true);
    }, 300); // 이미지 애니메이션 시작

    const secondImageTimer = setTimeout(() => {
      setShowSecondImage(true);
    }, 700); // 이미지 애니메이션 시작

    return () => {
      clearTimeout(firstTextTimer);
      clearTimeout(secondTextTimer);
      clearTimeout(firstImageTimer);
      clearTimeout(secondImageTimer);
    };
  }, []);

  return (
    <div>
      {/* <div className="container mx-auto mt-5"> */}
      <div className="w-full lg:h-[45vh] sm:h-auto px-[15%] flex flex-col lg:flex-row justify-center items-center mt-5">
        {/* 첫 번째 섹션: 다비드 소개 */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
          <div className="text-center md:text-left">
            <p
              className={`text-5xl transition-opacity duration-500 ${showFirstText ? 'animate-fade-in' : 'opacity-0'}`}
            >
              <div className="text-3xl lg:text-4xl font-bold mb-[15px]">다비드.</div>
              <div className="text-3xl lg:text-4xl mb-[15px]">원하는 중고 제품을</div>
              <div className="text-3xl lg:text-4xl mb-[15px]">구입하는 가장 좋은 방법.</div>
            </p>
          </div>
          <img
            src={getImgUrl('about/main-bg.png')}
            alt="다비드 메인"
            className={`max-h-[400px] mt-5 md:mt-0 md:ml-5 transition-opacity duration-500 ${showFirstImage ? 'animate-fade-in' : 'opacity-0'}`}
          />
        </div>
        {/* <div className={`mb-10 ${showSecondText ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-5 w-full">
            <h2 className="text-3xl font-bold">다비드는 이런 서비스를 제공해요</h2>
          </div>
        </div> */}
      </div>

      {/* 두 번째 섹션: 다비드 기능 소개 */}
      <div className={`mb-10 ${showSecondText ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* 1행 */}
        <div className="w-full lg:h-[45vh] sm:h-auto bg-db_white px-[15%] flex flex-col lg:flex-row justify-center items-center">
          <div className="flex flex-col mb-8 lg:mb-0 lg:mr-[100px] text-center lg:text-left">
            <div className="text-3xl lg:text-3xl font-bold mb-[15px]">기존 선착순 중고거래가</div>
            <div className="text-3xl lg:text-3xl font-bold mb-[15px]">아닌 경매를 더한 다비드</div>
            <div className="text-[16px] lg:text-[20px] font-normal mb-[10px]">시간적인 여유를 가지고</div>
            <div className="text-[16px] lg:text-[20px]">원하는 물건을 입찰하세요.</div>
          </div>
          <img src="/clock.png" className="h-[25vh] lg:h-[30vh] w-auto"></img>
        </div>

        {/* 2행 */}
        <div className="w-full lg:h-[45vh] sm:h-auto bg-[#FEF1AA] px-[15%] flex flex-col lg:flex-row justify-center items-center">
          <div className="flex flex-col mb-8 lg:mb-0 lg:mr-[100px] text-center lg:text-left">
            <div className="text-3xl lg:text-3xl font-bold mb-[15px]">긴장감 넘치는</div>
            <div className="text-3xl lg:text-3xl font-bold mb-[15px]">비크리 경매</div>
            <div className="text-[16px] lg:text-[20px] font-normal mb-[10px]">원하는 물건을 합리적인 가격으로</div>
            <div className="text-[16px] lg:text-[20px]">구해보세요.</div>
          </div>
          <img src="/vickrey_auction.png" className="h-[25vh] lg:h-[30vh] w-auto"></img>
        </div>

        {/* 3행 */}
        <div className="w-full lg:h-[45vh] sm:h-auto bg-black-100 px-[15%] flex flex-col lg:flex-row justify-center items-center">
          <div className="flex flex-col mb-8 lg:mb-0 lg:mr-[100px] text-center lg:text-left">
            <div className="text-3xl lg:text-3xl font-bold mb-[15px]">안전한 거래를 위한</div>
            <div className="text-3xl lg:text-3xl font-bold mb-[15px]">에스크로 서비스</div>
            <div className="text-[16px] lg:text-[20px] font-normal mb-[10px]">판매자와 구매자간 안전한 거래를</div>
            <div className="text-[16px] lg:text-[20px]">보장해드립니다.</div>
          </div>
          <img src="/handshake.png" className="h-[25vh] lg:h-[30vh] w-auto"></img>
        </div>
      </div>
    </div>
  );
};

export default About;
