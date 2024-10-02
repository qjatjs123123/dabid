import ContentProgress from '../../../components/Progress/ContentProgress';
import { DEAL_STAGE } from '../../../util/Constants';

const DealStatus = () => {
  return (
    <div>
      <div className="font-[800] text-[20px] mb-[10px]">거래 진행 상황</div>
      <ContentProgress data={DEAL_STAGE} />
    </div>
  );
};

export default DealStatus;
