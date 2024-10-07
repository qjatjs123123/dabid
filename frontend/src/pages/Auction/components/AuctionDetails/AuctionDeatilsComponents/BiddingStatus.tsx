import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CancelAuctionModal from '../../Modal/CancelAuctionModal';
import JoinAuctionModal from '../../Modal/JoinAuctionModal';
import GiveupBiddingModal from '../../Modal/GiveupBiddingModal';
import AttemptBiddingModal from '../../Modal/AttemptBiddingModal';
import { MEMBER_API_URL, PAGE_URL } from '../../../../../util/Constants';
import axios from '../../../../../api/axiosConfig';
import { useRecoilState } from 'recoil';
import { UserInfo, userState } from '../../../../../stores/recoilStores/Member/userState';
import BiddingResultModal from '../../Modal/BiddingResultModal';

interface BiddingStatusProps {
  auctionId: number;
  isOwner: boolean;
  isParticipant: boolean;
  isFirstMember: boolean;
  firstBid: String;
  bid: String;
}

const BiddingStatus: React.FC<BiddingStatusProps> = ({
  auctionId,
  isOwner,
  isParticipant,
  isFirstMember,
  firstBid,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isGiveupModalOpen, setGiveupModalOpen] = useState(false);
  const [isBiddingModalOpen, setBiddingModalOpen] = useState(false);
  const [inputBiddingValue, setInputBiddingValue] = useState('0');
  const [userInfo, setUserInfo] = useRecoilState<UserInfo | null>(userState);

  const [modalResultIsOpen, setModalResultIsOpen] = useState(false);
  const [modalResultMessage, setModalResultMessage] = useState('');

  const handleInputBiddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputBiddingValue(e.target.value);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const openGiveupModal = () => {
    setGiveupModalOpen(true);
  };

  const openBiddingModal = () => {
    setBiddingModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setGiveupModalOpen(false);
    setBiddingModalOpen(false);
  };

  const closeResultModal = () => {
    setModalResultIsOpen(false);
    navigate(0);
  };

  const cancelHandleConfirm = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://j11a505.p.ssafy.io/api/auctions/${auctionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        try {
          const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
          setUserInfo(response.data);
        } catch (error) {
          console.error('User info update failed:', error);
        }
        navigate(PAGE_URL.AUCTION_LIST);

        setModalResultMessage('경매가 성공적으로 취소되었습니다.');
        setModalResultIsOpen(true);
      } else {
        // alert('경매 취소에 실패했습니다.');
        setModalResultMessage('경매 취소에 실패했습니다.');
        setModalResultIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('네트워크 오류가 발생했습니다.');
      setModalResultMessage('네트워크 오류가 발생했습니다.');
      setModalResultIsOpen(true);
    } finally {
      closeModal();
    }
  };

  const joinHandleConfirm = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://j11a505.p.ssafy.io/api/biddings/${auctionId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        try {
          const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
          setUserInfo(response.data);
        } catch (error) {
          console.error('User info update failed:', error);
        }
        navigate(0);

        setModalResultMessage('경매에 참여하셨습니다.');
        setModalResultIsOpen(true);
        // navigate(0);
      } else {
        // alert('경매 참여에 실패했습니다.');
        setModalResultMessage('경매에 실패했습니다.');
        setModalResultIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('네트워크 오류가 발생했습니다.');
      setModalResultMessage('네트워크 오류가 발생했습니다.');
      setModalResultIsOpen(true);
    } finally {
      closeModal();
    }
  };

  const giveupHandleConfirm = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://j11a505.p.ssafy.io/api/biddings/${auctionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        try {
          const response = await axios.get(`${MEMBER_API_URL.MY_INFO}`);
          setUserInfo(response.data);
        } catch (error) {
          console.error('User info update failed:', error);
        }
        navigate(0);

        setModalResultMessage('경매 참여를 포기하였습니다.');
        setModalResultIsOpen(true);
        // navigate(0);
      } else {
        // alert('경매 참여 포기에 실패했습니다.');
        setModalResultMessage('경매 참여 포기에 실패했습니다.');
        setModalResultIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('네트워크 오류가 발생했습니다.');
      setModalResultMessage('네트워크 오류가 발생했습니다.');
      setModalResultIsOpen(true);
    } finally {
      closeModal();
    }
  };

  const AttemptHandleConfirm = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://j11a505.p.ssafy.io/api/biddings/${auctionId}/${inputBiddingValue}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // alert('경매 입찰에 성공하였습니다.');
        setModalResultMessage('경매 입찰에 성공하였습니다.');
        setModalResultIsOpen(true);
        // navigate(0);
      } else if (response.status === 202) {
        // alert('입찰 금액이 부족합니다.');
        setModalResultMessage('입찰 금액이 부족합니다.');
        setModalResultIsOpen(true);
        // navigate(0);
      } else {
        // alert('경매 입찰에 실패했습니다.');
        setModalResultMessage('경매 입찰에 실패했습니다.');
        setModalResultIsOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('네트워크 오류가 발생했습니다.');
      setModalResultMessage('네트워크 오류가 발생했습니다.');
      setModalResultIsOpen(true);
    } finally {
      closeModal();
    }
  };

  return (
    <div>
      {!isOwner && isParticipant ? (
        <div className="mt-4 flex justify-between items-center">
          <label className="text-gray-600 mb-2">내 입찰가</label>
          {isFirstMember ? (
            <div className="flex items-center">
              <p>{firstBid}</p>
              <span className="ml-2 text-gray-600">WON</span>
            </div>
          ) : (
            <div className="flex items-center">
              <input
                type="text"
                className="border rounded py-2 px-3 w-40 text-right"
                placeholder="0"
                value={inputBiddingValue}
                onChange={handleInputBiddingChange}
              />
              <span className="ml-2 text-gray-600">WON</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center"></div>
      )}

      <div className="mt-6 flex justify-center">
        <input type="hidden" value={auctionId} />
        {isOwner ? (
          <div>
            <button onClick={openModal} className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
              경매 취소
            </button>
            <CancelAuctionModal
              auctionId={auctionId}
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={cancelHandleConfirm}
            />
          </div>
        ) : isParticipant && !isFirstMember ? (
          <div className="flex justify-around w-full">
            <button
              onClick={openBiddingModal}
              className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              입찰하기
            </button>
            <button
              onClick={openGiveupModal}
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition ml-2"
            >
              참여포기
            </button>
            <GiveupBiddingModal
              auctionId={auctionId}
              isOpen={isGiveupModalOpen}
              onClose={closeModal}
              onConfirm={giveupHandleConfirm}
            />
            <AttemptBiddingModal
              auctionId={auctionId}
              bid={inputBiddingValue}
              isOpen={isBiddingModalOpen}
              onClose={closeModal}
              onConfirm={AttemptHandleConfirm}
            />
          </div>
        ) : isParticipant && isFirstMember ? (
          <label className="text-red-600 mb-2">귀하는 현재 유력 낙찰자입니다!</label>
        ) : (
          <div>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              경매 참여
            </button>
            <JoinAuctionModal
              auctionId={auctionId}
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={joinHandleConfirm}
            />
          </div>
        )}
        <BiddingResultModal
          isOpen={modalResultIsOpen}
          onClose={closeResultModal}
          modalResultMessage={modalResultMessage}
        />
      </div>
    </div>
  );
};

export default BiddingStatus;
