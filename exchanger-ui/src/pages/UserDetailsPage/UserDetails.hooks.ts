import React from 'react';
import { createPayout } from '../../api/handlers';

export const useUserDetailsPage = () => {
    const createNewPayout = React.useCallback(async (
        srcCurrencyId: number, targetCurrencyId: number, amountFrom: number, amountTo: number, requisites: string, course: number, email: string, referralCode?: string) => {
        await createPayout(srcCurrencyId,targetCurrencyId, amountFrom, amountTo, requisites, course, email, referralCode);

    }, []);

    return {
        createNewPayout
    };
};
