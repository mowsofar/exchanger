import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Button as PlasmaButton, Upload } from '@salutejs/plasma-web';

export const StyledLayout = styled.div`
    min-height: 65rem;
    width: 90rem;
    border-radius: 2.8rem;
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
        min-height: fit-content;
        border-radius: 2.3rem;
    }
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
    padding: 2rem;
    flex-grow: 1;

    @media (max-width: 450px) {
        padding: 1.5rem;
    }
`;

export const SpinnerWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

export const StyledHeader = styled.div`
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--accent);

    @media (max-width: 450px) {
        font-size: 1.8rem;
    }
`;

export const StyledText = styled.div`
    color: var(--accentText);
    font-size: 2.3rem;
    font-weight: 600;

    @media (max-width: 450px) {
        font-size: 1.8rem;
    }
`;

export const StyledButton = styled(Button)`
    margin-top: auto;
    height: 5rem;
    font-size: 2rem;

    @media (max-width: 450px) {
        font-size: 1.6rem;
    }
`;

export const RequisiesButton = styled(Button)`
    width: 25rem;
    border-radius: 1.2rem;
    font-size: 1.7rem;
    height: 4rem;

    @media (max-width: 450px) {
        font-size: 1.6rem;
        width: 20rem;
    }
`;

export const StyledDescription = styled.div`
    color: var(--backgroundTertiary);
    font-size: 1.6rem;

    @media (max-width: 450px) {
        font-size: 1.3rem;
    }
`;

export const StyledBlackDescription = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--accentText);

    @media (max-width: 450px) {
        font-size: 1.4rem;
    }
`;

export const StyledAmount = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & div:first-child {
        color: var(--backgroundTertiary);
        font-weight: 600;
        font-size: 1.8rem;
    }

    & div:last-child {
        color: var(--accentText);
        font-size: 2.7rem;
        font-weight: 600;
    }

    @media (max-width: 450px) {
        & div:first-child {
            font-size: 1.5rem;
        }

        & div:last-child {
            font-size: 2rem;
        }
    }
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

export const Requisites = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & div:nth-child(1) {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--accentText);
    }

    @media (max-width: 450px) {
        & div:nth-child(1) {
            font-size: 1.5rem;
        }
    }
`;

export const Badge = styled.div`
    background-color: var(--backgroundTertiary);
    border-radius: 2rem;
    width: fit-content;
    padding: 10px 20px;
    display: flex;
    column-gap: 15px;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 450px) {
        border-radius: 2rem;
    }
`;

export const ExchangeRequisites = styled.div`
    white-space: pre-line;
    font-size: 1.8rem !important;
`;

export const ButtonCopy = styled(PlasmaButton)`
    width: 30px !important;
    height: 20px;
`;

export const StyledSpinner = styled.div`
    width: 3rem;
`;

export const UploadBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & div:nth-child(1) {
        font-size: 1.7rem;
        font-weight: 500;
        color: var(--accentText);
    }

    @media (max-width: 450px) {
        & div:nth-child(1) {
            font-size: 1.5rem;
        }
    }
`;

export const ClipPreview = styled.div`
    width: 100%;
    display: flex;
    column-gap: 1rem;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const UploadRow = styled(ClipPreview)`
    @media (max-width: 450px) {
        flex-direction: column;
        row-gap: 1rem;
    }
`;

export const Preview = styled.div`
    font-size: 1.6rem;
    width: 100%;
    color: var(--accent);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 450px) {
        font-size: 1.4rem;
    }
`;

export const StyledUpload = styled(Upload)`
    max-width: 40rem;
    min-width: 20rem;

    & button {
        font-family: Onest !important;
        color: var(--accentText) !important;
        background-color: var(--backgroundTertiary) !important;
        font-size: 1.8rem !important;
    }

    @media (max-width: 450px) {
        width: 100%;
    }
`;
