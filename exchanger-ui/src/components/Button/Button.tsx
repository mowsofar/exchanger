import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: var(--accent);
    width: 100%;
    height: 3.5rem;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: Onest;

    &:hover {
        background-color: var(--lightAccent);
    }
`;

export const Button: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <StyledButton>{children}</StyledButton>;
};
