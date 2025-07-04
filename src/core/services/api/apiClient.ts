import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { AuthProvider } from '@/core/services/auth/authProviderMsal';
import { GetApiArquitectura, GetTimeout, GetNameApiKey, GetKeyApiKey } from '@/core/utils/GetEnvVariables';

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  
  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: GetApiArquitectura(),
      timeout: GetTimeout().timeout || 10000,
      withCredentials: true,
    });
    
    this.setupInterceptors();
  }
  
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          // Obtener token de acceso
          const token = await AuthProvider.getAccessToken();
          
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          
          // Headers de seguridad adicionales
          config.headers['X-Requested-With'] = 'XMLHttpRequest';
          config.headers[GetNameApiKey()] = GetKeyApiKey();
          config.headers['Content-Type'] = 'application/json; charset=utf-8';
          
          return config;
        } catch (error) {
          return Promise.reject(error);
        }
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        
        // Si es un error 401 y no es un retry
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Intentar refrescar el token
            const token = await AuthProvider.getAccessToken(['api://default']);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // Si el refresh falla, logout y redirigir
            await AuthProvider.logout();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        // Para otros errores, simplemente retornar
        return Promise.reject(error);
      }
    );
  }
  
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
  
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }
  
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }
  
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }
  
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = ApiClient.getInstance();