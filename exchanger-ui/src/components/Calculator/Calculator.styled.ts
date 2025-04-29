import styled from "styled-components";
import { Select } from "../Select/Select";
import { IconSwapVert } from "@salutejs/plasma-icons";

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    position: relative;
`;

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.4rem;
    background-color: var(--backgroundPrimary);
    height: 8rem;
    border-radius: 2rem;
    padding: 1.5rem 2rem 2rem 2rem;
    overflow: hidden;
    position: relative;

    @media only screen and (max-width: 820px) {
        row-gap: 1rem;
        padding: 1rem;
        justify-content: center;
    }
`;

export const StyledCardName = styled.div`
    font-weight: 600;
    font-size: 1.8rem;
    color: white;
    color: var(--accent);

    @media only screen and (max-width: 820px) {
        font-size: 1.4rem;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 2rem;
`;

export const StyledSelect = styled(Select)`
    position: absolute;
    right: 1rem;
    bottom: 3rem;

    @media only screen and (max-width: 820px) {
        bottom: 2.7rem;
    }
`;

export const StyledInput = styled.input`
    background-color: transparent;
    border: none;
    border-radius: inherit;
    color: white;
    font-size: 3.6rem;
    font-weight: 500;
    width: 60%;
    height: 4.4rem;
    overflow-x: scroll;

    &:hover, &:active, &:focus {
        outline: none;
        background-color: transparent;
        border: none;
        border-radius: inherit;
        color: white
    }

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0; 
    }

    @media only screen and (max-width: 820px) {
       font-size: 2.8rem;
       height: 3.6rem;
       width: 75%;
    }

    @media only screen and (max-width: 450px) {
       font-size: 2.5rem;
       height: 3.2rem;
       width: 70%;
    }
`;

export const SwapButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    border-radius: 50px;
    background-color: var(--accent);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 1;

    &:hover {
        background-color: var(--lightAccent);
    }
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
        height: 2rem !important;
        width: 2rem !important;
    }
`;

export const StyledError = styled.div`
    color: white;
    font-weight: 600;
    font-size: 1.6rem;
    text-align: center;
`;

export const ExchangeInfo = styled.div`
    color: white;
    font-weight: 600;
    font-size: 1.6rem;
    min-height: 2rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    background-color: var(--backgroundPrimary);
    padding: .7rem 1rem;
    border-radius: 1rem;

    @media only screen and (max-width: 450px) {
       font-size: 1.4rem;
       min-height: 1.7rem;
    }
`;

export const StyledIcon = styled(IconSwapVert)`
    width: 5rem;
    height: 5rem;
`;

export const Skeleton = styled.div`
    background-color: #171717;
    border-radius: 1.5rem;
    height: 4.4rem;
    width: 20rem;

    @media only screen and (max-width: 820px) {
        height: 3.6rem;
        width: 15rem;
        border-radius: 1.2rem;
    }

    @media only screen and (max-width: 450px) {
        height: 3.2rem;
        width: 15rem;
    }
`;