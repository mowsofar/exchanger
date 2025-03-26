import React from 'react';
import { authenticate, refreshToken } from '../../api/handlers';
import {
    ButtonBlock,
    Content,
    Credentials,
    Description,
    Error,
    StyledButton,
    StyledHeader,
    StyledModal,
    StyledTextField,
    StyledTextFieldPassword,
} from './LoginPopup.styled';
import { $isLoginModalOpen, $isRegistrationModalOpen } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

interface LoginPopupProps {
    opened: boolean;
    onClose: VoidFunction;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ opened, onClose }) => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();

    const handleClose = () => {
        setLogin('');
        setPassword('');
        setError(false);
        onClose();
    };

    const handleSubmit = async () => {
        try {
            const { access_token, refresh_token } = await authenticate(login, password);
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            $isLoginModalOpen.set(false);
            navigate(ROUTES.profile);
        } catch (error) {
            setError(true);
        }
    };

    const onClickRegisterButton = () => {
        $isLoginModalOpen.set(false);
        handleClose();
        $isRegistrationModalOpen.set(true);
    };

    return (
        <StyledModal opened={opened} onClose={handleClose} withBlur>
            <Content>
                <StyledHeader>Вход в личный кабинет</StyledHeader>
                <Credentials>
                    <StyledTextField placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <StyledTextFieldPassword
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />
                    {error && <Error>Не найдено активной учетной записи с указанными данными</Error>}
                </Credentials>
                <ButtonBlock>
                    <StyledButton onClick={handleSubmit}>Войти</StyledButton>
                    <Description>
                        Нет личного кабинета? <span onClick={onClickRegisterButton}>Зарегистрироваться</span>
                    </Description>
                </ButtonBlock>
            </Content>
        </StyledModal>
    );
};
