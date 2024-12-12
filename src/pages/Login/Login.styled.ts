import styled from 'styled-components';
import { Button, Footnote1 } from '@salutejs/plasma-web';
import { secondary } from '@salutejs/plasma-tokens-web';
import { TextField } from '../../components/TextField';
import { TextFieldPassword } from '../../components/TextFieldPassword';

export const StyledRoot = styled.div`
    display: flex;
    background-image: linear-gradient(120deg, #c4c4c4,  #e8e8e8,  #c7c7c7);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledDescription = styled(Footnote1)`
    color: ${secondary};
    text-align: center;
    width: 500px;
    margin-top: 24px;
`;

export const StyledTextFieldLogin = styled(TextField)`
    margin-top: 24px;
    width: 345px;
`;

export const StyledTextFieldPassword = styled(TextFieldPassword)`
    margin-top: 24px;
    width: 345px;
`;

export const StyledButton = styled(Button)`
    margin-top: 20px;
`;

export const StyledControls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
`;