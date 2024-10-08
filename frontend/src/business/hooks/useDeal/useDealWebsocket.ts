import { useRef, useEffect, useState } from 'react';
import Stomp, { Client } from 'stompjs';

const useWebSocket = (dealId: number, onMessage: (message: any) => void) => {
  const stompClient = useRef<Client | null>(null);
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

        if (socket.readyState === WebSocket.OPEN && stompClient.current) {
          stompClient.current?.subscribe(`/sub/chat/room/${dealId}`, (message) => {
            const parsedMessage = JSON.parse(message.body);
            onMessage(parsedMessage); // 수신한 메시지를 처리하는 함수 호출
          });
        }
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
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(`/pub/chat/message`, {}, JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected, message not sent.');
    }
  };

  // 연결 해제
  const disconnect = (callback?: () => void) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.disconnect(() => {
        console.log('Disconnected from the server');
      });
    }
    if (reconnectInterval.current) {
      clearTimeout(reconnectInterval.current);
    }
  };

  useEffect(() => {
    disconnect(() => {
      setTimeout(() => {
        connect(); // 대기 후 재연결
      }, 500); // 0.5초 대기 후 재연결
    });

    return () => disconnect();
  }, [dealId]);

  return { sendMessage, disconnect };
};

export default useWebSocket;
