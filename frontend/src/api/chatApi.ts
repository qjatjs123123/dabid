import axios from 'axios';

export const fetchChatMessages = async (dealId: number) => {
  const response = await axios.get(`http://localhost:8080/api/deal/chat/${dealId}/messages`);
  return response.data;
};
