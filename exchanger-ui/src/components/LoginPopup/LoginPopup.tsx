import React from 'react';
import { authenticate } from '../../api/handlers';
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

interface LoginPopupProps {
    opened: boolean;
    onClose: VoidFunction;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ opened, onClose }) => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleClose = () => {
        setLogin('');
        setPassword('');
        setError(false);
        onClose();
    };

    const handleSubmit = async () => {
        try {
            const { accessToken } = await authenticate(login, password);
            localStorage.setItem('accessToken', accessToken);
            $isLoginModalOpen.set(false);
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
