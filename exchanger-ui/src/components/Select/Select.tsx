import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { IconChevronDown } from '@salutejs/plasma-icons';

const StyledSelect = styled.div`
    font-size: 1rem;
`;

const StyledButton = styled(Button)`
    display: inline-block;
    position: relative;
    font-size: 1rem;
    width: 24rem;
    height: 45px;
    background-color: var(--backgroundSecondary);
    border: 2px solid var(--accent);
    color: white;

    &:hover {
        background-color: var(--backgroundTertiary);
    }

    @media only screen and (max-width: 800px) {
        width: 8rem;
    }
`;

const StyledText = styled.div`
    position: absolute;
    font-size: 1.6rem;
    left: 15px;
    bottom: 10px;
    display: block;
    padding-left: 35px;

    @media only screen and (max-width: 800px) {
        display: none;
    }
`;

const StyledIcon = styled(IconChevronDown)`
    position: absolute;
    right: 1.3rem;
    bottom: 1.1rem;
`;

const StyledImage = styled.img`
    display: block;
    width: 25px;
    padding-left: 5px;
    padding-bottom: 5px;
`;

interface Props {
    text?: string;
    children: React.ReactNode;
    contentLeft?: any;
    onClick: () => void;
    className?: string;
}

export const Select: React.FC<Props> = ({ className, contentLeft, text, onClick, children }) => {
    return (
        <StyledSelect onClick={onClick} className={className}>
            <StyledButton>
                <StyledImage src={contentLeft} />
                <StyledText>{children}</StyledText>
                <StyledIcon color="white" />
            </StyledButton>
        </StyledSelect>
    );
};
