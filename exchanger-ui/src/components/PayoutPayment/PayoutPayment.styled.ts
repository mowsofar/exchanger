import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Button as PlasmaButton, Upload } from '@salutejs/plasma-web';

export const StyledLayout = styled.div`
    min-height: 70rem;
    width: 90rem;
    border-radius: 2.8rem;
    background-color: var(--backgroundSecondary);
    padding: 2rem;
    display: flex;
    flex-direction: column;
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
    padding: 2rem;
    flex-grow: 1;
`;

export const StyledHeader = styled.div`
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--accent);
`;

export const StyledText = styled.div`
    color: white;
    font-size: 2.3rem;
    font-weight: 600;
`;

export const StyledButton = styled(Button)`
    margin-top: auto;
    height: 5rem;
    font-size: 2rem;
`;

export const StyledDescription = styled.div`
    color: var(--backgroundTertiary);
    font-size: 1.6rem;
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
        font-size: 2.7rem;
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

export const UploadBlock = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & div:nth-child(1) {
        font-size: 1.7rem;
        font-weight: 600;
        color: white;
    }
`;

export const UploadRow = styled.div`
    display: flex;
    column-gap: 1rem;
    align-items: center;
`;

export const Preview = styled.div`
    font-size: 1.6rem;
    max-width: 40rem;
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const StyledUpload = styled(Upload)`
    width: 40rem;

    & button {
        font-family: Onest !important;
        color: white !important;
        background-color: var(--backgroundTertiary) !important;
        font-size: 1.8rem !important;
    }
`;