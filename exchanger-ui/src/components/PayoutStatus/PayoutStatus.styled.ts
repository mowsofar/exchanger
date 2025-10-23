import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Button as PlasmaButton, Spinner } from '@salutejs/plasma-web';

export const StyledLayout = styled.div`
    min-height: 65rem;
    width: 90rem;
    border-radius: 3rem;
    background-color: var(--backgroundSecondary);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    -webkit-box-shadow: 4px 4px 16px 7px rgba(34, 60, 80, 0.1);
    -moz-box-shadow: 4px 4px 16px 7px rgba(34, 60, 80, 0.1);
    box-shadow: 4px 4px 16px 7px rgba(34, 60, 80, 0.1);

    @media (max-width: 1000px) {
        width: 80%;
    }

    @media (max-width: 450px) {
        padding: 1rem;
        height: fit-content;
        border-radius: 2.3rem;
    }
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4rem;
    padding: 2rem;
    flex-grow: 1;

    @media (max-width: 450px) {
        row-gap: 2rem;
        padding: 1.5rem;
    }
`;

export const StyledHeader = styled.div`
    font-size: 2.7rem;
    font-weight: 600;
    color: var(--accentText);
    text-align: center;

    & span {
        color: var(--accent);
    }

    @media (max-width: 450px) {
        font-size: 2rem;
    }
`;

export const StyledIconStatus = styled.img`
    align-self: center;
    margin-top: 3rem;
    width: 15rem;
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    @media (max-width: 450px) {
        margin-top: 5rem;
    }
`;

export const StyledSpinner = styled(Spinner)`
    color: var(--accentText);
`;

export const StyledButton = styled(Button)`
    margin-top: auto;
    height: 5rem;
    font-size: 2rem;
`;

export const Row = styled.div`
    display: flex;
    column-gap: 4rem;
    align-items: center;

    @media (max-width: 1000px) {
        column-gap: 0rem;
    }
`;

export const StyledButtonBack = styled(PlasmaButton)`
    padding: 0;
    visibility: hidden;

    @media (max-width: 1000px) {
        display: none;
    }
`;

export const StyledDescription = styled.div`
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--accentText);
    opacity: 0.6;
    padding: 3rem;
    margin-top: auto;
    text-align: center;

    @media (max-width: 450px) {
        font-size: 1.5rem;
    }
`;
