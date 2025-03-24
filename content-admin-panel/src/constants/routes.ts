export const ROUTES = {
    root: '/',
    login: '/content-admin/login',
    paymentSystems: '/content-admin/payment-systems',
    currency: '/content-admin/currency',
    currencyGenerals: (id: number | undefined) => `/content-admin/currency/generals/${id || ':id'}`,
    currencyCode: '/content-admin/currecy_code',
    exchangeDirections: '/content-admin/exchange-directions',
    payouts: '/content-admin/payouts',
    payout: (id: number | undefined) => `/content-admin/payout/${id || ':id'}`,
    additionalFields: '/content-admin/additional-fields',
};