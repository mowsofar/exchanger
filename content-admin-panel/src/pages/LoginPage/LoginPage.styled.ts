import styled from 'styled-components';
import { Footnote1, TextField } from '@salutejs/plasma-web';
import { secondary } from '@salutejs/plasma-tokens-web';
import { TextFieldPassword } from '../../components/TextFieldPassword';
import { Button } from '../../components/Button/Button.styled';

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 18px;
    align-items: center;
    height: fit-content;
    width: 380px;
    border-radius: 30px;
    padding: 40px;
`;

export const StyledDescription = styled(Footnote1)`
    color: ${secondary};
    text-align: center;
    width: 500px;
    margin-top: 24px;
`;

export const StyledTextFieldLogin = styled(TextField)`
    width: 100%;
`;

export const StyledTextFieldPassword = styled(TextFieldPassword)`
    width: 100%;
`;

export const StyledButton = styled(Button)`
    height: 40px;
    margin-top: 15px;
    border-radius: 13px;
`;

export const StyledControls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
`;

export const StyledError = styled.div`
    color: red;
`;

export const Logo = styled.img`
    align-self: center;
    height: 80px;
`;
