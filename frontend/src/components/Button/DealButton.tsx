import './DealButton.css';
import React from 'react';

type DealButtonProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const DealButton: React.FC<DealButtonProps> = ({ onClick }) => {
  return (
    <div className="btnPush btnOrange" onClick={onClick}>
      송금하기
    </div>
  );
};

export default DealButton;
