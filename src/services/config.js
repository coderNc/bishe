
export const devBaseURL = "http://127.0.0.1:4523/mock/863316";
export const mockBaseURL = "http://127.0.0.1:4523/mock/863316";
export const proBaseURL = "http://123.207.32.32:9001";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;