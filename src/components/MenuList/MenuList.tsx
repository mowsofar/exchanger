import styled from 'styled-components';
import { Search } from '../Search';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { blackPrimary } from '@salutejs/plasma-tokens';

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    padding: 21px 16px;
    width: 314px;
`;

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledTitle = styled.div`
    font-size: 15px;
    text-transform: uppercase;
    margin-left: 16px;
    font-weight: 600;
`;

const StyledSearch = styled(Search)`
    margin: 20px 0 19px;
`;

const ScrollList = styled.div`
    overflow-y: scroll;
`;

const StyledMenu = styled(ScrollList)`
    overflow-x: hidden;
    margin: 0 -16px;
`;

const StyledMenuItem = styled(NavLink)`
    padding: 14px 16px 14px 32px;
    display: block;
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    color: ${blackPrimary} !important;

    &.active {
        background: #ececeb;
    }

    &::before {
        border: 0;
    }

    &:visited {
        color: ${blackPrimary} !important;
    }

    &:hover {
        color: ${blackPrimary} !important;
        background: #ececeb;
    }
`;

const menuItems = [
    { key: ROUTES.root, name: 'Платёжные системы' },
    { key: ROUTES.currency, name: 'Валюты' },
    { key: ROUTES.currencyCode, name: 'Коды валют' },
    { key: ROUTES.courses, name: 'Курсы из источников' },
    { key: ROUTES.applications, name: 'Заявки' },
];

export const MenuList: React.FC = () => {
    return (
        <StyledRoot>
            <StyledHeader>
                <StyledTitle>Меню</StyledTitle>
            </StyledHeader>
            <StyledSearch />
            <StyledMenu>
                {menuItems.map((item) => (
                    <StyledMenuItem to={item.key}>{item.name}</StyledMenuItem>
                ))}
            </StyledMenu>
        </StyledRoot>
    );
};
