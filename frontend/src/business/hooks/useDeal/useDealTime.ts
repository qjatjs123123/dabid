
import { useEffect, useState } from "react";

const useDealTime = (dealQuery: any) => {
    if(!dealQuery) return;
    const [remainingTime, setRemainingTime] = useState<string | null>("0일 0시간 0분 0초 남음"); // 기본값 설정


    const calculateRemainingTime = (createdAt: [number, number, number, number, number, number, number]) => {
        const [year, month, day, hour, minute, second] = createdAt;


        const createdDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second)); 
        const targetDate = new Date(createdDate);
        targetDate.setDate(targetDate.getDate() + 2); // 2일 추가

        const now = new Date();
        const nowInLocalMilliseconds = now.getTime() - (now.getTimezoneOffset() * 60000); 


        const remainingTimeInMilliseconds = targetDate.getTime() - nowInLocalMilliseconds;

        const remainingTimeInSeconds = Math.floor(remainingTimeInMilliseconds / 1000);

        if (remainingTimeInSeconds <= 0) {
            return '남은 시간이 없습니다.';
        }

        const days = Math.floor(remainingTimeInSeconds / (60 * 60 * 24));
        const hours = Math.floor((remainingTimeInSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((remainingTimeInSeconds % (60 * 60)) / 60);
        const seconds = remainingTimeInSeconds % 60;

        return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
    };

    useEffect(() => {
        if (!dealQuery) return;

        const initialRemaining = calculateRemainingTime(dealQuery.created_at);
        setRemainingTime(initialRemaining);

        const intervalId = setInterval(() => {
            const remaining = calculateRemainingTime(dealQuery.created_at);
            setRemainingTime(remaining);
        }, 1000); 


        return () => clearInterval(intervalId);
    }, [dealQuery]); 

    if (!dealQuery) return { remainingTime: null };

    return {
        status: dealQuery?.status,
        timerVisible: dealQuery?.timerVisible,
        remainingTime 
    };
};

export default useDealTime;
