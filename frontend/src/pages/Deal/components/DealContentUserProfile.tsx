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
interface UserProfileProps {
  imageUrl: string; // 이미지 URL의 타입은 string
  nickname: string; // 닉네임의 타입도 string
  value: string;
}

const DealContentUserProfile: React.FC<UserProfileProps> = ({ imageUrl, nickname, value }) => {
  // const memberQuery = getDealProfileQuery();
  // if (!memberQuery.data) return;
  // const { imageUrl, nickname } = memberQuery.data as UserResponse;

  return (
    <div className="flex flex-row items-center">
      <div className="font-bold mr-[10px]">{value} </div>
      <img className="w-[30px] h-[30px] rounded-full" alt="Profile" src={imageUrl} />
      <div className="flex-1 text-left text-[13px] pl-[10px] text-gray-400 font-bold">{nickname}</div>
    </div>
  );
};
export default DealContentUserProfile;
