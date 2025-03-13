import styled from 'styled-components';
import { Footnote1 } from '@salutejs/plasma-web';
import { secondary } from '@salutejs/plasma-tokens-web';
import { TextField } from '../../components/TextField';
import { TextFieldPassword } from '../../components/TextFieldPassword';
import { whitePrimary } from '@salutejs/plasma-tokens';
import { Button } from '../../components/Button/Button.styled';

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
    row-gap: 15px;
    align-items: center;
    height: fit-content;
    width: 22vw;
    min-width: 300px;
    border-radius: 30px;
    padding: 40px;
    background-color: ${whitePrimary};
    -webkit-box-shadow: 2px 2px 29px 0px rgba(34, 60, 80, 0.32);
    -moz-box-shadow: 2px 2px 29px 0px rgba(34, 60, 80, 0.32);
    box-shadow: 2px 2px 29px 0px rgba(34, 60, 80, 0.32);
`;

export const StyledDescription = styled(Footnote1)`
    color: ${secondary};
    text-align: center;
    width: 500px;
    margin-top: 24px;
`;

export const StyledTextFieldLogin = styled(TextField)`
    margin-top: 24px;
    width: 100%;
`;

export const StyledTextFieldPassword = styled(TextFieldPassword)`
    margin-top: 24px;
    width: 100%;
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