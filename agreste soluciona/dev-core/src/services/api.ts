import { Platform } from 'react-native';

declare const process: {
  env?: {
    EXPO_PUBLIC_API_URL?: string;
  };
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

const defaultApiUrl = Platform.select({
  android: 'http://10.0.2.2:8080',
  ios: 'http://localhost:8080',
  web: 'http://localhost:8080',
  default: 'http://localhost:8080',
});

const API_URL =
  process.env?.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') ?? defaultApiUrl;

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message ??
      Object.values(data ?? {})[0] ??
      'Não foi possível completar a requisição';

    throw new Error(String(message));
  }

  return data as T;
}

export function registerUser(payload: RegisterPayload) {
  return request<User>('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: LoginPayload) {
  return request<User>('/users/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
