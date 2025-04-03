export const ROUTES = {
    root: '/',
    userDetails: (sourceId?: number | undefined, targetId?: number | undefined) => `/user-details/${sourceId || ':sourceId'}/${targetId || ':targetId'}`,
    payment: (id?: number | undefined) => `/payment/${id || ':id'}`,
    payoutStatus: (id?: number | undefined) => `/payout-status/${id || ':id'}`,
    rules: '/rules',
    faq: '/faq',
    amlKyc: '/aml-kyc',
    profile: '/profile',
    settings: '/settings',
};
