import { Button, Headline3 } from '@salutejs/plasma-web';
import { getCurrencies } from '../../api/handlers';
import { PaymentSystem } from '../../api/types/paymentSystems';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import { StyledTableHeader, StyledTableRow } from '../PaymentSystems/PaymentSystems.styled';
import { StyledRoot } from './Currencies.styled';
import { IconPlus } from '@salutejs/plasma-icons';
import React from 'react';
import { AddCurrencyModal } from '../../components/AddCurrencyModal';

const paymentSystemsResponse: PaymentSystem[] = [
    {
        id: 1,
        paymentName: 'Tether TRC20',
        image: 'BAgM',
        currencies: [
            {
                id: 3,
                actualFlg: 'ACTIVE',
                reserve: null,
                minAmount: null,
                maxAmount: null,
                requisites: null,
                round: 4,
                currencyCode: {
                    id: 3,
                    currencyCode: 'USDT',
                    symbol: 'usdt',
                    exchangeRate: null,
                    autoCorrectCourse: null,
                },
            },
        ],
    },
    {
        id: 2,
        paymentName: 'BTC',
        image: 'BAgM',
        currencies: [
            {
                id: 5,
                actualFlg: 'ACTIVE',
                reserve: null,
                minAmount: null,
                maxAmount: null,
                requisites: null,
                round: 8,
                currencyCode: {
                    id: 2,
                    currencyCode: 'BTC',
                    symbol: 'btc',
                    exchangeRate: null,
                    autoCorrectCourse: null,
                },
            },
        ],
    },
    {
        id: 3,
        paymentName: 'Tinkoff',
        image: 'BAgM',
        currencies: [
            {
                id: 4,
                actualFlg: 'ACTIVE',
                reserve: null,
                minAmount: null,
                maxAmount: null,
                requisites: null,
                round: 2,
                currencyCode: {
                    id: 1,
                    currencyCode: 'RUB',
                    symbol: 'rub',
                    exchangeRate: null,
                    autoCorrectCourse: null,
                },
            },
        ],
    },
];

export const Currencies: React.FC = () => {
    const [isAddCurrencyModalOpen, setIsAddCurrencyModalOpen] = React.useState(false);
    const currencies = getCurrencies();
    console.log(currencies);

    return (
        <StyledRoot>
            <Headline3>Валюты</Headline3>
            <Button
                contentLeft={<IconPlus color="white" />}
                size="s"
                text="Добавить валюту"
                onClick={() => setIsAddCurrencyModalOpen((state) => !state)}
            />
            <TableWrapper>
                <StyledTableHeader>
                    <StyledTableHeaderCell />
                    <StyledTableHeaderCell>Название</StyledTableHeaderCell>
                </StyledTableHeader>
                <TableBody>
                    {paymentSystemsResponse.map((item) => {
                        return (
                            <StyledTableRow key={item.id}>
                                <StyledTableCellName>{item.image}</StyledTableCellName>
                                <StyledTableCellName>{item.paymentName}</StyledTableCellName>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </TableWrapper>
            <AddCurrencyModal opened={isAddCurrencyModalOpen} onClose={() => setIsAddCurrencyModalOpen(false)} />
        </StyledRoot>
    );
};
