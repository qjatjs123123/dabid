import { getImgUrl } from '../util/Functions';

const About = () => {
  return (
    <div className="container flex flex-wrap flex-row items-center justify-between m-4">
      <p className="text-6xl">
        <span className="font-bold">다비드.</span> 원하는 중고 제품을 <br />
        구입하는 가장 좋은 방법.
      </p>
      <img src={getImgUrl('about/main-bg.png')} alt="다비드 메인" className="max-h-[600px]" />
    </div>
  );
};

export default About;
