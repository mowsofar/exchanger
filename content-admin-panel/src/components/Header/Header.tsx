import { IconProfileCircleFill } from '@salutejs/plasma-icons';
import { surfaceSolid02, surfaceSolid03 } from '@salutejs/plasma-tokens';
import styled from 'styled-components';
import { Button } from '../Button/Button.styled';
import React from 'react';
import { Popover } from '@salutejs/plasma-web';

const StyledRoot = styled.div`
    height: 84px;
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

const StyledButton = styled(Button)`
    height: 45px;
    width: 50px !important;
`;

const UserInfo = styled.div`
    display: flex;
    background: ${surfaceSolid02};
    flex-direction: column;
    width: 260px;
    border-radius: 15px;
`;

const UserInfoItem = styled.div`
    display: flex;

    justify-content: space-between;
    column-gap: 30px;
    padding: 12px 20px;

    & div:last-child {
        font-weight: 600;
    }
`;

export const Header: React.FC = () => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');

    return (
        <StyledRoot>
            <Logo src="images/logo-kykyshka2.png" />
            <StyledRightHeaderButtons>
                <Popover
                    opened={isPopoverOpen}
                    onToggle={(is) => setIsPopoverOpen(is)}
                    offset={[0, 6]}
                    placement="bottom"
                    closeOnOverlayClick
                    closeOnEsc
                    target={
                        <StyledButton view="clear">
                            <IconProfileCircleFill size="m" />
                        </StyledButton>
                    }
                >
                    <UserInfo>
                        <UserInfoItem>
                            <div>Имя:</div>
                            <div>{firstName}</div>
                        </UserInfoItem>

                        <UserInfoItem>
                            <div>Фамилия:</div>
                            <div>{lastName}</div>
                        </UserInfoItem>

                        <UserInfoItem>
                            <div>E-mail:</div>
                            <div>{email}</div>
                        </UserInfoItem>
                    </UserInfo>
                </Popover>
            </StyledRightHeaderButtons>
        </StyledRoot>
    );
};
