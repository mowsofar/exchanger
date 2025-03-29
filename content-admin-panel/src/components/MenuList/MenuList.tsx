import styled from 'styled-components';
import { Search } from '../Search';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { blackPrimary, headline4, tertiary } from '@salutejs/plasma-tokens';
import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@salutejs/plasma-icons';
import { $isRolledUpPartnerListStore } from '../../stores/menu.store';
import { useStore } from '@nanostores/react';

interface StyledRootProps {
    isRolledUp?: boolean;
}

const StyledRoot = styled.div<StyledRootProps>`
    display: flex;
    flex-direction: column;
    padding: 21px 16px;
    width: 314px;
    gap: 10px;
    width: ${({ isRolledUp }) => `${isRolledUp ? 16 : 314}px`};
`;

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledTitle = styled.div`
    font-size: ${headline4};
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

export const StyledIconChevronLeft = styled(IconChevronLeft)`
    cursor: pointer;
`;

const StyledIconChevronRight = styled(IconChevronRight)`
    cursor: pointer;
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
    { key: ROUTES.currencyCode, name: 'Коды валют' },
    { key: ROUTES.paymentSystems, name: 'Платёжные системы' },
    { key: ROUTES.currency, name: 'Валюты' },
    { key: ROUTES.payouts, name: 'Заявки' },
    { key: ROUTES.exchangeDirections, name: 'Направления обмена' },
    { key: ROUTES.additionalFields, name: 'Дополнительные поля валют' },
    { key: ROUTES.requisites, name: 'Реквизиты' },
];

export const MenuList: React.FC = () => {
    const [searchValue, setSearchValue] = React.useState('');

    const isRolledUp = useStore($isRolledUpPartnerListStore);

    const menu = React.useMemo(() => {
        if (searchValue) {
            return menuItems.filter((item) => item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
        }

        return menuItems;
    }, [searchValue]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (isRolledUp) {
        return (
            <StyledRoot isRolledUp>
                <StyledHeader onClick={() => $isRolledUpPartnerListStore.set(false)}>
                    <StyledIconChevronRight size="xs" color={tertiary} />
                </StyledHeader>
            </StyledRoot>
        );
    }

    return (
        <StyledRoot>
            <StyledHeader onClick={() => $isRolledUpPartnerListStore.set(true)}>
                <StyledTitle>Меню</StyledTitle>
                <StyledIconChevronLeft size="xs" color={tertiary} />
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
