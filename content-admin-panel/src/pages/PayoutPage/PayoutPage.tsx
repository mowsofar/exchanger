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
} from './PayoutPage.styled';
import { ROUTES } from '../../constants/routes';
import { Breadcrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
import { useNavigate } from 'react-router-dom';
import { getPayoutControls, getPayoutData } from '../../utils/getPayoutData';
import { useStore } from '@nanostores/react';
import { $selectedPayout } from '../../stores/payout.store';
import { usePayoutPage } from './PayoutPage.hooks';
import { InfoBlock } from '../../components/InfoBlock/InfoBlock';
import { $currencyList } from '../../stores/currency.store';

export const PayoutPage: React.FC = () => {
    const { editPayoutStatus } = usePayoutPage();

    const payout = useStore($selectedPayout);
    const currencies = useStore($currencyList);

    const sourceCurrency = currencies.find((currency) => currency.id === payout?.srcCurrency);
    const targetCurrency = currencies.find((currency) => currency.id === payout?.targetCurrency);

    const courseTitle = `Курс: 1 ${sourceCurrency?.currencyCode.code} = ${payout?.course} ${targetCurrency?.currencyCode.code}`;

    const controls = getPayoutControls(payout?.status);

    return (
        <StyledRoot>
            <Headline3>Информация о заявке №{payout?.id}</Headline3>
            {payout?.status && (
                <StyledBadge
                    size="l"
                    text={getPayoutData(payout?.status).label}
                    view={getPayoutData(payout?.status).view}
                />
            )}

            <Course>{courseTitle}</Course>

            <StyledTwoBlocks>
                <StyledBlock>
                    <Headline4>О клиенте</Headline4>
                    <InfoBlock label="Имя" value={payout?.user.firstname} />
                    <InfoBlock label="Фамилия" value={payout?.user.lastname} />
                    <InfoBlock label="E-mail" value={payout?.email} />
                    <InfoBlock label="IP" value={payout?.ipAddress} />
                </StyledBlock>

                <StyledLine />

                <StyledBlock>
                    <Headline4>Детали</Headline4>
                    <InfoBlock label="Отдаёт клиент" value={payout?.amountFrom} />
                    <InfoBlock
                        label="Валюта"
                        value={
                            <Row>
                                <Icon src={sourceCurrency?.paymentSystem.imagePath} />
                                <div>{sourceCurrency?.currencyCode.code}</div>
                            </Row>
                        }
                    />
                    <InfoBlock label="Переводит сервис" value={payout?.amountTo} />
                    <InfoBlock
                        label="Валюта"
                        value={
                            <Row>
                                <Icon src={targetCurrency?.paymentSystem.imagePath} />
                                <div>{targetCurrency?.currencyCode.code}</div>
                            </Row>
                        }
                    />
                </StyledBlock>
            </StyledTwoBlocks>

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
        </StyledRoot>
    );
};
