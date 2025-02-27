import styled from "styled-components";

export const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    position: relative;
`;

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    background-color: var(--backgroundPrimary);
    height: 80px;
    border-radius: 20px;
    padding: 10px 20px 15px 20px;
`;

export const StyledCardName = styled.div`
    font-weight: 600;
    color: white;
    color: var(--accent);
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
`;

export const StyledInput = styled.input`
    background-color: transparent;
    border: none;
    border-radius: inherit;
    color: white;
    font-size: 2.5rem;
    font-weight: 500;

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
    width: 50px;
    height: 50px;
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
    text-align: center;
`;