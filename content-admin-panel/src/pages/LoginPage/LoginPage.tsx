import {
    StyledButton,
    StyledError,
    StyledForm,
    StyledRoot,
    StyledTextFieldLogin,
    StyledTextFieldPassword,
} from './LoginPage.styled';
import React from 'react';
import { passLogin } from '../../stores/login/login.actions';
import { Headline3 } from '@salutejs/plasma-web';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [error, setError] = React.useState<any>(null);
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            await passLogin(email, password, otp);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <head>
                <title>Вход в аккаунт</title>
            </head>

            <StyledRoot>
                <StyledForm>
                    <Headline3>Вход в аккаунт</Headline3>
                    <StyledTextFieldLogin
                        label="E-mail"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    />
                    <StyledTextFieldPassword
                        label="Пароль"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                    />
                    <StyledTextFieldLogin
                        label="Одноразовый otp-код"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setOtp(event.target.value)}
                    />
                    {error && <StyledError>Неверный логин или пароль</StyledError>}
                    <StyledButton stretch text="Войти" onClick={onSubmit} disabled={!email || !password || !otp} />
                </StyledForm>
            </StyledRoot>
        </>
    );
};
