export const ROUTES = {
    root: '/content-admin/',
    login: '/content-admin/login',
    paymentSystems: '/content-admin/payment_systems',
    currency: '/content-admin/currency',
    currencyGenerals: (id: number | undefined) => `/content-admin/currency/generals/${id || ':id'}`,
    currencyCode: '/content-admin/currecy_code',
    exchangeDirections: '/content-admin/exchange_directions',
    payouts: '/content-admin/payouts',
    payout: (id: number | undefined) => `/content-admin/payout/${id || ':id'}`,
    additionalFields: '/content-admin/additionalFields',
};