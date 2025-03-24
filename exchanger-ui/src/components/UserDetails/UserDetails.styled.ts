import { Checkbox, TextField } from '@salutejs/plasma-web';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Button as PlasmaButton} from '@salutejs/plasma-web';
import { Link } from 'react-router-dom';

export const StyledLayout = styled.div`
    min-height: 70rem;
    width: 90rem;
    border-radius: 3rem;
    background-color: var(--backgroundSecondary);
    padding: 2rem;
    display: flex;
    flex-direction: column;
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 7rem;
    padding: 2rem;
    flex-grow: 1;
`;

export const StyledUserForm= styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.7rem;
`;

export const StyledHeader = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--backgroundTertiary);
    text-transform: uppercase;
`;

export const TwoBlocks = styled.div`
    display: flex;
    column-gap: 9rem;
`;

export const StyledTextField = styled(TextField)`
    width: 35rem;
    font-family: Onest !important;
    font-weight: 600;
    font-size: 1.8rem;

    & > div:first-child {
        padding: 1.8rem;
        height: 6.5rem !important;
        border-radius: 1.5rem;
        background: var(--backgroundTertiary) !important;
    }

    & > div:last-child {
        color: var(--accent);
        font-size: 1.8rem !important;
    }

    > div {
        box-shadow: none !important;
    }

    & input {
        color: white !important;
        font-weight: 600;
    }
`;

export const ButtonBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
    margin-top: auto;
`;

export const StyledButton = styled(Button)`
    height: 5rem;
    font-size: 2rem;
`;

export const Row = styled.div`
    display: flex;
    column-gap: 4rem;
    align-items: center;
`;

export const StyledButtonBack = styled(PlasmaButton)`
    padding: 0;
`;

export const StyledCheckbox = styled(Checkbox)`
    font-family: Onest;
    display: flex;
    font-size: 1.6rem;
    align-items: center !important;
    color: white;

    & label > div:first-child {
        background-color: var(--accent) !important;
        width: 1.8rem;
        height: 1.8rem;
    }

    & svg > path {
        fill: black !important;
    }
`;

export const Rules = styled(Link)`
    color: var(--accent);
`;
