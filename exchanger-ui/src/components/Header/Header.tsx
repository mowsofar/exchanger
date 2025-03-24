import styled, { css } from 'styled-components';
import { Button } from '../Button/Button';
import { LoginPopup } from '../LoginPopup/LoginPopup';
import React from 'react';
import { $isLoginModalOpen, $isRegistrationModalOpen, $user } from '../../stores/user.store';
import { useStore } from '@nanostores/react';
import { RegistrationPopup } from '../RegistrationPopup/RegistrationPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconMenu } from '@salutejs/plasma-icons';
import { Button as PlasmaButton } from '@salutejs/plasma-web';

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

const StyledButton = styled(Button)<{ isActive: boolean }>`
    height: 4rem;
    width: 10rem;
    font-size: 1.9rem;
    margin-right: 5rem;
    z-index: 100;

    @media (max-width: 820px) {
        display: block;
        position: absolute;
        z-index: 100;
        right: 2rem;
        bottom: 2rem;

        ${({ isActive }) =>
            !isActive &&
            css`
                display: none;
            `}
    }
`;

const Menu = styled.div<{ isActive: boolean }>`
    display: flex;
    column-gap: 5rem;
    margin-left: -15rem;
    font-size: 2rem;

    @media (max-width: 820px) {
        position: fixed;
        top: 0;
        right: 0;
        flex-direction: column;
        background-color: var(--backgroundPrimary);
        border-left: 0.3rem solid var(--accent);
        row-gap: 3rem;
        width: 15rem;
        height: 100%;
        transition: transform 0.3s linear;
        z-index: 100;
        padding: 3rem 5rem;

        ${({ isActive }) =>
            !isActive &&
            css`
                display: none;
            `}
    }
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

const HidingButton = styled(PlasmaButton)`
    display: none;
    margin-right: 2rem;

    @media (max-width: 820px) {
        display: block;
        position: fixed;
        z-index: 100;
        right: 0.7rem;
        top: 2rem;
    }
`;

export const Header = () => {
    const [isMenuOpen, setMenuOpen] = React.useState(false);

    const isLoginModalOpen = useStore($isLoginModalOpen);
    const isRegistrationModalOpen = useStore($isRegistrationModalOpen);
    const user = useStore($user);

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <StyledRoot>
                <Logo src="/images/kykyshka.png" onClick={() => navigate(ROUTES.root)} />

                <Menu onClick={() => setMenuOpen(false)} isActive={isMenuOpen}>
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

                {user ? (
                    <StyledButton isActive={isMenuOpen} onClick={() => navigate(ROUTES.profile)}>
                        Кабинет
                    </StyledButton>
                ) : (
                    <StyledButton
                        onClick={() => {
                            $isLoginModalOpen.set(true);
                            setMenuOpen(false);
                        }}
                        isActive={isMenuOpen}
                    >
                        Войти
                    </StyledButton>
                )}

                <HidingButton view="clear" onClick={() => setMenuOpen(!isMenuOpen)}>
                    <IconMenu color="#26c499" size="m" />
                </HidingButton>
            </StyledRoot>

            <LoginPopup opened={isLoginModalOpen} onClose={() => $isLoginModalOpen.set(false)} />
            <RegistrationPopup opened={isRegistrationModalOpen} onClose={() => $isRegistrationModalOpen.set(false)} />
        </>
    );
};
