import React from 'react';
import { register } from '../../api/handlers';
import {
    ButtonBlock,
    Content,
    Credentials,
    Description,
    Error,
    Rules,
    StyledButton,
    StyledCheckbox,
    StyledHeader,
    StyledModal,
    StyledTextField,
    StyledTextFieldPassword,
} from './RegistrationPopup.styled';
import { $isLoginModalOpen, $isRegistrationModalOpen } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

interface RegistrationPopupProps {
    opened: boolean;
    onClose: VoidFunction;
}

export const RegistrationPopup: React.FC<RegistrationPopupProps> = ({ opened, onClose }) => {
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [error, setError] = React.useState('');
    const [isChecked, setIsChecked] = React.useState(true);

    const navigate = useNavigate();

    const handleClose = () => {
        setEmail('');
        setName('');
        setLastName('');
        setPassword('');
        setError('');
        setIsChecked(true);

        onClose();
    };

    const handleSubmit = async () => {
        try {
            if (password !== passwordConfirm) {
                setError('Пароли не совпадают');
                return;
            }

            await register(name, lastName, email, password);
            $isRegistrationModalOpen.set(false);
            handleClose();
            $isLoginModalOpen.set(true);
        } catch (error) {
            setError('Ошибка создания личного кабинета пользователя');
        }
    };

    const onClickRegisterButton = () => {
        $isRegistrationModalOpen.set(false);
        $isLoginModalOpen.set(true);
    };

    return (
        <StyledModal opened={opened} onClose={handleClose} withBlur>
            <Content>
                <StyledHeader>Регистрация</StyledHeader>
                <Credentials>
                    <StyledTextField placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <StyledTextField placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
                    <StyledTextField
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <StyledTextFieldPassword
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledTextFieldPassword
                        placeholder="Повторите пароль"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    {error && <Error>{error}</Error>}
                </Credentials>
                <StyledCheckbox
                    label={
                        <>
                            Соглашаюсь с{' '}
                            <Rules to={ROUTES.rules} target="_blank">
                                правилами сервиса
                            </Rules>
                        </>
                    }
                    checked={isChecked}
                    onClick={() => setIsChecked(!isChecked)}
                />
                <ButtonBlock>
                    <StyledButton onClick={handleSubmit} disabled={!isChecked}>
                        Зарегистрироваться
                    </StyledButton>
                    <Description onClick={onClickRegisterButton}>Уже есть аккаунт</Description>
                </ButtonBlock>
            </Content>
        </StyledModal>
    );
};
