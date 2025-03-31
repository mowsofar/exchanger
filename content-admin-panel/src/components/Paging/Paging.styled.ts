import styled, { css } from 'styled-components';
import { primary, secondary, buttonSecondary, footnote2 } from '@salutejs/plasma-tokens-web';
import { IconChevronRight, IconChevronLeft } from '@salutejs/plasma-icons';

export const StyledRoot = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 87px;
`;

interface StyledLinkProps {
    disabled?: boolean;
}

export const StyledLink = styled.div<StyledLinkProps>`
    cursor: pointer;

    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.1;
            cursor: auto;
        `}
`;

interface StyledPageProps {
    active?: boolean;
}

export const StyledPageLink = styled(StyledLink)<StyledPageProps>`
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${footnote2};
    color: ${secondary};
    border-radius: 12px;
    user-select: none;

    ${({ active }) =>
        active &&
        css`
            color: ${primary};
            background: ${buttonSecondary};
            cursor: auto;
        `}
`;

export const StyledPrev = styled.div`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`;

export const StyledNext = styled.div`
    width: 24px;
    height: 24px;
    margin-left: 8px;
`;

export const StyledPrevIcon = styled(IconChevronLeft)`
    & > svg {
        color: ${secondary};
    }
`;

export const StyledNextIcon = styled(IconChevronRight)`
    & > svg {
        color: ${secondary};
    }
`;
