import { Headline3 } from '@salutejs/plasma-web';
import { getPaymentSystems } from '../../api/handlers';
import { PaymentSystem } from '../../api/types/paymentSystems';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import { StyledRoot, StyledTableHeader, StyledTableRow } from './PaymentSystems.styled';

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
    const paymentSystems = getPaymentSystems();
    console.log(paymentSystems);

    return (
        <StyledRoot>
            <Headline3>Список платёжных систем</Headline3>
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
        </StyledRoot>
    );
};
