import { IconFileTextOutline, IconKeyOutline } from '@salutejs/plasma-icons';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { Avatar, BodyL, BodyS } from '@salutejs/plasma-web';

export const Card = styled.div`
    position: relative;
    width: 100%;
    min-width: 25rem;
    border-radius: 1rem;
    padding: 1.5rem 0.2rem 1rem;
    border: 0.5px solid var(--backgroundFourth);
    background: var(--backgroundSecondary);
`;

export const AvatarContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

export const Name = styled(BodyL)`
    color: var(--accentText);
    font-weight: 600 !important;
    text-align: center;
    font-size: 2rem;
`;

export const Email = styled(BodyS)`
    color: var(--backgroundTertiary);
    padding-top: 0.5rem;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
`;

const CardItem = styled.div<{ isActive?: boolean }>`
    padding: 1rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;
    font-size: 1.5rem;
    cursor: pointer;

    color: ${({ isActive }) => (isActive ? '#2fe8b3' : 'var(--accentText)')};

    &:hover {
        border-radius: 0.7rem;
        background-color: var(--backgroundFourth);
    }
`;

interface AccountCardProps {
    closeMenu: VoidFunction;
}

export const AccountCard: React.FC<AccountCardProps> = ({ closeMenu }) => {
    const login = localStorage.getItem('email');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const navigate = useNavigate();

    const isActiveProfilePage = window.location.pathname === ROUTES.profile;
    const isActiveChangePasswordPage = window.location.pathname === ROUTES.settings;

    const handleClickProfiledButton = () => {
        closeMenu();
        navigate(ROUTES.profile);
    };

    const handleClickChangePasswordButton = () => {
        closeMenu();
        navigate(ROUTES.settings);
    };

    return (
        <Card>
            <AvatarContainer>
                <Avatar size="xxl" name={firstName + ' ' + lastName} />
            </AvatarContainer>

            <Name bold>
                {firstName} {lastName}
            </Name>
            <Email>{login}</Email>

            <CardItem isActive={isActiveProfilePage} onClick={handleClickProfiledButton}>
                <div>Мои заявки</div>
                <IconFileTextOutline size="m" color={isActiveProfilePage ? '#2fe8b3' : 'var(--accentText)'} />
            </CardItem>
            <CardItem isActive={isActiveChangePasswordPage} onClick={handleClickChangePasswordButton}>
                <div>Сменить пароль</div>
                <IconKeyOutline size="m" color={isActiveChangePasswordPage ? '#2fe8b3' : 'var(--accentText)'} />
            </CardItem>
        </Card>
    );
};
