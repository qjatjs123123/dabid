import useDealContentList from '../../../business/hooks/useDeal/useDealContentList';

const DealContent = () => {
  const { data: dealContentList, error, isLoading } = useDealContentList();

  console.log(dealContentList);
  return (
    <div className="w-[400px]">
      <div className="w-full h-[400px] border-2 border-black">{}</div>
    </div>
  );
};

export default DealContent;
