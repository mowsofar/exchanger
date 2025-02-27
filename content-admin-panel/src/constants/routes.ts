export const ROUTES = {
    root: '/',
    login: '/login',
    paymentSystems: '/payment_systems',
    currency: '/currency',
    currencyGenerals: (id: number | undefined) => `/currency/generals/${id || ':id'}`,
    currencyCode: '/currecy_code',
    exchangeDirections: '/exchange_directions',
    payouts: '/payouts',
    payout: (id: number | undefined) => `/payout/${id || ':id'}`,
    additionalFields: '/additionalFields',
};