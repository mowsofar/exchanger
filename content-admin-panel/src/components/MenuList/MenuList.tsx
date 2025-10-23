import styled from 'styled-components';
import { Search } from '../Search';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { blackPrimary, headline4, tertiary } from '@salutejs/plasma-tokens';
import React from 'react';
import {
    IconBankCardOutline,
    IconBoardingPassOutline,
    IconChevronLeft,
    IconChevronRight,
    IconFileTextOutline,
    IconNumberedView,
    IconRubleOutline,
    IconRublePlusDollar,
    IconSwapHoriz,
} from '@salutejs/plasma-icons';
import { $isRolledUpPartnerListStore } from '../../stores/menu.store';
import { useStore } from '@nanostores/react';
import { MenuItemWithChildren } from '../MenuItemWithChildren/MenuItemWithChildren';

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

    > div {
        height: 45px !important;
    }
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
    display: flex;
    align-items: center;
    column-gap: 8px;
    font-size: 18px;
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
    { key: ROUTES.currencyCode, name: 'Коды валют', icon: <IconRubleOutline size="s" /> },
    { key: ROUTES.paymentSystems, name: 'Платёжные системы', icon: <IconBankCardOutline size="s" /> },
    { key: ROUTES.currency, name: 'Валюты', icon: <IconRublePlusDollar size="s" /> },
    {
        name: 'Заявки',
        icon: <IconFileTextOutline size="s" />,
        children: [
            { key: ROUTES.payouts.index, name: 'Все заявки' },
            { key: ROUTES.payouts.preliminary, name: 'Предварительные' },
            { key: ROUTES.payouts.waitingRequisites, name: 'Ожидают реквизиты' },
            { key: ROUTES.payouts.process, name: 'В обработке' },
            { key: ROUTES.payouts.referralPay, name: 'Реферальные выплаты' },
            { key: ROUTES.payouts.completed, name: 'Обработанные' },
            { key: ROUTES.payouts.rejected, name: 'Отклонённые' },
            { key: ROUTES.payouts.error, name: 'Ошибочные' },
        ],
    },
    { key: ROUTES.exchangeDirections, name: 'Направления обмена', icon: <IconSwapHoriz size="s" /> },
    { key: ROUTES.additionalFields, name: 'Дополнительные поля валют', icon: <IconNumberedView size="s" /> },
    { key: ROUTES.requisites, name: 'Реквизиты', icon: <IconBoardingPassOutline size="s" /> },
    { key: ROUTES.autobroker, name: 'Autobroker' },
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
                {menu.map((item) =>
                    item.children ? (
                        <MenuItemWithChildren item={item} key={item.key} />
                    ) : (
                        <StyledMenuItem to={item.key} key={item.key}>
                            {item?.icon}
                            {item.name}
                        </StyledMenuItem>
                    ),
                )}
            </StyledMenu>
        </StyledRoot>
    );
};
