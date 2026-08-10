import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { authApi } from '../../api/auth/authApi';
import type { RegisterPayload, RegisterResponse, ApiErrorResponse } from '../../api/auth/types';
import { setAuthData } from '../../lib/auth';

export type UseSignupOptions = Omit<
  UseMutationOptions<RegisterResponse, AxiosError<ApiErrorResponse>, RegisterPayload>,
  'mutationFn'
>;

export const useSignup = (options?: UseSignupOptions) => {
  return useMutation<RegisterResponse, AxiosError<ApiErrorResponse>, RegisterPayload>({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data, variables, onMutateResult, context) => {
      // Store session & tokens in localStorage
      setAuthData(data);
      toast.success('Registration successful! Welcome to Follei.');
      
      if (options?.onSuccess) {
        options.onSuccess(data, variables, onMutateResult, context);
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>, variables, onMutateResult, context) => {
      let errorMessage = 'Registration failed. Please check your details and try again.';
      
      const responseData = error.response?.data;
      if (responseData?.detail) {
        if (typeof responseData.detail === 'string') {
          errorMessage = responseData.detail;
        } else if (Array.isArray(responseData.detail) && responseData.detail.length > 0) {
          const firstErr = responseData.detail[0];
          errorMessage = `${firstErr.loc?.slice(-1)[0] || 'Field'}: ${firstErr.msg}`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);

      if (options?.onError) {
        options.onError(error, variables, onMutateResult, context);
      }
    },
    ...options,
  });
};

export default useSignup;
