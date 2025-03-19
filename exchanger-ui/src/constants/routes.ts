export const ROUTES = {
    root: '/',
    userDetails: (sourceId?: number | undefined) => `/user-details/${sourceId || ':id'}`,
    payment: (id?: number | undefined) => `/payment/${id || ':id'}`,
    payoutStatus: (id?: number | undefined) => `/payout-status/${id || ':id'}`,
};
