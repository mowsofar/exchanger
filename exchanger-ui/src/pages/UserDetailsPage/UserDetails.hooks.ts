import React from 'react';
import { createPayout, getCurrency, getExchangeDirections } from '../../api/handlers';
import { $payout } from '../../stores/payout.store';
import { useParams, useSearchParams } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { $sourceCurrency, $targetCurrency } from '../../stores/currencies.store';

export const useUserDetailsPage = () => {
    const [searchParams] = useSearchParams();
    const sourceCurrency = useStore($sourceCurrency);
    const targetCurrency = useStore($targetCurrency);

    const { sourceId = '', targetId = '' } = useParams();

    const getExchangeDirection = React.useCallback(async () => {
        const direction = await getExchangeDirections(sourceCurrency?.id || Number(sourceId), targetCurrency?.id || Number(targetId));

        $sourceCurrency.set(direction.sourceCurrency);
        $targetCurrency.set(direction.targetCurrency);
    }, [sourceCurrency?.id, sourceId, targetCurrency?.id, targetId]);

    const createNewPayout = React.useCallback(async (
        srcCurrencyId: number, targetCurrencyId: number, amountFrom: number, amountTo: number, requisites: string, sourceFields: {fieldId: number, userValue: string}[], targetFields: {fieldId: number, userValue: string}[], course: number, email: string, referralCode: string | null) => {
        const payout = await createPayout(srcCurrencyId,targetCurrencyId, amountFrom, amountTo, requisites, sourceFields, targetFields, course, email, referralCode);
        $payout.set(payout);

        searchParams.set('payout', String(payout.id));

        return payout;
    }, [searchParams]);

    React.useEffect(() => {
        getExchangeDirection();
    }, [getExchangeDirection]);
    
    return {
        createNewPayout,
    };
};
