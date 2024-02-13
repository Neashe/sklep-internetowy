import axios from "axios";

// Create a base axios instance
const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create an axios instance for protected routes
const api_protected = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for protected routes
api_protected.interceptors.request.use(
    async (config) => {
        // Retrieve the latest token from localStorage
        const jwtToken = localStorage.getItem('jwtToken');

        // Set the Authorization header if the token is available
        if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor for handling token expiration or invalidation
api_protected.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        if (error.response && error.response.status === 401) {

            localStorage.removeItem('jwtToken');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export { api, api_protected };