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
  
axios.interceptors.request.use(
    async (config) => {
        const newToken = localStorage.getItem('jwtToken');
        if (newToken !== jwtToken) {
            jwtToken = newToken;
            api_protected.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
        return await Promise.resolve(config); // Resolve the Promise to allow the request to proceed
    },
    (error) => {
        console.log("Error");
        return Promise.reject(error);
    }
);

export {api,api_protected};