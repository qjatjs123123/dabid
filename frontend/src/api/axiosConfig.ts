import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ENDPOINT;

axios.interceptors.request.use(
    (config) => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IjIyQGdtYWlsLmNvbSIsImlhdCI6MTcyNzI3MzY4NywiZXhwIjoxNzI3Mjg0NDg3fQ.gPefsJD-9I9me66FJgH23zvB3z7Ncp2siMF2OPFtWw4';
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