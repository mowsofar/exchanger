import React from 'react';
import { getAccount } from '../../api/handlers';

import { $user, $userPayouts } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const useUserAccountPage = () => {
    const navigate = useNavigate();

    const getUserInfo = React.useCallback(async () => {
        try {
            const user = await getAccount();
            $user.set(user);
            $userPayouts.set(user.payouts);
            
        } catch (error) {
            navigate(ROUTES.root);
        }
        
    }, [navigate]);

    React.useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);
};