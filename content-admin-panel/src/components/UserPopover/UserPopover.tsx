import { IconLogout } from '@salutejs/plasma-icons';
import { Avatar, IconButton } from '@salutejs/plasma-web';

import {
    AvatarContainer,
    ButtonsContainer,
    Container,
    Email,
    Name,
    StyledButton,
    StyledPopover,
} from './UserPopover.styled';
import { logout } from '../../api/handlers';
import { ROUTES } from '../../constants/routes';
import { useNotification } from '../../hooks/useNotification';
import { useNavigate } from 'react-router-dom';

interface Props {
    firstName: string;
    lastName: string;
    email: string;
    isOpen: boolean;
    onToggle: (state: boolean) => void;
}

export const UserPopover: React.FC<Props> = (props) => {
    const { firstName, lastName, email, isOpen, onToggle } = props;

    const showNotification = useNotification();
    const navigate = useNavigate();

    const handleClickLogoutButton = async () => {
        try {
            await logout();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
            localStorage.removeItem('email');
            navigate(ROUTES.login);
        } catch (error) {
            showNotification('Произошла ошибка', 'error', error);
        }
    };

    return (
        <StyledPopover
            opened={isOpen}
            onToggle={(state) => onToggle(Boolean(state))}
            placement="bottom-end"
            offset={[0, 6]}
            target={
                <IconButton
                    view="secondary"
                    size="s"
                    onClick={() => onToggle(true)}
                    style={{ fontWeight: 600, fontSize: '15px' }}
                >
                    {`${firstName[0]?.toUpperCase() || ''}${lastName[0]?.toUpperCase() || ''}`}
                </IconButton>
            }
            closeOnOverlayClick
            closeOnEsc
        >
            <Container data-test-name="UserPopover">
                <AvatarContainer>
                    <Avatar size="xxl" name={firstName + ' ' + lastName} />
                </AvatarContainer>

                <Name bold>
                    {firstName} {lastName}
                </Name>
                <Email>{email}</Email>

                <ButtonsContainer>
                    <StyledButton
                        onClick={handleClickLogoutButton}
                        contentRight={<IconLogout color="currentColor" size="s" />}
                        view="clear"
                        size="s"
                        contentPlacing="relaxed"
                        stretch
                    >
                        Выйти
                    </StyledButton>
                </ButtonsContainer>
            </Container>
        </StyledPopover>
    );
};
