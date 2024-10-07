import './DealButton.css';
import React from 'react';

type CloseButtonProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <div className="btnPush btnOrange" onClick={onClick}>
      인수하기
    </div>
  );
};

export default CloseButton;
