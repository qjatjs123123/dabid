import { useRef, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';

const useWebSocket = (dealId: number, onMessage: (message: any) => void) => {
  const stompClient = useRef<Client | null>(null);

  // 웹소켓 연결
  const connect = () => {
    const socket = new WebSocket('ws://localhost:8080/api/chat');
    stompClient.current = Stomp.over(socket)!;
    stompClient.current.connect({}, () => {
      stompClient.current?.subscribe(`/sub/chat/room/${dealId}`, (message) => {
        const parsedMessage = JSON.parse(message.body);
        onMessage(parsedMessage); // 수신한 메시지를 처리하는 함수 호출
      });
    });
  };

  // 메시지 전송
  const sendMessage = (message: any) => {
    if (stompClient.current) {
      stompClient.current.send(`/pub/chat/message`, {}, JSON.stringify(message));
    }
  };

  // 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect(() => {
        console.log('Disconnected from the server');
      });
    }
  };

  useEffect(() => {
    connect();
    return () => disconnect(); // 컴포넌트 언마운트 시 연결 해제
  }, [dealId]);

  return { sendMessage, disconnect };
};

export default useWebSocket;
