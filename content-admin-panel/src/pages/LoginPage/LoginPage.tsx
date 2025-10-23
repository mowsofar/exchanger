import {
    Logo,
    StyledButton,
    StyledError,
    StyledForm,
    StyledRoot,
    StyledTextFieldLogin,
    StyledTextFieldPassword,
} from './LoginPage.styled';
import React from 'react';
import { passLogin } from '../../stores/login/login.actions';
import { getAccount } from '../../api/handlers';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [error, setError] = React.useState<any>(null);
    const navigate = useNavigate();

    const passwordField = React.useRef(null);
    const otpField = React.useRef(null);
    const loginField = React.useRef(null);

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        nextRef: React.RefObject<HTMLInputElement> | null,
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            nextRef?.current?.focus();
        }
    };

    const getAccountInfo = async () => {
        try {
            if (localStorage.getItem('accessToken')) {
                await getAccount();
                navigate(ROUTES.currencyCode);
            }
        } catch (error) {}
    };

    React.useEffect(() => {
        getAccountInfo();
    });

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
                    <Logo src="images/logo-kykyshka2.png" />

                    <StyledTextFieldLogin
                        ref={loginField}
                        label="E-mail"
                        placeholder="Введите E-mail"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, passwordField)}
                    />

                    <StyledTextFieldPassword
                        ref={passwordField}
                        label="Пароль"
                        placeholder="Введите пароль"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, otpField)}
                    />

                    <StyledTextFieldLogin
                        ref={otpField}
                        label="Одноразовый otp-код"
                        placeholder="Введите otp-код"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setOtp(event.target.value)}
                        onKeyDown={(e) => {
                            if (email && password && otp && e.key === 'Enter') {
                                onSubmit();
                            }
                        }}
                    />

                    {error && <StyledError>Неверный логин или пароль</StyledError>}
                    <StyledButton stretch text="Войти в систему" onClick={onSubmit} />
                </StyledForm>
            </StyledRoot>
        </>
    );
};
