export const ROUTES = {
    root: '/',
    userDetails: '/user_details',
    payment: (id?: number | undefined) => `/payment/${id || ':id'}`,
    payoutStatus: (id?: number | undefined) => `/payout_status/${id || ':id'}`,
};
