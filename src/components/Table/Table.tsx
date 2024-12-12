import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { Button, Spinner } from '@salutejs/plasma-ui';
import {
    blackSecondary,
    caption,
    paragraph1,
    primary,
    secondary,
    surfaceSolid03,
    tertiary,
} from '@salutejs/plasma-tokens';
import { ScrollList } from '../ScrollList';

export const Table = styled.div`
    display: grid;
`;

export const TableHeader = styled.div`
    display: grid;
`;

interface TableRowProps {
    selected?: boolean;
}

export const TableRow = styled.div<TableRowProps>`
    display: grid;
    background-color: ${surfaceSolid03};

    &:hover {
        background: ${surfaceSolid03};
    }
`;

interface TableHeaderCellProps {
    textAlign?: 'center' | 'end';
}

export const TableHeaderCell = styled.div<TableHeaderCellProps>`
    height: 40px;
    line-height: 18px;
    padding: 11px;
    align-items: center;
    display: flex;
    font-size: 12px;
    box-sizing: border-box;
    color: rgba(8, 8, 8, 0.3);

    ${({ textAlign }) =>
        textAlign &&
        css`
            justify-content: ${textAlign};
        `};
`;

interface TableCellProps {
    selected?: boolean;
}

export const TableCell = styled.div<TableCellProps>`
    height: 50px;
    font-size: ${paragraph1};
    padding: 13px;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    color: ${tertiary};
    text-overflow: ellipsis;
    ${({ selected }) => (selected ? `background: #ececeb;` : '')}
`;

export const TableCellName = styled(TableCell)`
    color: ${primary};
`;

interface TableLoadMoreProps {
    isLoading: boolean;
    onClick: () => void;
}

export const TableLoadMoreContainer = styled.div`
    padding: 0 12px 12px;
`;

export const TableLoadMore: React.FC<TableLoadMoreProps> = ({ isLoading, onClick }) => (
    <TableLoadMoreContainer>
        {isLoading ? <Spinner size={32} /> : <Button onClick={onClick}>Загрузить ещё</Button>}
    </TableLoadMoreContainer>
);

interface TableBodyProps {
    isLoading?: boolean;
    className?: string;
    children?: ReactNode;
}

export const TableBodyBase = styled(ScrollList)`
    &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
        background-color: ${surfaceSolid03};
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: ${blackSecondary};
    }
`;

const TableBodyWrapper = styled.div`
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    grid-area: tbody;
`;

export const TableLoader = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.3);
`;

export const TableBody: React.FC<TableBodyProps> = ({ children, isLoading, className }) => {
    return (
        <TableBodyWrapper className={className}>
            <TableBodyBase>
                {!!isLoading && (
                    <TableLoader>
                        <Spinner size={32} />
                    </TableLoader>
                )}
                {children}
            </TableBodyBase>
        </TableBodyWrapper>
    );
};

export const StyledTableHeaderCell = styled(TableHeaderCell)`
    font-size: ${caption};
    text-transform: uppercase;
`;

interface StyledTableCellNameProps {
    isSecondary?: boolean;
    isTertiary?: boolean;
    withoutOverflow?: boolean;
    textAlign?: 'center' | 'end';
}

export const StyledTableCellName = styled(TableCellName)<StyledTableCellNameProps>`
    ${({ isSecondary }) =>
        isSecondary &&
        css`
            color: ${secondary};
        `}

    ${({ isTertiary }) =>
        isTertiary &&
        css`
            color: ${tertiary};
        `}

    ${({ withoutOverflow }) =>
        withoutOverflow &&
        css`
            overflow: inherit;
        `}

    ${({ textAlign }) =>
        textAlign &&
        css`
            text-align: ${textAlign};
        `}

    &:empty::before {
        content: '—';
        color: ${secondary};
    }
`;

export const StyledTableCellActions = styled(StyledTableCellName)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TableWrapper = styled.div`
    border: 1px solid ${surfaceSolid03};
    width: fit-content;
`;
