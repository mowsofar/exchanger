import React from 'react';
import { getPayout } from '../../api/handlers';
import { $payout } from '../../stores/payout.store';
import { useInterval } from '../../hooks/useInterval';
import { useStore } from '@nanostores/react';
import { useParams } from 'react-router-dom';

export const usePayoutStatusPage = () => {
    const payout = useStore($payout);

    const { id = '' } = useParams();

    const getPayoutInfo = React.useCallback(async () => {
        try {
            const newPayout = await getPayout(Number(id) || payout?.id || 0);
            $payout.set(newPayout)
        } catch (error) {
            console.log(error);
        }
        ;
    }, [id, payout]);

    React.useEffect(() => {
        getPayoutInfo();
    }, []);

    useInterval(
        () => {
            getPayoutInfo();          
        },
        10000,
        [getPayoutInfo],
    );
};
