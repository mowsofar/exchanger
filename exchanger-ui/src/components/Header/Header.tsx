import styled, { css } from 'styled-components';
import { Button } from '../Button/Button';
import { LoginPopup } from '../LoginPopup/LoginPopup';
import React from 'react';
import { $isLoginModalOpen, $isRegistrationModalOpen } from '../../stores/user.store';
import { useStore } from '@nanostores/react';
import { RegistrationPopup } from '../RegistrationPopup/RegistrationPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const StyledRoot = styled.div`
    background: transparent;
    height: 10rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
`;

const Logo = styled.img`
    height: 7.5rem;
    margin-left: 3rem;
    cursor: pointer;

    @media only screen and (max-height: 850px) and (max-width: 500px) {
        height: 4rem;
    }
`;

const StyledButton = styled(Button)`
    height: 4rem;
    width: 10rem;
    font-size: 1.9rem;
    margin-right: 5rem;
    z-index: 100;
`;

const Menu = styled.div`
    display: flex;
    column-gap: 5rem;
    margin-left: -15rem;
    font-size: 2rem;
`;

const MenuItem = styled.div<{ isActive: boolean }>`
    color: white;
    cursor: pointer;
    z-index: 100;

    ${({ isActive }) =>
        isActive &&
        css`
            color: var(--accent);
        `}

    &:hover {
        color: var(--accent);
    }
`;

export const Header = () => {
    const isLoginModalOpen = useStore($isLoginModalOpen);
    const isRegistrationModalOpen = useStore($isRegistrationModalOpen);

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <StyledRoot>
                <Logo src="/images/kykyshka.png" onClick={() => navigate(ROUTES.root)} />

                <Menu>
                    <MenuItem isActive={location.pathname === ROUTES.rules} onClick={() => navigate(ROUTES.rules)}>
                        Правила
                    </MenuItem>
                    <MenuItem isActive={location.pathname === ROUTES.faq} onClick={() => navigate(ROUTES.faq)}>
                        FAQ
                    </MenuItem>
                    <MenuItem isActive={location.pathname === ROUTES.amlKyc} onClick={() => navigate(ROUTES.amlKyc)}>
                        AML/KYC
                    </MenuItem>
                </Menu>

                <StyledButton onClick={() => $isLoginModalOpen.set(true)}>Войти</StyledButton>
            </StyledRoot>

            <LoginPopup opened={isLoginModalOpen} onClose={() => $isLoginModalOpen.set(false)} />
            <RegistrationPopup opened={isRegistrationModalOpen} onClose={() => $isRegistrationModalOpen.set(false)} />
        </>
    );
};
