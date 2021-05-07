import axios from 'axios';

const backendUrl = process.env.REACT_APP_DEV_OR_PRD === 'development'
                    ? "http://localhost:8000/api/v1/"
                    : process.env.REACT_APP_PRD_END_POINT

const instance = axios.create({
    baseURL: backendUrl,
    // withCredentials: true,
    // xsrfCookieName: 'csrftoken',
    // xsrfHeaderName: 'X-CSRFToken'
});

export default instance;