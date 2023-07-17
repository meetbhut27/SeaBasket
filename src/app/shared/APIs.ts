const baseAPI = 'http://localhost:3000'

// Auth Module API
export const loginAPI = baseAPI + '/login';
export const verificationAPI = baseAPI + '/login/';
export const forgetPasswordAPI = baseAPI + '/forgot-password';
export const resetPasswordAPI = baseAPI + '/password-reset/';


//profile Module API
export const profileAPI = baseAPI + '/profile';
export const orderAPI = baseAPI + '/order';