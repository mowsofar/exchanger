import { StyledButton, StyledForm, StyledRoot, StyledTextFieldLogin, StyledTextFieldPassword } from './Login.styled';
import React from 'react';
import { passLogin } from '../../stores/login/login.actions';

export const Login: React.FC = () => {
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
        <StyledRoot>
            <StyledForm>
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
                <StyledButton text="Войти" onClick={onSubmit} />
            </StyledForm>
        </StyledRoot>
    );
};
