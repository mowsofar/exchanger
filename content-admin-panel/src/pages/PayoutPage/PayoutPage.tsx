import { Headline3, Headline4 } from '@salutejs/plasma-web';
import React from 'react';
import {
    StyledBadge,
    StyledBlock,
    StyledLine,
    StyledRoot,
    StyledSaveButton,
    Icon,
    StyledTwoBlocks,
    Row,
    Course,
    StyledButtons,
    TitleBlock,
    StyledTextField,
} from './PayoutPage.styled';
import { getPayoutControls, getPayoutData } from '../../utils/getPayoutData';
import { useStore } from '@nanostores/react';
import { $selectedPayout } from '../../stores/payout.store';
import { usePayoutPage } from './PayoutPage.hooks';
import { InfoBlock } from '../../components/InfoBlock/InfoBlock';

export const PayoutPage: React.FC = () => {
    const { editPayoutStatus, setPayoutRequisites } = usePayoutPage();

    const payout = useStore($selectedPayout);

    const [exchangeRequisites, setExchangeRequisites] = React.useState(payout?.exchangeRequisites || '');

    const courseTitle = `Курс: 1 ${payout?.srcCurrency?.currencyCode.code} = ${payout?.course} ${payout?.targetCurrency?.currencyCode.code}`;

    const controls = getPayoutControls(payout?.status);

    const handleSumbitRequisites = () => {
        if (exchangeRequisites && payout?.id) {
            setPayoutRequisites(payout.id, exchangeRequisites);
        }
    };

    return (
        <>
            <head>
                <title>Заявка</title>
            </head>

            <StyledRoot>
                <TitleBlock>
                    <Headline3>Информация о заявке №{payout?.id}</Headline3>
                    {payout?.status && (
                        <StyledBadge
                            size="l"
                            text={getPayoutData(payout?.status).label}
                            view={getPayoutData(payout?.status).view}
                        />
                    )}
                </TitleBlock>

                <StyledButtons>
                    {controls.map((control) => {
                        return (
                            <StyledSaveButton
                                size="m"
                                view={control.view || 'accent'}
                                text={control.label}
                                onClick={() => {
                                    if (payout?.id) {
                                        editPayoutStatus(payout?.id, control.value);
                                    }
                                }}
                            />
                        );
                    })}
                </StyledButtons>

                <Course>{courseTitle}</Course>

                <StyledTwoBlocks>
                    <StyledBlock>
                        <Headline4>Детали</Headline4>
                        <InfoBlock label="Отдаёт клиент" value={payout?.amountFrom} hasCopyButton />
                        <InfoBlock
                            label="Валюта"
                            value={
                                <Row>
                                    <Icon src={payout?.srcCurrency?.paymentSystem.imagePath} />
                                    <div>{payout?.srcCurrency?.currencyCode.code}</div>
                                </Row>
                            }
                        />
                        <InfoBlock label="Переводит сервис" value={payout?.amountTo} hasCopyButton />
                        <InfoBlock
                            label="Валюта"
                            value={
                                <Row>
                                    <Icon src={payout?.targetCurrency?.paymentSystem.imagePath} />
                                    <div>{payout?.targetCurrency?.currencyCode.code}</div>
                                </Row>
                            }
                        />
                    </StyledBlock>

                    <StyledLine />

                    <StyledBlock>
                        <Headline4>О клиенте</Headline4>
                        {payout?.user?.firstname && (
                            <InfoBlock label="Имя" value={payout?.user?.firstname} hasCopyButton />
                        )}
                        {payout?.user?.lastname && (
                            <InfoBlock label="Фамилия" value={payout?.user?.lastname} hasCopyButton />
                        )}
                        <InfoBlock label="E-mail" value={payout?.email} hasCopyButton />
                        <InfoBlock label="IP" value={payout?.ipAddress} hasCopyButton />
                    </StyledBlock>
                </StyledTwoBlocks>

                <StyledTextField
                    label="Введите реквизиты для оплаты заявки"
                    value={exchangeRequisites}
                    onChange={(e) => setExchangeRequisites(e.target.value)}
                />

                <StyledSaveButton onClick={handleSumbitRequisites}>Сохранить</StyledSaveButton>
            </StyledRoot>
        </>
    );
};
