import { buttonSecondary, surfaceLiquid02, surfaceLiquid03 } from "@salutejs/plasma-tokens";
import { TextField } from "@salutejs/plasma-web";
import styled from "styled-components";

export const StyledImg = styled.img`
    height: 28px;
    display: block;
    margin: 0 auto;
`;

export const VerticalImg = styled(StyledImg)`
    margin-right: 5px;
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
    width: 250px;

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
    text-align: center;
    vertical-align: middle;
`;

export const DraggableTh = styled(StyledTh)<{ isDragging: boolean; isDropTarget: boolean }>`
    position: relative;
    cursor: grab;
    user-select: none;
    opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
    background-color: ${({ isDropTarget }) => (isDropTarget ? 'rgba(76, 175, 80, 0.1)' : 'transparent')};
    transition: transform 0.2s;
  
    &:active {
        cursor: grabbing;
    }
  
    &:hover {
        transform: scale(1.2);
    }
`;

export const DragIndicator = styled.div<{ isActive: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: ${({ isActive }) => (isActive ? '1px dashed #4CAF50' : 'none')};
    pointer-events: none;
`;

export const DiagonalCell = styled.div`
    background-color: ${surfaceLiquid03};
    width: 45px;
    height: 45px;
    border-radius: 35px;
`;

export const EmptyCell = styled.div`
    background-color: ${surfaceLiquid02};
    width: 45px;
    height: 45px;
    border-radius: 35px;
`;

export const ProfitCircle = styled.div<{ isSelected?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 12px;
    border-radius: 50%;
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
