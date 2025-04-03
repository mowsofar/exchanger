import styled from "styled-components";
import { TextFieldPassword } from "../../components/TextFieldPassword/TextFieldPassword";
import { Button } from "../../components/Button/Button";

export const StyledLayout = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1.5rem;
    width: 45rem;
    background-color: var(--backgroundSecondary);
    border-radius: 3.5rem;
    color: white;
    padding: 3.8rem 2.5rem;

    @media (max-width: 600px) {
        width: 35rem;
        padding: 3rem;
        border-radius: 4rem;
    }

    @media (max-width: 450px) {
        width: 30rem;
        padding: 3rem 2rem;
        border-radius: 4rem;
    }
`;

export const Header = styled.div`
    font-size: 2.8rem;
    font-weight: 600;
    padding-bottom: 2rem;

    @media (max-width: 450px) {
        font-size: 2.4rem;
    }
`;

export const TextField = styled(TextFieldPassword)`
    width: 100%;
    font-family: Onest !important;
    font-weight: 600;

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

export const StyledButton = styled(Button)`
    height: 4.5rem;
    font-size: 2rem;
    margin-top: 4rem;


    @media (max-width: 450px) {
       font-size: 1.6rem;
    }
`;

export const Description = styled.div`
    color: var(--accent);
    font-size: 1.7rem;
    font-weight: 600;
`;