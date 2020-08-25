const axios = require('axios');

export const httpClient = axios.create({
    baseURL: 'http://rp5gis.myxomopx.ru/service/',
    timeout: 2000
});