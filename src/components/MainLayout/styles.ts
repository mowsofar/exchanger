import { Layout, Menu } from 'antd';
import styled from 'styled-components';


const { Header, Content, Sider } = Layout;

export const StyledLayout = styled(Layout)`
    background-color: #030f41; 
    padding: 10px 15vw;
    display: block;
`;

export const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    border-radius: 12px;
    background-color: #000131;
`;

export const StyledContent = styled.div`
    width: 100%;
    height: 100vh;
    margin-top: 20px;
    border-radius: 12px;
    display: flex;
    column-gap: 20px;
`;

export const StyledSider = styled(Sider)`
    background-color: #030f41;
`;

export const StyledMenu = styled(Menu)`
    background-color: #0e2b60;
    min-width: 12vw;
    height: 100vh;
    border-radius: 12px;
    font-size: 16px;

    & li, span, svg {
        color: white;
    }    
`;

export const ContentBlock = styled(Content)`
    background-color: #0e2b60;
    width: 100%;
    height: 100%;
    border-radius: 12px;
`;

export const Logo = styled.div`
    color: white;
    font-weight: 700;
    font-size: 26px;
`;
