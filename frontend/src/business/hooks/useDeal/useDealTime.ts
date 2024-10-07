import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { curDealIdState } from "../../../stores/recoilStores/Deal/stateDealId";
import { getDealContentDetailQuery } from "../../../stores/queries/getDealContentDetailQuery";

const useDealTime = () => {
    const curDealId = useRecoilValue(curDealIdState);
    const dealQuery = getDealContentDetailQuery(curDealId);

    const [remainingTime, setRemainingTime] = useState<string | null>("0일 0시간 0분 0초 남음"); // 기본값 설정

    // 남은 시간을 계산하는 함수
    const calculateRemainingTime = (createdAt: [number, number, number, number, number, number, number]) => {
        const [year, month, day, hour, minute, second] = createdAt;

        // UTC로 생성
        const createdDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second)); 
        const targetDate = new Date(createdDate);
        targetDate.setDate(targetDate.getDate() + 2); // 2일 추가

        // 현재 로컬 시간의 밀리초 계산
        const now = new Date();
        const nowInLocalMilliseconds = now.getTime() - (now.getTimezoneOffset() * 60000); // UTC로 변환하기 위해 오프셋 추가

        // 남은 시간 계산
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
        if (!dealQuery.data) return;

        // 초기 남은 시간 계산
        const initialRemaining = calculateRemainingTime(dealQuery.data.created_at);
        setRemainingTime(initialRemaining);

        const intervalId = setInterval(() => {
            const remaining = calculateRemainingTime(dealQuery.data.created_at);
            setRemainingTime(remaining);
        }, 1000); // 1초마다 업데이트

        // 컴포넌트 언마운트 시 interval 제거
        return () => clearInterval(intervalId);
    }, [dealQuery.data]); // dealQuery.data가 변경될 때마다 실행

    if (!dealQuery.data) return { remainingTime: null };

    return {
        status: dealQuery.data.status,
        timerVisible: dealQuery.data?.timerVisible,
        remainingTime // 남은 시간 반환
    };
};

export default useDealTime;
