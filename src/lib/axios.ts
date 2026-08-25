import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { getAccessToken, getRefreshToken, clearAuthData, setAuthData } from './auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export interface EnvelopeMeta {
  request_id?: string;
  generated_at?: string;
  accepted?: boolean;
}

export interface StandardEnvelope<T = any> {
  data: T;
  meta?: EnvelopeMeta;
  errors?: any[];
}

export class ApiError extends Error {
  public status: number;
  public code?: string;
  public detail?: string;
  public retryable: boolean;
  public fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    code?: string,
    detail?: string,
    retryable: boolean = false,
    fieldErrors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.detail = detail;
    this.retryable = retryable;
    this.fieldErrors = fieldErrors;
  }
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
});

// Paths that do NOT require Authorization header
const PUBLIC_PATHS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/google/start',
  '/api/auth/google/exchange'
];

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Determine if we need to set Content-Type to application/json
    // If it's FormData (multipart upload), browser will set it automatically with boundary.
    if (!(config.data instanceof FormData) && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    const isPublic = PUBLIC_PATHS.some((path) => config.url?.includes(path));

    if (!isPublic) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // If it's a standard envelope, we might want to return the whole response or just data
    // For this integration, we'll return the response as is and let the caller handle .data
    return response;
  },
  async (error: AxiosError<any>) => {
    const status = error.response?.status || 500;

    const data = error.response?.data;
    let message = error.message;
    let detail = undefined;
    let code = undefined;
    let fieldErrors = undefined;
    
    // Attempt to parse FastAPI JSON errors
    if (data) {
      if (typeof data.detail === 'string') {
        detail = data.detail;
        message = detail;
      } else if (Array.isArray(data.detail)) {
        // Validation errors (422)
        message = 'Validation error';
        fieldErrors = {};
        data.detail.forEach((err: any) => {
          const fieldName = err.loc?.[err.loc.length - 1] || 'unknown';
          if (!fieldErrors![fieldName]) fieldErrors![fieldName] = [];
          fieldErrors![fieldName].push(err.msg);
        });
      } else if (data.message) {
        message = data.message;
      }
      code = data.code;
    }

    // Determine retryable
    const retryable = status >= 500 || status === 429 || error.code === 'ECONNABORTED';

    const apiError = new ApiError(message, status, code, detail, retryable, fieldErrors);
    
    // Check if it's a 401 and we haven't already retried
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      
      if (refreshToken) {
        try {
          // Use native fetch to avoid interceptor loop
          const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          if (response.ok) {
            const result = await response.json();
            
            if (result.access_token) {
              setAuthData({
                access_token: result.access_token,
                expires_in: result.expires_in,
              });
              
              // Update authorization header and retry original request
              originalRequest.headers.Authorization = `Bearer ${result.access_token}`;
              return axiosInstance(originalRequest);
            }
          }
        } catch (refreshErr) {
          console.error('Token refresh failed', refreshErr);
        }
      }
      
      // If refresh fails or there's no refresh token
      clearAuthData();
      window.dispatchEvent(new Event('follei:unauthorized'));
    }

    return Promise.reject(apiError);
  }
);

export default axiosInstance;

