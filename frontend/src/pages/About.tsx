import { getImgUrl } from '../util/Functions';

const About = () => {
  return (
    <div className="container flex flex-nowrap flex-row items-center justify-evenly">
      <p className="text-5xl">
        <span className="font-bold">다비드.</span> 원하는 중고 제품을 <br />
        구입하는 가장 좋은 방법.
      </p>
      <img src={getImgUrl('about/main-bg.png')} alt="다비드 메인" className="max-h-[400px]" />
      {/* Bidding 설명 추가 */}
    </div>
  );
};

export default About;
