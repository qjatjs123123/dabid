import { getImgUrl } from '../util/Functions';

const About = () => {
  return (
    <div className="container mx-auto mt-5">
      {/* 첫 번째 섹션: 다비드 소개 */}
      <div className="flex items-center justify-between mb-10">
        <div className="text-center">
          <p className="text-5xl">
            <span className="font-bold">다비드.</span> 원하는 중고 제품을 <br />
            구입하는 가장 좋은 방법.
          </p>
        </div>
        <img src={getImgUrl('about/main-bg.png')} alt="다비드 메인" className="max-h-[400px] ml-5" />
      </div>

      {/* 두 번째 섹션: 최신 제품 소개 */}
      <h2 className="text-3xl font-bold mb-5">최신 제품. 따끈따끈한 신제품 이야기.</h2>
      <div className="flex justify-evenly">
        <div className="bg-black text-white rounded-lg shadow-lg p-5 m-3">
          <img src="./public/mainPageImage/123.jpg" alt="iPhone 16 Pro" className="mb-4" />
          <h3 className="text-xl font-bold">iPhone 16 Pro.</h3>
          <p>궁극의 iPhone.</p>
          <p>₩1,550,000부터</p>
        </div>

        <div className="bg-black text-white rounded-lg shadow-lg p-5 m-3">
          <img src="./public/mainPageImage/456.jpg" alt="Apple Watch Series 10" className="mb-4" />
          <h3 className="text-xl font-bold">Apple Watch Series 10.</h3>
          <p>앞아진 두께. 더 커진 존재감.</p>
          <p>₩599,000부터</p>
        </div>

        <div className="bg-black text-white rounded-lg shadow-lg p-5 m-3">
          <img src="./public/mainPageImage/789.jpg" alt="iPhone 16" className="mb-4" />
          <h3 className="text-xl font-bold">iPhone 16.</h3>
          <p>막강한 성능.</p>
          <p>₩1,250,000부터</p>
        </div>
      </div>
    </div>
  );
};

export default About;
