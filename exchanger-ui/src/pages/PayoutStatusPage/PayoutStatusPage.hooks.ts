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
        const newPayout = await getPayout(payout?.id || Number(id));
        $payout.set(newPayout);
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
