import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ENDPOINT;


axios.interceptors.request.use(
    (config) => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IjIyQGdtYWlsLmNvbSIsImlhdCI6MTcyNzMzMjQ5NSwiZXhwIjoxNzI3MzQzMjk1fQ.h3PZ-WaMSTDpPx63NsXZdH1-WH2PomzXYCzLVaqZ35k';
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);

export default axios;