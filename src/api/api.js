import axios from "axios";
let jwtToken = localStorage.getItem('jwtToken');

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const api_protected = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
    },
  });
  
  api_protected.interceptors.request.use(
    async (config) => {
        const newToken = localStorage.getItem('jwtToken');
        if (newToken !== jwtToken) {
            jwtToken = newToken;
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api_protected.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Unauthorized error, token is likely invalid
            // Clear token from localStorage and redirect to login page
            localStorage.removeItem('jwtToken');
            console.log("No dziala dziala");
            // Optionally, you can also update the state to reflect the user being logged out
            // setLoggedIn(false);
            // Redirect to login page
            // navigate('/login');
        }
        return Promise.reject(error);
    }
);

export {api,api_protected};