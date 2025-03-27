import styled from "styled-components";
import { Button } from "../Button/Button";

export const StyledModal = styled.div`
    background-color: var(--backgroundSecondary);
    height: 530px;
    width: 750px;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    border-radius: 3rem;
    padding: 3rem 2rem;
    margin-bottom: 10rem;

    @media (max-width: 1300px) {
        width: 85vw;
        font-size: 3rem;
    }

    @media (max-width: 820px) {
        height: fit-content;
        font-size: 2rem;
        padding: 2rem 1rem;
        width: 90vw;
    }
`;

export const StyledHeader = styled.div`
    color: white;
    font-size: 3rem;
    font-weight: 600;
    text-align: center;

    @media (max-width: 1300px) {
        font-size: 2rem;
    }
`;

export const StyledButton = styled(Button)`
    margin-top: auto;
    height: 5rem;
    font-size: 2rem;

    @media only screen and (max-width: 820px) {
        font-size: 1.5rem;
    }
`;