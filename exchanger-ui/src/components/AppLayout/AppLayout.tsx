import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../Header/Header';

const Layout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--backgroundPrimary);
    overflow-y: scroll;
`;

const Root = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 5rem;
`;

const StyledLayout = styled.div`
    height: 100%;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Shade1 = styled.img`
    height: auto;
    position: fixed;
    top: 0;
    opacity: 0.55;
    width: 100%;
    z-index: -1;
`;

const Shade2 = styled.img`
    height: auto;
    left: 0;
    max-width: 68.4rem;
    opacity: 0.55;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: -1;
`;

const Shade3 = styled.img`
    height: auto;
    right: 0;
    max-width: 68.4rem;
    opacity: 0.55;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: -1;
`;

const Shade4 = styled.img`
    height: auto;
    right: 0;
    opacity: 0.55;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: -1;
`;

export const AppLayout: React.FC = () => {
    return (
        <Layout>
            <Root>
                <Shade1 src="/images/shade1.png" alt="shade1" />
                <Shade2 src="/images/shade2.png" alt="shade2" />
                <Shade3 src="/images/shade3.png" alt="shade3" />
                <Shade4 src="/images/shade4.png" alt="shade4" />
                <Header />
                <StyledLayout>
                    <Outlet />
                </StyledLayout>
            </Root>
        </Layout>
    );
};
