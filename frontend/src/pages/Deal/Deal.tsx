import Chat from '../../components/Chat/Chat';
import DealContentContainer from './components/DealContentContainer';
import DealContentDetail from './components/DealContentDetail';

const Deal = () => {
  return (
    <div className="container flex flex-row">
      <div className="flex-1">
        <DealContentContainer />
      </div>
      <div className="flex-3 ">
        <DealContentDetail />
      </div>
      <div>
        <Chat />
      </div>
    </div>
  );
};

export default Deal;
