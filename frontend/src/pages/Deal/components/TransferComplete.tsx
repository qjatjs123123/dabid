// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import bankIcon from '../../../assets/floating/bankIcon.svg';

// // interface TransferCompleteProps {
// //   amount: number;
// //   recipient: string;
// //   date: string;
// // }

// // const TransferComplete: React.FC<TransferCompleteProps> = ({ amount, recipient, date, onClose }) => {
// //   const navigate = useNavigate();

// //   const handleConfirm = () => {
// //     onClose(); // 모달 닫기
// //     navigate('/deal'); // 확인 버튼 클릭 시 페이지 이동
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white w-[350px] p-6 rounded-lg shadow-lg text-center">
// //         <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold">
// //           &times;
// //         </button>
// //         <img
// //           src={bankIcon} // 이체 완료 페이지의 로고
// //           alt="Bank Logo"
// //           className="mx-auto mb-4"
// //           style={{ width: '50px' }}
// //         />
// //         <div className="text-xl font-bold mb-2">{amount.toLocaleString()}원</div>
// //         <div className="text-lg mb-4">송금 완료</div>

// //         <div className="text-left mb-2">
// //           <span className="text-gray-500">받는 분</span>
// //           <span className="float-right">{recipient}</span>
// //         </div>

// //         <div className="text-left mb-4">
// //           <span className="text-gray-500">날짜</span>
// //           <span className="float-right">{date}</span>
// //         </div>

// //         <div className="flex justify-between mt-4">
// //           <button className="w-full py-2 text-white bg-blue-500 rounded-lg" onClick={handleConfirm}>
// //             확인
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TransferComplete;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import bankIcon from '../../../assets/floating/bankIcon.svg';

// interface TransferCompleteProps {
//   amount: number;
//   recipient: string;
//   date: string;
//   onClose: () => void;
// }

// const TransferComplete: React.FC<TransferCompleteProps> = ({ amount, recipient, date, onClose }) => {
//   const navigate = useNavigate();

//   const handleConfirm = () => {
//     onClose(); // 모달 닫기
//     navigate('/deal'); // 송금 성공 후 이동할 페이지
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-[350px] p-6 text-center relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold">
//           &times;
//         </button>
//         <div className="flex justify-center mb-4">
//           <img src={bankIcon} alt="bank-icon" style={{ width: '50px' }} />
//         </div>
//         <div className="text-xl font-bold mb-4">{amount.toLocaleString()}원</div>
//         <div className="text-lg mb-4">송금 완료</div>

//         <div className="text-left mb-2">
//           <span className="text-gray-500">받는 분</span>
//           <span className="float-right">{recipient}</span>
//         </div>

//         <div className="text-left mb-4">
//           <span className="text-gray-500">날짜</span>
//           <span className="float-right">{date}</span>
//         </div>

//         <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4" onClick={handleConfirm}>
//           확인
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TransferComplete;
