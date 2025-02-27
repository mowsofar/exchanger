import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledLayout = styled.div`
    display: flex;
    column-gap: 10vw;
    height: 100vh;
    background-color: var(--backgroundPrimary);
    align-items: center;
    justify-content: center;
    z-index: -1;
`;

const Shade1 = styled.img`
    height: auto;
    position: absolute;
    top: 0;
    opacity: 0.55;
    width: 100%;
    z-index: 0;
`;

const Shade2 = styled.img`
    height: auto;
    left: 0;
    max-width: 68.4rem;
    opacity: 0.55;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
`;

const Shade3 = styled.img`
    height: auto;
    right: 0;
    max-width: 68.4rem;
    opacity: 0.55;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
`;

const Shade4 = styled.img`
    height: auto;
    right: 0;
    opacity: 0.55;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: 0;
`;

export const AppLayout: React.FC = () => {
    return (
        <StyledLayout>
            <Shade1 src="/images/shade1.png" alt="shade1" />
            <Shade2 src="/images/shade2.png" alt="shade2" />
            <Shade3 src="/images/shade3.png" alt="shade3" />
            <Shade4 src="/images/shade4.png" alt="shade4" />
            <Outlet />
        </StyledLayout>
    );
};
