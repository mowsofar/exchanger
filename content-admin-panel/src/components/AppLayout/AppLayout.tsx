import { StyledLayout, StyledLeftColumn, StyledRightColumn, StyledTwoColumnsRoot } from './AppLayout.styled';
import { MenuList } from '../MenuList/MenuList';
import { Header } from '../Header/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const AppLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname === ROUTES.root) {
        navigate(ROUTES.login);
    }

    return (
        <StyledLayout>
            <Header />
            <StyledTwoColumnsRoot>
                <StyledLeftColumn>
                    <MenuList />
                </StyledLeftColumn>
                <StyledRightColumn>
                    <Outlet />
                </StyledRightColumn>
            </StyledTwoColumnsRoot>
        </StyledLayout>
    );
};
