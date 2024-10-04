import './DealButton.css';

const DealButton = ({ onClick }) => {
  return (
    <div className="btnPush btnOrange" onClick={onClick}>
      송금하기
    </div>
  );
};

export default DealButton;
