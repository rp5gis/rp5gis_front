const axios = require('axios');

export const httpClient = axios.create({
    baseURL: '/service/',
    timeout: 2000
});