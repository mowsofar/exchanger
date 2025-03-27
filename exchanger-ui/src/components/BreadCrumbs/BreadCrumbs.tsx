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

const StyledNumber = styled.div<{ isActive: boolean }>`
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 3rem;
    background-color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Onest;
    font-weight: 700;
    font-size: 1.8rem;

    @media (max-width: 1000px) {
        ${({ isActive }) =>
            !isActive &&
            css`
                display: none;
            `}
    }

    @media (max-width: 450px) {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.7rem;
    }
`;

const StyledList = styled.div`
    display: flex;
    column-gap: 6rem;
    align-items: center;

    @media (max-width: 1000px) {
        column-gap: 0;
    }
`;

const StyledListItem = styled.div`
    display: flex;
    column-gap: 1.5rem;
    align-items: center;
`;

const StyledItem = styled.div<{ isActive?: boolean }>`
    color: white;
    font-weight: 700;
    font-size: 2.1rem;
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

    @media (max-width: 1000px) {
        ${({ isActive }) =>
            !isActive &&
            css`
                display: none;
            `}
    }

    @media (max-width: 450px) {
        font-size: 1.8rem;
    }
`;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className, path }) => {
    const filteredPath = path.filter(Boolean) as Array<BreadcrumbsItem>;
    if (filteredPath.length === 0) {
        return null;
    }

    return (
        <div className={className}>
            <StyledList>
                {filteredPath.map((item, i) => (
                    <StyledListItem key={i}>
                        <StyledNumber isActive={item.isActive}>{item.number}</StyledNumber>
                        <StyledItem data-test-name={`Breadcrumb_${item.name}`} isActive={item.isActive}>
                            {item.name}
                        </StyledItem>
                    </StyledListItem>
                ))}
            </StyledList>
        </div>
    );
};
