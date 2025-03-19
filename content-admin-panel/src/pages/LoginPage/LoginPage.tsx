import {
    StyledButton,
    StyledForm,
    StyledRoot,
    StyledTextFieldLogin,
    StyledTextFieldPassword,
} from './LoginPage.styled';
import React from 'react';
import { passLogin } from '../../stores/login/login.actions';
import { Headline3 } from '@salutejs/plasma-web';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [error, setError] = React.useState<any>(null);

    const onSubmit = () => {
        try {
            passLogin(email, password, otp);
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
                    <StyledButton stretch text="Войти" onClick={onSubmit} disabled={!email || !password || !otp} />
                </StyledForm>
            </StyledRoot>
        </>
    );
};
