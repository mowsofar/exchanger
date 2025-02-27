import styled from "styled-components";
import { Button } from "../Button/Button";
import { Modal } from "@salutejs/plasma-web";

export const StyledModal = styled(Modal)`
    background-color: #18181a;
    width: 450px;
    display: flex;
    flex-direction: column;
    border-radius: 40px;
    padding-top: 20px;
    row-gap: 40px;
    border: 3px solid var(--accent);
`;

export const StyledHeader = styled.div`
    color: white;
    font-size: 1.6rem;
    font-weight: 600;
    font-family: Onest;
`;

export const StyledButton = styled(Button)`
    margin-top: 30px;
`;

export const CurrenciesList = styled.div`
    overflow: auto;
    height: 18rem;
    font-size: 1.1rem;
    padding: 10px 10px;
    margin-top: 20px;
    background-color: #222224;
    border-radius: 15px;
`;

export const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    padding: .6rem;
    color: white;
    border-radius: 12px;
    font-weight: 600;
    font-family: Onest !important;

    &:hover {
        background-color: var(--backgroundTertiary);
    }
`;

export const StyledCurrencyName = styled.div`
    display: flex;
    column-gap: .8rem;
    align-items: center;

    & img {
        width: 30px;
    }
`;