import React from 'react';

import { usePagination, usePaging } from './Paging.hooks';
import {
    StyledRoot,
    StyledPrev,
    StyledNext,
    StyledPrevIcon,
    StyledNextIcon,
    StyledLink,
    StyledPageLink,
} from './Paging.styled';

interface PagingProps {
    currentPage: number;
    recordsTotal: number;
    recordsOnPage: number;
    neighborPages?: number;
    onClick: (page: number) => void;
    className?: string;
}

export const Paging: React.FC<PagingProps> = ({
    className,
    currentPage,
    recordsTotal,
    recordsOnPage,
    neighborPages = 3,
    onClick,
}) => {
    const { totalPages } = usePaging(currentPage, recordsTotal, recordsOnPage, neighborPages);
    const pages = usePagination(totalPages, currentPage, 0);

    return (
        <StyledRoot className={className}>
            <StyledPrev>
                <StyledLink
                    data-test-name="PagingPrev"
                    disabled={currentPage === 1}
                    onClick={currentPage > 1 ? () => onClick(currentPage - 1) : undefined}
                >
                    <StyledPrevIcon />
                </StyledLink>
            </StyledPrev>

            {pages?.map((page, i) => {
                return (
                    <StyledPageLink
                        key={i}
                        data-test-name={`PagingGoTo_${page}`}
                        active={currentPage === page}
                        onClick={typeof page === 'number' ? () => onClick(page) : () => {}}
                    >
                        {page}
                    </StyledPageLink>
                );
            })}

            <StyledNext>
                <StyledLink
                    data-test-name="PagingNext"
                    disabled={currentPage === totalPages}
                    onClick={currentPage < totalPages ? () => onClick(currentPage + 1) : undefined}
                >
                    <StyledNextIcon />
                </StyledLink>
            </StyledNext>
        </StyledRoot>
    );
};
