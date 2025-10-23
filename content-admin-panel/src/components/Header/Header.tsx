import { IconSettings } from '@salutejs/plasma-icons';
import { surfaceSolid03 } from '@salutejs/plasma-tokens';
import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import logo from './images/logo-kykyshka2.png';
import { UserPopover } from '../UserPopover/UserPopover';
import { IconButton } from '@salutejs/plasma-web';

const StyledRoot = styled.div`
    height: 70px;
    min-height: 84px;
    padding: 0 31px 0 34px;

    border-bottom: 1px solid ${surfaceSolid03};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.img`
    height: 60px;
`;

const StyledRightHeaderButtons = styled.div`
    display: flex;
    column-gap: 20px;
    align-items: center;
`;

export const Header: React.FC = () => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');

    const navigate = useNavigate();

    return (
        <StyledRoot>
            <Logo src={logo} />
            <StyledRightHeaderButtons>
                <IconButton view="secondary" size="s" onClick={() => navigate(ROUTES.settings)}>
                    <IconSettings size="s" />
                </IconButton>

                <UserPopover
                    firstName={firstName || ''}
                    lastName={lastName || ''}
                    email={email || ''}
                    isOpen={isPopoverOpen}
                    onToggle={setIsPopoverOpen}
                />
            </StyledRightHeaderButtons>
        </StyledRoot>
    );
};
