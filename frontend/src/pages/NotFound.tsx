import { useNavigate } from 'react-router-dom';
import { PAGE_URL } from '../util/Constants'; // PAGE_URL 경로에 맞게 수정

const NotFound = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능 추가

  const handleHomeClick = () => {
    navigate(PAGE_URL.HOME); // 홈 페이지로 네비게이션
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {' '}
      {/* 전체 화면을 가득 채우고 중앙 정렬 */}
      <img
        src="/notfound.png"
        style={{ height: '350px', width: 'auto' }} // height는 350px, width는 자동 조절
        alt="Not Found"
      />
      <button
        onClick={handleHomeClick}
        style={{
          padding: '10px 20px', // 패딩 적용
          fontSize: '16px',
          marginTop: '20px',
          cursor: 'pointer',
          background: '#FF9F04',
          color: 'white', // 텍스트 색상 흰색으로 설정
          border: 'none', // 기본 테두리 제거
          borderRadius: '10px', // 모서리 둥글게
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        홈으로
      </button>
    </div>
  );
};

export default NotFound;
