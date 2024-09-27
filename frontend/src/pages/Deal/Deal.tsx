import DealContentContainer from './components/DealContentContainer';
import DealContentDetail from './components/DealContentDetail';

const Deal = () => {
  return (
    <div className="container flex flex-row">
      <div className="flex-1 border-r">
        <DealContentContainer />
      </div>
      <div className="flex-3">
        <DealContentDetail />
      </div>
    </div>
  );
};

export default Deal;
