import { Checkbox, TextField } from '@salutejs/plasma-web';
import styled, { css } from 'styled-components';
import { Button } from '../Button/Button';
import { Button as PlasmaButton} from '@salutejs/plasma-web';
import { Link } from 'react-router-dom';

export const StyledLayout = styled.div`
    min-height: 65rem;
    width: 85rem;
    border-radius: 3rem;
    background-color: var(--backgroundSecondary);
    padding: 2rem;
    display: flex;
    flex-direction: column;

    @media (max-width: 1000px) {
       width: 80%;
    }

    @media (max-width: 450px) {
       padding: 1rem;
       min-height: fit-content;
       border-radius: 2.3rem;
    }
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 7rem;
    padding: 2rem;
    flex-grow: 1;

    @media (max-width: 450px) {
       row-gap: 4rem;
       padding: 1.5rem;
    }
`;

export const StyledUserForm= styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.7rem;

    @media (max-width: 450px) {
       row-gap: 1rem;
    }
`;

export const StyledHeader = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--backgroundTertiary);
    text-transform: uppercase;

    @media (max-width: 450px) {
       font-size: 1.3rem;
    }
`;

export const TwoBlocks = styled.div`
    display: flex;
    column-gap: 9rem;

    @media (max-width: 1000px) {
        flex-direction: column;
        row-gap: 3rem;
    }
`;

export const StyledTextField = styled(TextField)<{ error?: Boolean }>`
    width: 35rem;
    font-family: Onest !important;
    font-weight: 600;
    font-size: 1.8rem;

    ${({ error }) =>
            error &&
            css`
                > div:first-child {
                    box-shadow: 0 0 0 1.5px #B00000 !important;
    }
            `}

    & > div:first-child {
        padding: 1.8rem;
        height: 6.5rem !important;
        border-radius: 1.5rem;
        background: var(--backgroundTertiary) !important;
    }

    & > div:last-child {
        color: var(--accent);
        font-size: 1.5rem !important;
    }

    > div {
        box-shadow: none !important;
    }

    > div > div > div {
        font-size: 1.8rem !important;
    }

    & input {
        color: white !important;
        font-weight: 600 !important;
    }

    @media (max-width: 1000px) {
        width: 30rem;
    }

    @media (max-width: 450px) {
       width: 100%;

       & > div:first-child {
        padding: 1.8rem;
        height: 5rem !important;
        border-radius: 1.3rem;
        background: var(--backgroundTertiary) !important;
    }

        > div > div > div {
        font-size: 1.5rem !important;
        padding-top: .2rem;

    }

    & > div:last-child {
        font-size: 1.3rem !important;
    }
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

    @media (max-width: 450px) {
       font-size: 1.6rem;
    }
`;

export const Row = styled.div`
    display: flex;
    column-gap: 4rem;
    align-items: center;

    @media (max-width: 1000px) {
       column-gap: 1.8rem;
    }
`;

export const StyledButtonBack = styled(PlasmaButton)`
    padding: 0;
`;

export const StyledCheckbox = styled(Checkbox)`
    font-family: Onest;
    font-size: 1.6rem;
    align-items: center !important;

    & label > div:first-child > div {
        background-color: var(--accent) !important;
        width: 1.8rem;
        height: 1.8rem;
    }

    & span {
        color: white;
    }

    & svg > path {
        fill: black !important;
    }

    @media (max-width: 450px) {
        font-size: 1.3rem;
    }
`;

export const Rules = styled(Link)`
    color: var(--accent);
`;
