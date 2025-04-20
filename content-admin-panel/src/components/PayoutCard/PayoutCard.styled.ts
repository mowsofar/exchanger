import { accent, success, surfaceSolid03, whitePrimary } from "@salutejs/plasma-tokens";
import { Badge, Button } from "@salutejs/plasma-web";
import styled, { css, CSSProperties } from "styled-components";
import { TextFieldGrey } from "../TextField/TextField";
import { Button as ButtonBase } from '../Button/Button.styled';

export const StyledRoot = styled.div`
    position: relative;
    background-color: ${whitePrimary};
    border-radius: 20px;
    column-gap: 10px;
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
    margin: 10px 0;
    box-shadow: 0px 0px 11px 4px rgba(0, 0, 0, 0.1);
    font-size: 14px;
`;

export const Column = styled.div`
    flex: 1;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 17px;

    &:not(:last-child) {
        border-right: 1px solid ${surfaceSolid03};
    }
`;

export const InfoBlockColumn = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

export const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

export const StyledBadge = styled(Badge)`
    border-radius: 15px;
    height: 30px;
    font-weight: 600;
    font-size: 14px !important;
    padding: 0px 15px;
`;

export const InfoText = styled.div`
    display: flex;
    column-gap: 10px;
    font-weight: 600;
    font-size: 14px;

    & div:nth-child(1) {
        color: ${accent};
    }
`;

export const StatusLabel = styled.div<{ backgroundColor: CSSProperties['backgroundColor'] }>`
    position: absolute;
    top: -28px;
    right: 50px;
    padding: 6px 25px;
    border-radius: 10px 10px 0 0;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    background-color: ${success};
    cursor: pointer;

    ${({ backgroundColor }) =>
        backgroundColor &&
        css`
            background-color: ${backgroundColor};
        `}

    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

export const Row = styled.div`
    display: flex;
    column-gap: 5px;
    align-items: center;

    & div {
        font-weight: 500;
    }
`;

export const StyledTextField = styled(TextFieldGrey)`
    width: 320px;
    font-size: 15px;

    > div:first-child > div {
        font-size: 13px !important;
    }

    > div:last-child {
        height: 60px;
        border-radius: 13px;
    }
`;

export const SubmitButton = styled(Button)`
    height: 33px;
    padding: 5px 5px;

    span {
        min-width: 20px;
        width: 30px;
    }
`;

export const ExchangeAmount = styled.div`
    color: ${accent};
    font-weight: 600;
    font-size: 13px;

    & span {
        color: black;
    }
`;

export const StyledBill = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    & a {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const StyledButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: auto;
    align-items: center;
`;

export const StyledSaveButton = styled(ButtonBase)`
    height: 25px !important;
    padding: 14px 10px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
`;
