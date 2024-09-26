import DealContentContainer from './components/DealContentContainer';
import DealContentDetail from './components/DealContentDetail';

const Deal = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-row">
      <DealContentContainer />
      <DealContentDetail />
    </div>
  );
};

export default Deal;
