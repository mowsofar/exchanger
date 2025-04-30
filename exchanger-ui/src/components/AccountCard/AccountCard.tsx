import { IconFileTextOutline, IconKeyOutline, IconProfileBadgeFill } from '@salutejs/plasma-icons';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
    display: flex;
    background: var(--backgroundSecondary);
    border: 0.2rem solid var(--accent);
    flex-direction: column;
    width: 30rem;
    border-radius: 15px;
    color: var(--accentText);
    font-size: 1.7rem;
    overflow: hidden;
    font-weight: 600;
`;

const CardItem = styled.div<{ isActive?: boolean }>`
    padding: 1.5rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
    cursor: pointer;
    border-bottom: 0.1rem solid #5557566e;

    color: ${({ isActive }) => (isActive ? '#2fe8b3' : 'var(--accentText)')};

    &:hover {
        background-color: var(--backgroundTertiary);
    }
`;

const Login = styled.div`
    display: flex;
    column-gap: 1rem;
    justify-content: center;
    align-items: center;

    text-align: center;
    padding: 2.2rem 1rem;
    border-bottom: 0.1rem solid #5557566e;
`;

interface AccountCardProps {
    closeMenu: VoidFunction;
}

export const AccountCard: React.FC<AccountCardProps> = ({ closeMenu }) => {
    const login = localStorage.getItem('email');
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
            <Login>
                <IconProfileBadgeFill size="m" color="var(--accentText)" />
                {login}
            </Login>
            <CardItem isActive={isActiveProfilePage} onClick={handleClickProfiledButton}>
                <IconFileTextOutline size="m" color={isActiveProfilePage ? '#2fe8b3' : 'var(--accentText)'} />
                <div>Мои заявки</div>
            </CardItem>
            <CardItem isActive={isActiveChangePasswordPage} onClick={handleClickChangePasswordButton}>
                <IconKeyOutline size="m" color={isActiveChangePasswordPage ? '#2fe8b3' : 'var(--accentText)'} />
                <div>Сменить пароль</div>
            </CardItem>
        </Card>
    );
};
