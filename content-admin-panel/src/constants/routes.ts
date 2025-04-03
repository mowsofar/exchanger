export const ROUTES = {
    root: '/content-admin',
    login: '/content-admin/login',
    paymentSystems: '/content-admin/payment-systems',
    currency: '/content-admin/currency',
    currencyGenerals: (id: number | undefined) => `/content-admin/currency/generals/${id || ':id'}`,
    currencyCode: '/content-admin/currecy_code',
    exchangeDirections: '/content-admin/exchange-directions',
    payouts: '/content-admin/payouts',
    payout: (payouId?: number | undefined) => `/content-admin/payouts/${payouId || ':id'}`,
    additionalFields: '/content-admin/additional-fields',
    requisites: '/content-admin/requisites',
};