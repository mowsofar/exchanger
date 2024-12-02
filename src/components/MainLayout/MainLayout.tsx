import { Button, type MenuProps } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { ContentBlock, Logo, StyledContent, StyledHeader, StyledLayout, StyledMenu, StyledSider } from './styles';

const menuItems: MenuProps['items'] = [
    { label: <Link to={ROUTES.root}>Платёжные системы</Link>, key: ROUTES.root },
    { label: <Link to={ROUTES.currency}>Валюты</Link>, key: ROUTES.currency, icon: '' },
    { label: <Link to={ROUTES.currencyCode}>Коды валют</Link>, key: ROUTES.currencyCode, icon: '' },
];

export const MainLayout: React.FC = () => {
    const { pathname } = useLocation();

    return (
        <StyledLayout>
            <StyledHeader>
                <Logo>Exchanger</Logo>
                <Button type="primary">Войти</Button>
            </StyledHeader>

            <StyledContent>
                <StyledSider>
                    <StyledMenu selectedKeys={[pathname]} mode="inline" items={menuItems} />
                </StyledSider>
                <ContentBlock>
                    <Outlet />
                </ContentBlock>
            </StyledContent>
        </StyledLayout>
    );
};
