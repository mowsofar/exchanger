import React from 'react';
import { getAccount, getFilteredPayouts, getPayouts } from '../../api/handlers';

import { $user, $userPayouts } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { PayoutStatus } from '../../api/types/common';

export const useUserAccountPage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(true);

    const initialType = new URLSearchParams(window.location.search).get('type');

    const getUserInfo = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const user = await getAccount();
            localStorage.setItem('firstName', user?.firstname);
            localStorage.setItem('lastName', user?.lastname);
            localStorage.setItem('email', user?.email);
            
            $user.set(user);

            if (initialType) {
                const payouts = await getFilteredPayouts(initialType as PayoutStatus);
                $userPayouts.set(payouts);
            } else {
                const payouts = await getPayouts();
                $userPayouts.set(payouts);
            }
        } catch (error) {
            navigate(ROUTES.root);
        } finally {
            setIsLoading(false);
        }
        
    }, [initialType, navigate]);

    React.useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    return { isLoading }
};