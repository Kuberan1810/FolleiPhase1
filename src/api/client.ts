import axiosInstance from '../lib/axios';

export const apiClient = {
  get: <T>(url: string, params?: object) =>
    axiosInstance.get<T>(url, { params }),
  post: <T>(url: string, data?: object) =>
    axiosInstance.post<T>(url, data),
  put: <T>(url: string, data?: object) =>
    axiosInstance.put<T>(url, data),
  patch: <T>(url: string, data?: object) =>
    axiosInstance.patch<T>(url, data),
  delete: <T>(url: string, params?: object) =>
    axiosInstance.delete<T>(url, { params }),
};

export default apiClient;

