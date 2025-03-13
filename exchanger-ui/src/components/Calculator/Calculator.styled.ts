import styled from "styled-components";
import { Select } from "../Select/Select";
import { IconSwapVert } from "@salutejs/plasma-icons";

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    position: relative;
`;

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.4rem;
    background-color: var(--backgroundPrimary);
    height: 80px;
    border-radius: 20px;
    padding: 1.5rem 2rem 2rem 2rem;
    overflow: hidden;
`;

export const StyledCardName = styled.div`
    font-weight: 600;
    font-size: 1.8rem;
    color: white;
    color: var(--accent);
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    position: relative;
`;

export const StyledSelect = styled(Select)`
    position: absolute;
    right: 1rem;
    bottom: 1.2rem;
`;

export const StyledInput = styled.input`
    background-color: transparent;
    border: none;
    border-radius: inherit;
    color: white;
    font-size: 3.6rem;
    font-weight: 500;
    width: 80%;

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

    &:hover {
        background-color: var(--lightAccent);
    }
`;

export const StyledError = styled.div`
    color: white;
    font-weight: 600;
    font-size: 1.9rem;
    text-align: center;
`;

export const StyledIcon = styled(IconSwapVert)`
    width: 5rem;
    height: 5rem;
`;