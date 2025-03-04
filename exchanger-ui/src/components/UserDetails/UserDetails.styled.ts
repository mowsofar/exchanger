import { TextField } from '@salutejs/plasma-web';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Button as PlasmaButton} from '@salutejs/plasma-web';
import { critical } from '@salutejs/plasma-tokens';

export const StyledLayout = styled.div`
    height: 40rem;
    width: 50rem;
    border-radius: 23px;
    background-color: var(--backgroundSecondary);
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 70px;
    padding: 35px;
    flex-grow: 1;
`;

export const StyledUserForm= styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;

export const StyledHeader = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: var(--backgroundTertiary);
    text-transform: uppercase;
`;

export const TwoBlocks = styled.div`
    display: flex;
    column-gap: 40px;
`;

export const StyledTextField = styled(TextField)`
    width: 330px;
    font-family: Onest !important;
    font-weight: 600;
    border-radius: 8px;

    & > div:first-child {
        height: 60px !important;
        background: var(--backgroundTertiary) !important;
    }

    & > div:last-child {
        color: var(--accent);
    }

    > div {
        box-shadow: none !important;
    }

    & input {
        color: white !important;
        font-weight: 600;
    }
`;

export const StyledButton = styled(Button)`
    margin-top: auto;
`;

export const Row = styled.div`
    display: flex;
    column-gap: 30px;
    align-items: center;
`;

export const StyledButtonBack = styled(PlasmaButton)`
    padding: 0;
`;