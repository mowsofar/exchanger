import { buttonSecondary, surfaceLiquid02, surfaceLiquid03 } from "@salutejs/plasma-tokens";
import { TextField } from "@salutejs/plasma-web";
import styled from "styled-components";

export const StyledImg = styled.img`
    width: 28px;
    display: block;
    margin: 0 auto;
`;

export const VerticalImg = styled(StyledImg)`
    margin-right: 8px;
`;

export const StyledTable = styled.table`
    border-collapse: collapse;
`;

export const MatrixContainer = styled.div`
    overflow-x: auto;
`;

export const EditPanel = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

export const SelectionInfo = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    flex-wrap: wrap;
`;

export const EditControls = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const StyledTextField = styled(TextField)`
    width: 300px;

    > div {
        background-color: ${buttonSecondary} !important;
        box-shadow: none !important;
        height: 40px !important;
    }
`;

export const StyledTh = styled.th`
    padding: 10px;
`;

export const StyledTd = styled.td`
    padding: 1px;
    vertical-align: middle;
`;

export const DiagonalCell = styled.div`
    background-color: ${surfaceLiquid03};
    width: 45px;
    height: 45px;
    border-radius: 12px;
`;

export const EmptyCell = styled.div`
    background-color: ${surfaceLiquid02};
    width: 45px;
    height: 45px;
    border-radius: 12px;
`;

export const ProfitCircle = styled.div<{ isSelected?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 8px;
    border-radius: 12px;
    background-color: ${({ isSelected }) => (isSelected ? '#white' : 'black')};
    color: ${({ isSelected }) => (isSelected ? '#black' : 'white')};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: 2px solid ${({ isSelected }) => (isSelected ? 'black' : 'transparent')};

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
`;
