import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: var(--accent);
    width: 100%;
    height: 3.5rem;
    border: none;
    border-radius: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: Onest;
    cursor: pointer;
    color: var(--text);

    &:hover {
        background-color: var(--lightAccent);
    }

    &:disabled {
        color: var(--backgroundTertiary);

        &:hover {
            background-color: var(--accent);
        }
    }
`;

interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onDoubleClick?: () => void;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, className, onClick, onDoubleClick, disabled }) => {
    return (
        <StyledButton className={className} onClick={onClick} disabled={disabled} onDoubleClick={onDoubleClick}>
            {children}
        </StyledButton>
    );
};
