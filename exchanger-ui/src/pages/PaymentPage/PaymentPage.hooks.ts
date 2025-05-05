import React from 'react';
import { getPayout } from '../../api/handlers';
import { $payout } from '../../stores/payout.store';
import { useParams } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { useInterval } from '../../hooks/useInterval';

export const usePaymentPage = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    
    const payout = useStore($payout);

    const { id = '' } = useParams();

    const getPayoutInfo = React.useCallback(async () => {
        try {
            const newPayout = await getPayout(payout?.id || Number(id));
            $payout.set(newPayout);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
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

    return { isLoading };
};
