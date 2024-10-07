import { getDealProfileQuery } from '../../../stores/queries/getDealProfileQuery';
interface UserResponse {
  code: string; // "SU"
  message: string; // "Success."
  email: string; // "qwer1212@gmail.com"
  phoneNumber: string; // "010-4564-9350"
  nickname: string; // "은밀한 고래밥"
  imageUrl: string; // null 값일 수 있음
  point: number; // 10000
  role: string; // "USER"
}

const DealContentUserProfile = () => {
  const memberQuery = getDealProfileQuery();
  if (!memberQuery.data) return;
  console.log(memberQuery.data);
  const { imageUrl, nickname } = memberQuery.data as UserResponse;

  return (
    <div className="flex flex-row items-center">
      <img className="w-[30px] h-[30px] rounded-full" alt="Profile" src={imageUrl}></img>
      <div className="flex-1 text-left text-[13px] pl-[10px] text-gray-400 font-bold">{nickname}</div>
    </div>
  );
};

export default DealContentUserProfile;
