import { Headline3 } from '@salutejs/plasma-web';
import { StyledTableCellName, StyledTableHeaderCell, TableBody, TableWrapper } from '../../components/Table/Table';
import { IconRotateCcw } from '@salutejs/plasma-icons';
import React from 'react';
import { usePayoutsPage } from './PayoutsPage.hooks';
import {
    StyledBadge,
    StyledButton,
    StyledCurrency,
    StyledRoot,
    StyledTableHeader,
    StyledTableRow,
} from './PayoutsPage.styled';
import { Payout } from '../../api/types/common';
import { getPayoutData } from '../../utils/getPayoutData';

const payouts: Payout[] = [
    {
        id: 11232,
        srcCurrency: 1,
        targetCurrency: 1,
        amountFrom: 3,
        amountTo: 3,
        requisites: 'ddd',
        course: 3,
        status: 'COMPLETED',
        createdAt: '2025-02-18T22:52:02.534623',
        updatedAt: 'updated',
        ipAddress: 'ip',
        email: 'email@mail.ru',
        user: {
            firstname: 'Zarema',
            lastname: 'Avamileva',
            email: 'zaremavamileva@gmail.com',
            balance: 1202020,
        },
        attachments: [
            {
                id: 1,
                fileUrl: 'sss',
                fileName: 'file',
                contentType: 'sss',
                uploadedAt: 'sssss',
            },
        ],
    },
    {
        id: 11233,
        srcCurrency: 1,
        targetCurrency: 1,
        amountFrom: 3,
        amountTo: 3,
        requisites: 'ddd',
        course: 3,
        status: 'WAITING_FOR_CLIENT_PAYMENT',
        createdAt: '2025-02-18T22:52:02.534623',
        updatedAt: 'updated',
        ipAddress: 'ip',
        email: 'email@mail.ru',
        user: {
            firstname: 'Zarema',
            lastname: 'Avamileva',
            email: 'zaremavamileva@gmail.com',
            balance: 1202020,
        },
        attachments: [
            {
                id: 1,
                fileUrl: 'sss',
                fileName: 'file',
                contentType: 'sss',
                uploadedAt: 'sssss',
            },
        ],
    },
];

export const PayoutsPage: React.FC = () => {
    usePayoutsPage();

    return (
        <StyledRoot>
            <Headline3>Заявки</Headline3>
            <StyledButton view="secondary" text="Обновить список" contentLeft={<IconRotateCcw />} />

            <TableWrapper>
                <StyledTableHeader>
                    <StyledTableHeaderCell>№</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Дата создания</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Отдаёт клиент</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Переводит сервис</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Статус заявки</StyledTableHeaderCell>
                </StyledTableHeader>
                <TableBody>
                    {payouts.map((item) => {
                        const createdAt = new Date(item.createdAt).toLocaleString();

                        return (
                            <StyledTableRow key={item.id}>
                                <StyledTableCellName style={{ fontWeight: '600' }}>№{item.id}</StyledTableCellName>
                                <StyledTableCellName isSecondary>От {createdAt}</StyledTableCellName>
                                <StyledTableCellName>
                                    <StyledCurrency>
                                        <div>Наличные RUB</div>
                                        <div>1 000 000</div>
                                    </StyledCurrency>
                                </StyledTableCellName>
                                <StyledTableCellName>
                                    <StyledCurrency isTarget>
                                        <div>Bitcoin BTC</div>
                                        <div>0.18262626</div>
                                    </StyledCurrency>
                                </StyledTableCellName>
                                <StyledTableCellName>
                                    <StyledBadge
                                        text={getPayoutData(item.status).label}
                                        view={getPayoutData(item.status).view}
                                    />
                                </StyledTableCellName>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </TableWrapper>
        </StyledRoot>
    );
};
