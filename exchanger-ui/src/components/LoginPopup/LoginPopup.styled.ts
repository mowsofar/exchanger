import { Modal, TextField } from "@salutejs/plasma-web";
import styled from "styled-components";
import { TextFieldPassword } from "../TextFieldPassword/TextFieldPassword";
import { Button } from "../Button/Button";

export const StyledModal = styled(Modal)`
    background-color: var(--backgroundSecondary);
    width: 45rem;
    border-radius: 4rem;
    padding: 2rem 1rem;
    row-gap: 5rem;
    border: 3px solid var(--accent);

    & button > span > div {
        width: 5rem;
        height: 5rem;
        color: var(--accentText);
    }

    @media (max-width: 576px) {
        width: 100%;
        margin: 2rem;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 3.5rem;
`;

export const Credentials = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const StyledHeader = styled.div`
    color: var(--accentText);
    font-size: 2.5rem;
    font-weight: 600;
    font-family: Onest;
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
    font-family: Onest !important;
    font-weight: 600;

    & > div:first-child {
        padding: 1.8rem;
        height: 6rem !important;
        border-radius: 1.3rem;
        background: var(--backgroundFourth) !important;
    }

    & > div:last-child {
        color: var(--accent);
        font-size: 1.8rem !important;
    }

    > div {
        box-shadow: none !important;
    }

    & input {
        color: var(--accentText) !important;
        font-weight: 600;
    }
`;

export const StyledTextFieldPassword = styled(TextFieldPassword)`
    width: 100%;
    font-family: Onest !important;
    font-weight: 600;

    & > div:first-child {
        padding: 1.8rem;
        height: 6rem !important;
        border-radius: 1.3rem;
        background: var(--backgroundFourth) !important;
    }

    & > div:last-child {
        color: var(--accent);
        font-size: 1.8rem !important;
    }

    > div {
        box-shadow: none !important;
    }

    & input {
        color: var(--accentText) !important;
        font-weight: 600;
    }
`;

export const ButtonBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const StyledButton = styled(Button)`
    width: 100%;
    font-size: 2rem;
    border-radius: 1.2rem;
    height: 4.5rem;
`;

export const Error = styled.div`
    color: var(--accent);
    font-size: 1.5rem;
`;

export const Description = styled.div`
    color: var(--accentText);
    font-size: 1.6rem;
    align-self: center;

    & span {
        color: var(--accent);
        font-weight: 600;
        cursor: pointer;
    }
`;
