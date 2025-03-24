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
    row-gap: 6rem;
    padding: 2rem;
    flex-grow: 1;
`;

export const StyledHeader = styled.div`
    font-size: 2.8rem;
    font-weight: 600;
    color: white;
    text-align: center;

    & span {
        color: var(--accent);
    }
`;

export const StyledIconStatus = styled.img`
    align-self: center;
    margin-top: 3rem;
    width: 15rem;
`;

export const StyledSpinner = styled.div`
    margin-top: 10rem;
    align-self: center;
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
`;

export const StyledButtonBack = styled(PlasmaButton)`
    padding: 0;
    visibility: hidden;
`;

export const StyledDescription = styled.div`
    font-size: 1.8rem;
    font-weight: 600;
    color: white;
    opacity: 0.6;
    padding: 3rem;
    margin-top: auto;
    text-align: center;
`;