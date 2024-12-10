import { PaymentSystem } from '../../api/types/paymentSystems';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableHeader, TableRow } from '../Table/Table';
import styled from 'styled-components';

const StyledTableRow = styled(TableRow)`
    grid-template-columns: 200px 1fr;
    padding: 0 16px;

    cursor: pointer;
`;

const StyledTableHeader = styled(TableHeader)`
    grid-template-columns: 200px 1fr;
    padding: 0 16px;
    padding-right: 23px;
`;

const Title = styled.div`
    font-size: 23px;
    font-weight: 600;
    margin: 20px 20px;
    font-family: 'SB Sans Text', sans-serif;
`;

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

export const PaymentSystems: React.FC = () => {
    return (
        <>
            <Title>Список платежных систем</Title>
            <StyledTableHeader>
                <StyledTableHeaderCell></StyledTableHeaderCell>
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
        </>
    );
};
