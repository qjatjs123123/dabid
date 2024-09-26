interface DealProps {
  deal: {
    id: number;
    seller_nickname: string;
    title: string;
    detail: string;
    image: string;
    winning_bid: number;
    status: string;
    isTimerVisible: boolean;
  };
}

const DealContent: React.FC<DealProps> = ({ deal }) => {
  return (
    <div className="border p-2 mb-2">
      <h3>{deal.title}</h3>
      <p>{deal.detail}</p>
      <p>Seller: {deal.seller_nickname}</p>
      <p>Winning Bid: {deal.winning_bid}</p>
      <p>Status: {deal.status}</p>
      기타 필요한 데이터들 추가
    </div>
  );
};

export default DealContent;
