import React from 'react';
import styled, { css } from 'styled-components';

export interface BreadcrumbsItem {
    number: number;
    name: string;
    isActive: boolean;
}

interface BreadcrumbsProps {
    path: Array<BreadcrumbsItem | null>;
    className?: string;
}

const StyledRoot = styled.div``;

const StyledNumber = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    background-color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Onest;
    font-weight: 700;
`;

const StyledList = styled.div`
    display: flex;
    column-gap: 60px;
    align-items: center;
`;

const StyledListItem = styled.div`
    display: flex;
    column-gap: 10px;
    align-items: center;
`;

const StyledItem = styled.div<{ isActive?: boolean }>`
    color: white;
    font-weight: 700;
    font-size: 18px;
    font-family: Onest;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;

    ${({ isActive }) =>
        isActive &&
        css`
            color: var(--accent);
        `}
`;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className, path }) => {
    const filteredPath = path.filter(Boolean) as Array<BreadcrumbsItem>;
    if (filteredPath.length === 0) {
        return null;
    }

    return (
        <StyledRoot className={className}>
            <StyledList>
                {filteredPath.map((item, i) => (
                    <StyledListItem key={i}>
                        <StyledNumber>{item.number}</StyledNumber>
                        <StyledItem data-test-name={`Breadcrumb_${item.name}`} isActive={item.isActive}>
                            {item.name}
                        </StyledItem>
                    </StyledListItem>
                ))}
            </StyledList>
        </StyledRoot>
    );
};
