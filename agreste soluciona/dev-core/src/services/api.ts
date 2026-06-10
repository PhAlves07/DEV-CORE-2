import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.12.246.106:8080',
});

export default api;