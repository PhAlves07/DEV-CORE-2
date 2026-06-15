// Import traz dependencias usadas por este arquivo.
import axios from 'axios';

export const API_BASE_URL = 'http://192.168.0.5:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = `${config.baseURL || API_BASE_URL}${config.url || ''}`;

  console.log(`[API REQUEST] ${method} ${url}`);

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const method = error.config?.method?.toUpperCase() || 'GET';
    const url = `${error.config?.baseURL || API_BASE_URL}${error.config?.url || ''}`;
    const status = error.response?.status || 'SEM_STATUS';

    console.log(`[API ERROR] ${status} ${method} ${url}`);
    console.log('[API ERROR DATA]', error.response?.data || error.message);

    return Promise.reject(error);
  }
);

export function getApiErrorMessage(error: any, fallback: string) {
  const data = error?.response?.data;

  if (typeof data === 'string') {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (error?.response?.status) {
    return `Erro ${error.response.status} ao chamar ${error.config?.url || 'API'}`;
  }

  return fallback;
}

export default api;
