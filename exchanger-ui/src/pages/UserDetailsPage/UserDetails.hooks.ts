import React from 'react';
import { createPayout, getCurrency } from '../../api/handlers';
import { $payout } from '../../stores/payout.store';
import { useParams, useSearchParams } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { $sourceCurrency } from '../../stores/currencies.store';

export const useUserDetailsPage = () => {
    const [searchParams] = useSearchParams();
    const sourceCurrency = useStore($sourceCurrency);

    const { sourceId = '' } = useParams();

    const getCurrencyItem = React.useCallback(async () => {
        const newCurrency = await getCurrency(sourceCurrency?.id || Number(sourceId));
        $sourceCurrency.set(newCurrency);
    }, [sourceCurrency?.id, sourceId]);

    const createNewPayout = React.useCallback(async (
        srcCurrencyId: number, targetCurrencyId: number, amountFrom: number, amountTo: number, requisites: string, course: number, email: string, referralCode: string | null) => {
        const payout = await createPayout(srcCurrencyId,targetCurrencyId, amountFrom, amountTo, requisites, course, email, referralCode);
        $payout.set(payout);

        searchParams.set('payout', String(payout.id));

        return payout;
    }, [searchParams]);
    
    return {
        createNewPayout,
    };
};
