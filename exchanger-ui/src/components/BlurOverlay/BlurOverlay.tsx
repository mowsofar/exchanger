import React from 'react';
import styled from 'styled-components';

type BlurOverlayProps = {
    show: boolean;
    message: string;
    children: React.ReactNode;
};

const BlurContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const BlurContent = styled.div<{ show: boolean }>`
    filter: ${({ show }) => (show ? 'blur(7px)' : 'none')};
    pointer-events: ${({ show }) => (show ? 'none' : 'auto')};
    user-select: ${({ show }) => (show ? 'none' : 'auto')};
    height: 100%;
`;

const Message = styled.div`
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--accentText);

    @media only screen and (max-width: 800px) {
        font-size: 2rem;
        width: 100%;
    }
`;

const BlurOverlay: React.FC<BlurOverlayProps> = ({ show, message, children }) => {
    return (
        <BlurContainer>
            <BlurContent show={show}>{children}</BlurContent>
            {show && <Message>{message}</Message>}
        </BlurContainer>
    );
};

export default BlurOverlay;
