const baseAPI = 'http://localhost:3000';

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

//products Module APIs
export const productsAPI = baseAPI + '/product';
export const productDetailsAPI = baseAPI + '/product/';
export const productsFilterAPI = baseAPI + '/filter';
export const sortedProductAPI = baseAPI + '/sorted-product';
export const productSearchAPI = baseAPI + '/search';
export const addTocartAPI= baseAPI + '/cart';

//home Module API
export const categoriesAPI = baseAPI + '/categories';
export const trendingProductsAPI = baseAPI + '/trending-products';