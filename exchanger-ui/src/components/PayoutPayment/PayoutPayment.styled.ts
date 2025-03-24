import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Button as PlasmaButton } from '@salutejs/plasma-web';

export const StyledLayout = styled.div`
    height: 70rem;
    width: 90rem;
    border-radius: 3rem;
    background-color: var(--backgroundSecondary);
    padding: 2rem;
    display: flex;
    flex-direction: column;
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4rem;
    padding: 2rem;
    flex-grow: 1;
`;

export const StyledHeader = styled.div`
    font-size: 2.6rem;
    font-weight: 600;
    color: var(--accent);
`;

export const StyledText = styled.div`
    color: white;
    font-size: 2.6rem;
    font-weight: 600;
`;

export const StyledButton = styled(Button)`
    margin-top: auto;
    height: 5rem;
    font-size: 2rem;
`;

export const StyledDescription = styled.div`
    color: var(--backgroundTertiary);
    font-size: 1.8rem;
`;

export const StyledAmount = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & div:first-child {
        color: var(--backgroundTertiary);
        font-weight: 600;
        font-size: 2rem;
    }

    & div:last-child {
        color: white;
        font-size: 3rem;
        font-weight: 600;
    }
`;

export const Row = styled.div`
    display: flex;
    column-gap: 4rem;
    align-items: center;
`;

export const StyledButtonBack = styled(PlasmaButton)`
    padding: 0;
    visibility: hidden;
`;

export const Requisites = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    & div:nth-child(1) {
        font-size: 2rem;
        font-weight: 600;
        color: white;
    }
`;

export const Badge = styled.div`
    background-color: var(--backgroundTertiary);
    border-radius: 3rem;
    width: fit-content;
    padding: 10px 20px;
    display: flex;
    column-gap: 15px;
    justify-content: space-between;
    align-items: center;
`;

export const ButtonCopy = styled(PlasmaButton)`
    width: 30px !important;
    height: 20px;
`;

export const StyledSpinner = styled.div`
    width: 3rem;
`;