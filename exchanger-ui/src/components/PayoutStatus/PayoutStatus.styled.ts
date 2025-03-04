import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Button as PlasmaButton } from '@salutejs/plasma-web';

export const StyledLayout = styled.div`
    height: 40rem;
    width: 50rem;
    border-radius: 23px;
    background-color: var(--backgroundSecondary);
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    padding: 35px;
    flex-grow: 1;
`;

export const StyledHeader = styled.div`
    font-size: 1.7rem;
    font-weight: 600;
    color: white;
    text-align: center;

    & span {
        color: var(--accent);
    }
`;

export const StyledIconStatus = styled.img`
    align-self: center;
    margin-top: 70px;
    width: 150px;
`;

export const StyledSpinner = styled.div`
    margin-top: 70px;
    align-self: center;
`;

export const StyledButton = styled(Button)`
    margin-top: auto;
`;

export const Row = styled.div`
    display: flex;
    column-gap: 30px;
    align-items: center;
`;

export const StyledButtonBack = styled(PlasmaButton)`
    padding: 0;
`;