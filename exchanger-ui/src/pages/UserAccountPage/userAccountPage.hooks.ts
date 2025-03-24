import React from 'react';
import { getAccount } from '../../api/handlers';

import { $user } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const useUserAccountPage = () => {
    const navigate = useNavigate();

    const getUserInfo = React.useCallback(async () => {
        try {
            const user = await getAccount();
            $user.set(user);
        } catch (error) {
            navigate(ROUTES.root);
        }
        
    }, [navigate]);

    React.useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);
};