import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { IconChevronDown } from '@salutejs/plasma-icons';
import { Spinner } from '@salutejs/plasma-web';

const StyledSelect = styled.div`
    font-size: 1rem;
`;

const StyledButton = styled(Button)`
    display: inline-block;
    position: relative;
    font-size: 1rem;
    width: 24rem;
    height: 4.5rem;
    background-color: var(--backgroundSecondary);
    border: 2px solid var(--accent);
    color: white;

    &:hover {
        background-color: var(--backgroundTertiary);
    }

    @media only screen and (max-width: 820px) {
        width: 8rem;
    }

    @media only screen and (max-width: 450px) {
        width: 6rem;
        height: 4rem;
    }
`;

const StyledText = styled.div`
    position: absolute;
    font-size: 1.6rem;
    left: 15px;
    bottom: 10px;
    display: block;
    padding-left: 35px;

    @media only screen and (max-width: 820px) {
        display: none;
    }
`;

const StyledIcon = styled(IconChevronDown)`
    position: absolute;
    right: 1.3rem;
    bottom: 1.1rem;

    @media only screen and (max-width: 450px) {
        right: 1rem;
        width: 1rem;
    }
`;

const StyledImage = styled.img`
    display: block;
    width: 25px;
    padding-left: 5px;
    padding-bottom: 5px;

    @media only screen and (max-width: 450px) {
        width: 2rem;
        padding-bottom: 0.1rem;
        padding-left: 0.2rem;
    }
`;

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
        width: 2rem !important;
        height: 2rem !important;
    }
`;

interface Props {
    children: React.ReactNode;
    onClick: () => void;
    contentLeft?: any;
    isLoading?: boolean;
    text?: string;
    className?: string;
}

export const Select: React.FC<Props> = ({ className, contentLeft, text, onClick, children, isLoading }) => {
    return (
        <StyledSelect onClick={onClick} className={className}>
            {Boolean(!isLoading) && (
                <StyledButton>
                    <StyledImage src={contentLeft} />
                    <StyledText>{children}</StyledText>
                    <StyledIcon color="white" />
                </StyledButton>
            )}

            {Boolean(isLoading) && (
                <StyledButton>
                    <SpinnerWrapper>
                        <Spinner size={30} color="white" />
                    </SpinnerWrapper>
                </StyledButton>
            )}
        </StyledSelect>
    );
};
