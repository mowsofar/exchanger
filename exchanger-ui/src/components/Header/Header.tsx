import styled, { css } from 'styled-components';
import { Button } from '../Button/Button';
import { LoginPopup } from '../LoginPopup/LoginPopup';
import React from 'react';
import { $isLoginModalOpen, $isRegistrationModalOpen } from '../../stores/user.store';
import { useStore } from '@nanostores/react';
import { RegistrationPopup } from '../RegistrationPopup/RegistrationPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconLogout, IconMenu } from '@salutejs/plasma-icons';
import { Button as PlasmaButton, Popover } from '@salutejs/plasma-web';
import { logout } from '../../api/handlers';
import { logoutUser } from '../../api/tokenHandlers';
import { AccountCard } from '../AccountCard/AccountCard';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';

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
    width: fit-content;
    padding: 0rem 1.5rem;
    font-size: 1.8rem;
    z-index: 100;

    @media (max-width: 900px) {
        display: block;
        position: fixed;
        z-index: 1000;
        right: 4rem;
        top: 20rem;

        ${({ isActive }) =>
            !isActive &&
            css`
                display: none;
            `}
    }
`;

const ThemeSwitchButtons = styled(ThemeSwitch)<{ isActive: boolean }>`
    @media (max-width: 900px) {
        position: fixed;
        z-index: 1000;
        right: 4rem;
        align-items: end;
        bottom: 7rem;
        right: 7.5rem;
        top: 28rem;

        ${({ isActive }) =>
            !isActive &&
            css`
                display: none;
            `}
    }
`;

const LoginButton = styled(StyledButton)`
    @media (max-width: 900px) {
        right: 7rem;
    }
`;

const LogoutButton = styled(StyledButton)`
    padding: 0 1.2rem;
    padding-top: 0.4rem;

    @media (max-width: 900px) {
        top: 25rem;
        right: 12rem;
    }
`;

const Menu = styled.div<{ isActive: boolean }>`
    display: flex;
    column-gap: 5rem;
    font-size: 2rem;

    @media (max-width: 1070px) {
        column-gap: 1rem;
        margin-left: -5rem;
    }

    @media (max-width: 900px) {
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
    color: var(--accentText);
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

    @media (max-width: 900px) {
        display: block;
        position: fixed;
        z-index: 100;
        right: 0.7rem;
        top: 2rem;
    }
`;

const RightButtons = styled.div`
    display: flex;
    column-gap: 2rem;

    & button:last-child {
        margin-right: 5rem;
    }
`;

export const Header = () => {
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [isPopoverOpen, setPopoverOpen] = React.useState(false);

    const isLoginModalOpen = useStore($isLoginModalOpen);
    const isRegistrationModalOpen = useStore($isRegistrationModalOpen);

    const location = useLocation();
    const navigate = useNavigate();

    const handleClickLogoutButton = async () => {
        try {
            await logout();
            logoutUser();
            window.location.reload();
        } catch {}
    };

    return (
        <>
            <StyledRoot>
                <Logo src="/images/kykyshkalogo.png" onClick={() => navigate(ROUTES.root)} />

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

                <RightButtons>
                    <ThemeSwitchButtons isActive={isMenuOpen} />

                    {localStorage.getItem('accessToken') ? (
                        <Popover
                            opened={isPopoverOpen}
                            onToggle={(is) => setPopoverOpen(is)}
                            offset={[-45, 8]}
                            placement="bottom"
                            closeOnOverlayClick
                            closeOnEsc
                            target={
                                <StyledButton isActive={isMenuOpen} onDoubleClick={() => navigate(ROUTES.profile)}>
                                    Личный кабинет
                                </StyledButton>
                            }
                        >
                            <AccountCard closeMenu={() => setPopoverOpen(false)} />
                        </Popover>
                    ) : (
                        <LoginButton
                            onClick={() => {
                                $isLoginModalOpen.set(true);
                                setMenuOpen(false);
                            }}
                            isActive={isMenuOpen}
                        >
                            Войти
                        </LoginButton>
                    )}

                    {localStorage.getItem('accessToken') && (
                        <LogoutButton isActive={isMenuOpen} onClick={handleClickLogoutButton}>
                            <IconLogout size="m" color="var(--text)" />
                        </LogoutButton>
                    )}
                </RightButtons>

                <HidingButton view="clear" onClick={() => setMenuOpen(!isMenuOpen)}>
                    <IconMenu color="#26c499" size="m" />
                </HidingButton>
            </StyledRoot>

            <LoginPopup opened={isLoginModalOpen} onClose={() => $isLoginModalOpen.set(false)} />
            <RegistrationPopup opened={isRegistrationModalOpen} onClose={() => $isRegistrationModalOpen.set(false)} />
        </>
    );
};
