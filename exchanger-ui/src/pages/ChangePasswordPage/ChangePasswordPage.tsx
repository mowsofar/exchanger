import React from 'react';
import { Form, Header, StyledButton, Description, StyledLayout, TextField } from './ChangePasswordPage.styled';
import { changePassword } from '../../api/handlers';

export const ChangePasswordPage: React.FC = () => {
    const [description, setDescription] = React.useState('');
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmationPassword, setConfirmationPassword] = React.useState('');

    const onSubmit = async () => {
        try {
            await changePassword(currentPassword, newPassword, confirmationPassword);
            setDescription('Пароль успешно изменён');
            setNewPassword('');
            setCurrentPassword('');
            setConfirmationPassword('');
        } catch {
            setDescription('Пароли не совпадают');
        }
    };
    return (
        <>
            <head>
                <title>Изменение пароля</title>
            </head>

            <StyledLayout>
                <Form>
                    <Header>Изменение пароля</Header>

                    <TextField
                        placeholder="Текущий пароль"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        placeholder="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        placeholder="Повторите пароль"
                        value={confirmationPassword}
                        onChange={(e) => setConfirmationPassword(e.target.value)}
                    />

                    <Description>{description}</Description>

                    <StyledButton onClick={onSubmit}>Сохранить</StyledButton>
                </Form>
            </StyledLayout>
        </>
    );
};
