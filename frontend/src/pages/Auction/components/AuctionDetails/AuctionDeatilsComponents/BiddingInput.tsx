// import React from 'react';

// interface BiddingInputProps {
//   auctionId: number;
//   isOwner: boolean;
//   isParticipant: boolean;
//   isFirstMember: boolean;
//   bid: number;
// }

// const BiddingInput: React.FC<BiddingInputProps> = ({ bid, isOwner, isParticipant, isFirstMember }) => {
//   if (isOwner || !isParticipant) {
//     return null; // 조건에 맞지 않으면 아무것도 렌더링하지 않음
//   }

//   return (
//     <div className="mt-4 flex justify-between items-center">
//       <label className="text-gray-600 mb-2">내 입찰가</label>
//       {isFirstMember ? (
//         <div className="flex items-center">
//           <p>{bid}</p>
//           <span className="ml-2 text-gray-600">WON</span>
//         </div>
//       ) : (
//         <div className="flex items-center">
//           <input type="number" className="border rounded py-2 px-3 w-40 text-right" placeholder="0" />
//           <span className="ml-2 text-gray-600">WON</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BiddingInput;
