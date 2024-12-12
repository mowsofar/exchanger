import styled from 'styled-components';
import { Search } from '../Search';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { blackPrimary } from '@salutejs/plasma-tokens';
import React from 'react';

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
    padding: 21px 16px;
    width: 314px;
    gap: 10px;
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
    margin-top: 10px;
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
    { key: ROUTES.paymentSystems, name: 'Платёжные системы' },
    { key: ROUTES.currency, name: 'Валюты' },
    { key: ROUTES.currencyCode, name: 'Коды валют' },
    { key: ROUTES.courses, name: 'Курсы из источников' },
    { key: ROUTES.applications, name: 'Заявки' },
];

export const MenuList: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState('');

    const menu = React.useMemo(() => {
        if (searchValue) {
            return menuItems.filter((item) => item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
        }

        return menuItems;
    }, [searchValue]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <StyledRoot>
            <StyledHeader>
                <StyledTitle>Меню</StyledTitle>
            </StyledHeader>
            <StyledSearch placeholder="Поиск" onChange={onChange} />
            <StyledMenu>
                {menu.map((item) => (
                    <StyledMenuItem to={item.key}>{item.name}</StyledMenuItem>
                ))}
            </StyledMenu>
        </StyledRoot>
    );
};
