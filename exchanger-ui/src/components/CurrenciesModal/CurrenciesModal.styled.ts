import styled, { css } from 'styled-components';
import { Button } from '../Button/Button';
import { Modal } from '@salutejs/plasma-web';

export const StyledModal = styled(Modal)`
    background-color: #18181a;
    width: 45rem;
    display: flex;
    flex-direction: column;
    border-radius: 4rem;
    padding: 2rem 1rem;
    row-gap: 4rem;
    border: 3px solid var(--accent);

    & button > span > div {
        width: 5rem;
        height: 5rem;
        color: white;
    }

    @media (max-width: 1024px) {
        width: 30rem;
        padding: 1rem .5rem;
    }

    @media only screen and (max-width: 450px) {
        border-radius: 3rem;
    }
`;

export const StyledHeader = styled.div`
    color: white;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: Onest;

    @media only screen and (max-width: 450px) {
        font-size: 2.2rem;
    }
`;

export const StyledButton = styled(Button)`
    margin-top: 3rem;
`;

export const CurrenciesList = styled.div`
    overflow: auto;
    height: 35rem;
    font-size: 1.8rem;
    padding: 0;
    margin-top: 2rem;
    background-color: #222224;
    border-radius: 1.8rem;

    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 0.5rem;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 1rem;
        background-color: var(--accent);
    }

    @media (max-width: 1024px) {
        height: 25rem;
        font-size: 1.5rem;
    }

    @media (max-width: 450px) {
        height: 30rem;
    }
`;

export const StyledRow = styled.div<{ isSelected: boolean }>`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    padding: 1rem;
    color: white;
    border-radius: 1.2rem;
    font-weight: 600;
    font-family: Onest !important;
    padding: 1rem 1.5rem;

    ${({ isSelected }) =>
        isSelected &&
        css`
            background-color: rgba(85, 87, 86, 0.4);
        `};

    &:hover {
        background-color: rgba(85, 87, 86, 0.4);
    }
`;

export const StyledCurrencyName = styled.div`
    display: flex;
    column-gap: 1.2rem;
    align-items: center;

    & img {
        width: 3rem;
    }
`;
