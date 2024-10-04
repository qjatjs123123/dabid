import { useRef, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';

const useWebSocket = (dealId: number, onMessage: (message: any) => void) => {
  const stompClient = useRef<Client | null>(null);

  // // 웹소켓 연결
  // const connect = () => {
  //   // const socket = new WebSocket('ws://localhost:8080/api/chat');
  //   const socket = new WebSocket('wss://j11a505.p.ssafy.io/api/chat');
  //   stompClient.current = Stomp.over(socket)!;
  //   stompClient.current.connect({}, () => {
  //     stompClient.current?.subscribe(`/sub/chat/room/${dealId}`, (message) => {
  //       const parsedMessage = JSON.parse(message.body);
  //       onMessage(parsedMessage); // 수신한 메시지를 처리하는 함수 호출
  //     });
  //   });
  // };
  const [isConnected, setIsConnected] = useState(false);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5; // 재연결 시도 횟수 제한

  // 웹소켓 연결
  const connect = () => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.error('Max reconnect attempts reached');
      return;
    }

    const socket = new WebSocket('wss://j11a505.p.ssafy.io/api/chat');
    stompClient.current = Stomp.over(socket)!;

    stompClient.current.connect(
      {},
      () => {
        console.log('Connected to WebSocket');
        setIsConnected(true);
        reconnectAttempts.current = 0; // 성공 시 재연결 시도 횟수 초기화

        stompClient.current?.subscribe(`/sub/chat/room/${dealId}`, (message) => {
          const parsedMessage = JSON.parse(message.body);
          onMessage(parsedMessage); // 수신한 메시지를 처리하는 함수 호출
        });
      },
      (error) => {
        console.error('WebSocket connection error', error);
        setIsConnected(false);
        scheduleReconnect(); // 연결 실패 시 재연결 시도
      },
    );

    // 연결이 닫혔을 때 재연결
    socket.onclose = () => {
      console.warn('WebSocket connection closed');
      setIsConnected(false);
      scheduleReconnect(); // 연결 종료 시 재연결 시도
    };

    // 오류 발생 시 재연결
    socket.onerror = (error) => {
      console.error('WebSocket error', error);
      setIsConnected(false);
      scheduleReconnect(); // 오류 발생 시 재연결 시도
    };
  };

  // 재연결 로직
  const scheduleReconnect = () => {
    if (reconnectInterval.current) {
      clearTimeout(reconnectInterval.current);
    }
    reconnectInterval.current = setTimeout(() => {
      reconnectAttempts.current += 1;
      console.log(`Reconnect attempt ${reconnectAttempts.current}`);
      connect();
    }, 3000); // 3초 후에 재연결 시도
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
    if (reconnectInterval.current) {
      clearTimeout(reconnectInterval.current);
    }
  };

  useEffect(() => {
    connect();
    return () => disconnect(); // 컴포넌트 언마운트 시 연결 해제
  }, [dealId]);

  return { sendMessage, disconnect };
};

export default useWebSocket;
