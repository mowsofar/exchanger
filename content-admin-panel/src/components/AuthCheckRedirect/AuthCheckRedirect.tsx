import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccount } from '../../api/handlers';
import { ROUTES } from '../../constants/routes';
import { Spinner } from '@salutejs/plasma-web';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AuthCheckRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        getAccount()
            .then((isAuthenticated) => {
                if (isAuthenticated) {
                    navigate(ROUTES.currencyCode);
                } else {
                    navigate(ROUTES.login);
                }
            })
            .catch(() => {
                navigate(ROUTES.login);
            });
    }, [navigate]);

    return (
        <SpinnerWrapper>
            <Spinner size={40} />
        </SpinnerWrapper>
    );
};
