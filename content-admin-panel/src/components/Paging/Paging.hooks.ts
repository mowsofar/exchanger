import React from 'react';

 const range = (from: number, to: number) => Array.from(Array(to - from + 1), (_, i) => from + i);

export function usePaging(currentPage: number, recordsTotal: number, recordsOnPage: number, neighborPages: number) {
    let showPages = neighborPages * 2 + 1;
    const totalPages = Math.ceil(recordsTotal / recordsOnPage);
    let pages: number[] = [];

    if (currentPage <= neighborPages + 1 || currentPage >= totalPages - neighborPages) {
        showPages += 1;
    }

    if (totalPages <= showPages) {
        pages = range(1, totalPages);
    } else {
        const startPage = Math.max(1, currentPage - neighborPages);
        const endPage = Math.min(totalPages, currentPage + neighborPages);
        pages = range(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = totalPages - endPage > 1;
        const spillOffset = showPages - pages.length;

        if (hasLeftSpill) {
            const extraPages = range(startPage - spillOffset, startPage - 1);
            pages = [...extraPages, ...pages];
        }

        if (hasRightSpill) {
            const extraPages = range(endPage + 1, endPage + spillOffset);
            pages = [...pages, ...extraPages];
        }

        if (pages[0] !== 1) {
            pages = [1, ...pages];
        }

        if (pages[pages.length - 1] !== totalPages) {
            pages = [...pages, totalPages];
        }
    }

    return { pages, totalPages };
}

export const usePagination = (totalCount: number, currentPage: number, siblingCount = 0) => {
    return React.useMemo(() => {
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalCount) {
            return range(1, totalCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);

        const shouldShowLeftDots = leftSiblingIndex > 3;
        const shouldShowRightDots = rightSiblingIndex < totalCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);
            return [...leftRange, '...', totalCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(totalCount - rightItemCount + 1, totalCount);
            return [firstPageIndex, '...', ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }
    }, [totalCount, siblingCount, currentPage]);
};
