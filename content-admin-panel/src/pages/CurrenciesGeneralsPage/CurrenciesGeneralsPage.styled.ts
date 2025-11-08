import styled from 'styled-components';
import { Button } from '../../components/Button/Button.styled';
import { Select } from '../../components/Select/Select';
import { TextField } from '@salutejs/plasma-web';

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    padding: 30px;
    height: 100vh;
`;

export const StyledSelect = styled(Select)`
    width: 350px;

    & label {
        font-weight: 550 !important;
    }
`;

export const StyledTextField = styled(TextField)`
    width: 350px;

    & label {
        font-weight: 550 !important;
    }
`;

export const StyledSaveButton = styled(Button)`
    width: 160px !important;
    height: 40px;
`;

export const StyledLine = styled.hr`
    width: 700px;
    background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.2), transparent);
    border: 0;
    height: 1px;
    margin: 10px 0;
    box-sizing: content-box;
    display: block;
`;

export const StyledBlock = styled.div`
    display: flex;
    column-gap: 20px;
`;
