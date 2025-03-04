import React from 'react';
import { createPayout } from '../../api/handlers';
import { $payout } from '../../stores/payout.store';

export const useUserDetailsPage = () => {
    const createNewPayout = React.useCallback(async (
        srcCurrencyId: number, targetCurrencyId: number, amountFrom: number, amountTo: number, requisites: string, course: number, email: string, referralCode: string | null) => {
        const payout = await createPayout(srcCurrencyId,targetCurrencyId, amountFrom, amountTo, requisites, course, email, referralCode);
        $payout.set(payout);
    }, []);

    return {
        createNewPayout
    };
};
