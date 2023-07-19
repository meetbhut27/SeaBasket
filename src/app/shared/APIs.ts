const baseAPI = 'http://localhost:3000'

// Auth Module APIs
export const loginAPI = baseAPI + '/login';
export const verificationAPI = baseAPI + '/login/';
export const forgetPasswordAPI = baseAPI + '/forgot-password';
export const resetPasswordAPI = baseAPI + '/password-reset/';


//profile Module APIs
export const profileAPI = baseAPI + '/profile';
export const orderAPI = baseAPI + '/order';

//order Module APIs
export const orderDetailsAPI = baseAPI + '/order/';