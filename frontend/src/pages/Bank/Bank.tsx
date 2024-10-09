import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { getImgUrl } from '../../util/Functions';
import { MEMBER_API_URL } from '../../util/Constants';
import { UserInfo, userState } from '../../stores/recoilStores/Member/userState';
import { useRecoilState } from 'recoil';
import { formatNumberWithCommas } from '../../util/moneyComma';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BankModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(isOpen);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userState);
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    const getBankInfo = async () => {
      try {
        const infoResponse = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
        await setUserInfo(infoResponse.data);

        const balanceResponse = await axios.get(`${MEMBER_API_URL.ACCOUNT_BALANCE}`);
        await setAccountBalance(balanceResponse.data.balance);

        const response = await axios.get(`${MEMBER_API_URL.ACCOUNT_TRANSACTION}`);
        setTransactions(response.data.list);
      } catch (error) {
        console.error('Error fetching bank info:', error);
      }
    };

    if (isOpen) {
      setIsVisible(true);
      getBankInfo();
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-end justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackgroundClick} // 배경 클릭 이벤트 추가
    >
      <div
        className={`bg-gray-100 h-3/4 rounded-3xl shadow-lg max-w-lg w-full mb-10 transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}
      >
        <div className={`bg-white h-20 rounded-3xl flex flex-col justify-center`}>
          <div className="flex items-center">
            <img src={getImgUrl('floating/bank.png')} alt="다비드뱅크" className="m-4 mr-0" />
            <h2 className="text-2xl px-4">다비드뱅크에 오신 것을 환영합니다.</h2>
            <button
              onClick={onClose}
              className="absolute text-3xl top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="닫기"
            >
              &times;
            </button>
          </div>
        </div>
        <div className={'p-6'}>
          <div className={`bg-white flex flex-col h-32 justify-evenly px-6 rounded-3xl`}>
            <div>
              <p className="text-4xl font-semibold">
                <i>{userInfo?.accountNo}</i>
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">
                <i>{formatNumberWithCommas(accountBalance)}</i> 원
              </p>
            </div>
          </div>

          <div className={`bg-white h-[200px] mt-6 py-1 px-4 rounded-3xl overflow-y-auto`}>
            <h3 className="mt-3 text-2xl font-bold">최근 거래 내역</h3>
            <div className="mt-2">
              {Array.isArray(transactions) && transactions.length > 0 ? (
                transactions.slice(0, 5).map((transaction, index) => (
                  <div
                    key={index}
                    className={`flex justify-between ${transaction.transactionTypeName.includes('출금') ? 'text-red-500' : 'text-green-500'} mb-2`}
                  >
                    <span>
                      {transaction.transactionSummary} {transaction.transactionTypeName}{' '}
                      {formatNumberWithCommas(transaction.transactionBalance)}원
                    </span>
                    <span>
                      {transaction.transactionDate.slice(0, 4) +
                        '/' +
                        transaction.transactionDate.slice(4, 6) +
                        '/' +
                        transaction.transactionDate.slice(6, 8)}{' '}
                      {transaction.transactionTime.slice(0, 2) + ':' + transaction.transactionTime.slice(2, 4)}
                    </span>
                  </div>
                ))
              ) : (
                <p>거래 내역이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankModal;
