const axios = require('axios');

const setAuthorizationToken = (token) => {
  const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1/'
  });

  instance.defaults.headers.common.Authorization = token;
};

export default setAuthorizationToken;