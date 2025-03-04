import React from 'react';
import { getPayout } from '../../api/handlers';
import { $payout } from '../../stores/payout.store';
import { useInterval } from '../../hooks/useInterval';
import { useStore } from '@nanostores/react';

export const usePayoutStatusPage = () => {
    const payout = useStore($payout);

    const getPayoutInfo = React.useCallback(async (id: number) => {
        const payout = await getPayout(id);
        $payout.set(payout);
    }, []);

    useInterval(
        () => {
            if (payout) {
                getPayoutInfo(payout.id);
            }
            
        },
        10000,
        [getPayoutInfo],
    );
};
