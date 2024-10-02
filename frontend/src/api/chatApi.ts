import axios from 'axios';

export const fetchChatMessages = async (dealId: number) => {
  const response = await axios.get(`https://j11a505.p.ssafy.io/api/deal/chat/${dealId}/messages`);
  return response.data;
};
