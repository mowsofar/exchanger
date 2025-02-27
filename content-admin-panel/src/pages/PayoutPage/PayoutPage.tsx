import { Headline3, Headline4 } from '@salutejs/plasma-web';
import React from 'react';
import {
    StyledBadge,
    StyledBlock,
    StyledLine,
    StyledRoot,
    StyledSaveButton,
    StyledSelect,
    StyledTextField,
    StyledTwoBlocks,
} from './PayoutPage.styled';
import { ROUTES } from '../../constants/routes';
import { Breadcrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { useNavigate } from 'react-router-dom';
import { Payout } from '../../api/types/common';
import { getPayoutData } from '../../utils/getPayoutData';

const payout: Payout = {
    id: 11232,
    srcCurrency: 1,
    targetCurrency: 1,
    amountFrom: 100000,
    amountTo: 0.18262626,
    requisites: 'ddd',
    course: 3,
    status: 'COMPLETED',
    createdAt: '2025-02-18T22:52:02.534623',
    updatedAt: 'updated',
    ipAddress: '51.158.253.154',
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
};

export const PayoutPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <StyledRoot>
            <Breadcrumbs
                path={[
                    { name: 'Список заявок', route: ROUTES.payouts },
                    { name: `Заявка №${payout.id}`, route: ROUTES.payout(payout?.id) },
                ]}
            />
            <Headline3>Информация о заявке</Headline3>
            <StyledBadge size="l" text={getPayoutData(payout.status).label} view={getPayoutData(payout.status).view} />

            <StyledTwoBlocks>
                <StyledBlock>
                    <Headline4>О клиенте</Headline4>
                    <StyledTextField label="Имя" value={payout.user.firstname} readOnly />
                    <StyledTextField label="Фамилия" value={payout.user.lastname} readOnly />
                    <StyledTextField label="E-mail" value={payout.user.email} readOnly />
                    <StyledTextField label="IP" value={payout.ipAddress} readOnly />
                </StyledBlock>

                <StyledLine />

                <StyledBlock>
                    <Headline4>Детали</Headline4>
                    <StyledTextField label="Отдаёт клиент" value={payout.amountFrom} readOnly />
                    <StyledTextField label="Валюта" value="Наличные RUB" readOnly />
                    <StyledTextField label="Переводит сервис" value={payout.amountTo} readOnly />
                    <StyledTextField label="Валюта" value="Bitcoin BTC" readOnly />
                </StyledBlock>
            </StyledTwoBlocks>

            <StyledBlock>
                <StyledSaveButton view="dark" size="s" text="Сохранить" />
            </StyledBlock>
        </StyledRoot>
    );
};
