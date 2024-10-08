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
    <div className="container mx-auto mt-5">
      {/* 첫 번째 섹션: 다비드 소개 */}
      {/* <div className="flex items-center justify-between mb-10">
        <div className="text-center">
          <p className={`text-5xl transition-opacity duration-500 ${showFirstText ? 'animate-fade-in' : 'opacity-0'}`}>
            <span className="font-bold">다비드.</span> 원하는 중고 제품을 <br />
            구입하는 가장 좋은 방법.
          </p>
        </div>
        <img
          src={getImgUrl('about/main-bg.png')}
          alt="다비드 메인"
          className={`max-h-[400px] ml-5 transition-opacity duration-500 ${showFirstImage ? 'animate-fade-in' : 'opacity-0'}`}
        />
      </div> */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-10">
        <div className="text-center md:text-left">
          <p className={`text-5xl transition-opacity duration-500 ${showFirstText ? 'animate-fade-in' : 'opacity-0'}`}>
            <span className="font-bold">다비드.</span> <br />
            원하는 중고 제품을 <br />
            구입하는 가장 좋은 방법.
          </p>
        </div>
        <img
          src={getImgUrl('about/main-bg.png')}
          alt="다비드 메인"
          className={`max-h-[400px] mt-5 md:mt-0 md:ml-5 transition-opacity duration-500 ${showFirstImage ? 'animate-fade-in' : 'opacity-0'}`}
        />
      </div>

      {/* 두 번째 섹션: 최신 제품 소개 */}
      <div className={`mb-10 ${showSecondText ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* 1행 */}
        <div className="flex items-center justify-between mb-5 w-full">
          <h2 className="text-3xl font-bold">다비드는 이런 서비스를 제공해요</h2>
        </div>

        {/* 2행 */}
        <div className="flex items-center mb-3 w-full">
          <div className="bg-black text-white rounded-lg shadow-lg p-5 m-3 w-full">
            <img src="" alt="2rd Price Auction 경매 방식" className="mb-4" />
            <h3 className="text-xl font-bold">2rd Price Auction 경매 방식</h3>
            <p>설명</p>
          </div>
        </div>

        {/* 3행 */}
        <div className="flex items-center mb-3 w-full">
          <div className="bg-black text-white rounded-lg shadow-lg p-5 m-3 w-full">
            <img src="" alt="안전한 에스크로 거래 서비스" className="mb-4" />
            <h3 className="text-xl font-bold">안전한 에스크로 거래 서비스</h3>
            <p>설명</p>
          </div>
        </div>

        {/* 4행 */}
        <div className="flex items-center mb-3 w-full">
          <div className="bg-black text-white rounded-lg shadow-lg p-5 m-3 w-full">
            <img src="" alt="~~~" className="mb-4" />
            <h3 className="text-xl font-bold">~~~</h3>
            <p>~~~</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
