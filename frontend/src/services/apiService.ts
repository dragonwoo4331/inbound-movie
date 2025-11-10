import axios, { AxiosError, AxiosResponse } from 'axios'
import { storage } from '../shared/utils'
import { UI_CONSTANTS } from '../shared/constants'

const api = axios.create({
  baseURL: UI_CONSTANTS.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: UI_CONSTANTS.API_TIMEOUT,
})

// 요청 인터셉터: 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = storage.get(UI_CONSTANTS.LOCAL_STORAGE_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터: 상세한 에러 처리
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      storage.remove(UI_CONSTANTS.LOCAL_STORAGE_TOKEN_KEY)
      window.location.href = '/login'
      return Promise.reject(new Error(UI_CONSTANTS.AUTH_EXPIRED_ERROR))
    }

    if (error.response?.status === 403) {
      return Promise.reject(new Error(UI_CONSTANTS.ACCESS_DENIED_ERROR))
    }

    if (error.response?.status === 404) {
      return Promise.reject(new Error(UI_CONSTANTS.RESOURCE_NOT_FOUND_ERROR))
    }

    if (error.response?.status === 429) {
      return Promise.reject(new Error(UI_CONSTANTS.RATE_LIMIT_ERROR))
    }

    if (error.response && error.response.status >= 500) {
      return Promise.reject(new Error(UI_CONSTANTS.SERVER_ERROR))
    }

    if (error.code === 'NETWORK_ERROR') {
      return Promise.reject(new Error(UI_CONSTANTS.NETWORK_ERROR))
    }

    if (error.code === 'TIMEOUT') {
      return Promise.reject(new Error(UI_CONSTANTS.TIMEOUT_ERROR))
    }

    // 백엔드에서 보낸 에러 메시지 처리
    if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      return Promise.reject(new Error((error.response.data as { message: string }).message))
    }

    return Promise.reject(new Error(UI_CONSTANTS.UNKNOWN_ERROR))
  }
)

export default api

