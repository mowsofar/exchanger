import React from 'react';
import { accent, success, surfaceSolid03, whitePrimary } from '@salutejs/plasma-tokens';
import styled, { css, CSSProperties } from 'styled-components';
import { Payout, PayoutStatus } from '../../api/types/common';
import { Badge, Button } from '@salutejs/plasma-web';
import { getPayoutControls, getPayoutData, getPayoutPaymentLabel } from '../../utils/getPayoutData';
import { IconDone } from '@salutejs/plasma-icons';
import { formatCalculatorInput } from '../../utils/formatNumber';
import { InfoBlock, InfoBlockCurrency } from '../InfoBlock/InfoBlock';
import { TextFieldGrey } from '../TextField/TextField';
import { Button as ButtonBase } from '../Button/Button.styled';

const StyledRoot = styled.div`
    position: relative;
    background-color: ${whitePrimary};
    border-radius: 20px;
    column-gap: 10px;
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
    margin: 10px 0;
    box-shadow: 0px 0px 11px 4px rgba(0, 0, 0, 0.1);
    font-size: 14px;
`;

const Column = styled.div`
    flex: 1;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &:not(:last-child) {
        border-right: 1px solid ${surfaceSolid03};
    }
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const StyledBadge = styled(Badge)`
    border-radius: 15px;
    height: 30px;
    font-weight: 600;
    font-size: 14px !important;
    padding: 0px 15px;
`;

const InfoText = styled.div`
    display: flex;
    column-gap: 10px;
    font-weight: 600;
    font-size: 14px;

    & div:nth-child(1) {
        color: ${accent};
    }
`;

export const StatusLabel = styled.div<{ backgroundColor: CSSProperties['backgroundColor'] }>`
    position: absolute;
    top: -28px;
    right: 50px;
    padding: 6px 25px;
    border-radius: 10px 10px 0 0;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    background-color: ${success};
    cursor: pointer;

    ${({ backgroundColor }) =>
        backgroundColor &&
        css`
            background-color: ${backgroundColor};
        `}

    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

export const Row = styled.div`
    display: flex;
    column-gap: 5px;
    align-items: center;

    & div {
        font-weight: 500;
    }
`;

const StyledTextField = styled(TextFieldGrey)`
    width: 320px;
    font-size: 15px;
    margin-top: auto;

    > div:first-child > div {
        font-size: 13px !important;
    }

    > div:last-child {
        height: 60px;
        border-radius: 13px;
    }
`;

const SubmitButton = styled(Button)`
    height: 33px;
    padding: 5px 5px;

    span {
        min-width: 20px;
        width: 30px;
    }
`;

const StyledBill = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    & a {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const StyledButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: auto;
`;

export const StyledSaveButton = styled(ButtonBase)`
    height: 25px !important;
    padding: 14px 10px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
`;

interface Props {
    payout: Payout;
    setPayoutRequisites: (id: number, requisites: string) => void;
    editPayoutStatus: (id: number, status: PayoutStatus) => Promise<void>;
}

export const PayoutCard: React.FC<Props> = ({ payout, setPayoutRequisites, editPayoutStatus }) => {
    const [exchangeRequisites, setExchangeRequisites] = React.useState(payout.exchangeRequisites);
    const paymentLabel = getPayoutPaymentLabel(payout?.status);

    const createdAt = new Date(payout.createdAt).toLocaleString();

    const controls = getPayoutControls(payout?.status);

    const courseTitle = `1 ${payout?.srcCurrency?.currencyCode.code} = ${formatCalculatorInput(payout?.course)} ${payout
        ?.targetCurrency?.currencyCode.code}`;

    const handleSumbitRequisites = () => {
        if (exchangeRequisites && payout?.id) {
            setPayoutRequisites(payout.id, exchangeRequisites);
        }
    };

    return (
        <StyledRoot>
            {paymentLabel && (
                <StatusLabel
                    backgroundColor={paymentLabel?.color}
                    onClick={() => {
                        if (payout?.id && paymentLabel?.value) {
                            editPayoutStatus(payout?.id, paymentLabel?.value as PayoutStatus);
                        }
                    }}
                >
                    {paymentLabel?.label}
                </StatusLabel>
            )}
            <Column>
                <Title>
                    <span>№{payout.id} </span>
                </Title>

                <StyledBadge text={getPayoutData(payout.status).label} view={getPayoutData(payout.status).view} />

                <InfoText>
                    <div>Курс:</div>
                    <div>{courseTitle}</div>
                </InfoText>

                <InfoText>
                    <div>Дата создания:</div>
                    <div>от {createdAt}</div>
                </InfoText>

                <StyledTextField
                    label="Реквизиты для оплаты заявки"
                    value={exchangeRequisites}
                    onChange={(e) => setExchangeRequisites(e.target.value)}
                    contentRight={
                        <SubmitButton
                            view={payout.exchangeRequisites ? 'success' : 'black'}
                            onClick={handleSumbitRequisites}
                        >
                            <IconDone color="white" />
                        </SubmitButton>
                    }
                />
            </Column>

            <Column>
                <InfoBlockCurrency
                    label="Отдаёт клиент"
                    currency={payout?.srcCurrency}
                    value={formatCalculatorInput(payout?.amountFrom)}
                    hasCopyButton
                />

                {payout?.sourceAdditionalFields?.map((field) => (
                    <InfoBlock label={field?.fieldName} value={field?.userValue} hasCopyButton />
                ))}
            </Column>

            <Column>
                <InfoBlockCurrency
                    label="Переводит сервис"
                    currency={payout?.targetCurrency}
                    value={formatCalculatorInput(payout?.amountTo)}
                    hasCopyButton
                />

                <InfoBlock label="Номер счёта клиента" value={payout?.requisites} hasCopyButton />

                {payout?.targetAdditionalFields?.map((field) => (
                    <InfoBlock label={field?.fieldName} value={field?.userValue} hasCopyButton />
                ))}
            </Column>

            <Column>
                <InfoBlock label="E-mail" value={payout?.email} hasCopyButton />
                <InfoBlock label="IP" value={payout?.ipAddress} hasCopyButton />

                {payout?.attachments?.length ? (
                    <StyledBill>
                        <div style={{ fontWeight: 600 }}>Чек об оплате заявки: </div>
                        {payout?.attachments.map((attachment) => (
                            <a href={attachment.fileUrl} target="_blank" rel="noopener noreferrer">
                                {attachment.fileName}
                            </a>
                        ))}
                    </StyledBill>
                ) : null}

                <StyledButtons>
                    {controls.map((control) => {
                        return (
                            <StyledSaveButton
                                size="m"
                                view={control.view || 'accent'}
                                text={control.label}
                                onClick={() => {
                                    if (payout?.id && control.value) {
                                        editPayoutStatus(payout?.id, control.value);
                                    }
                                }}
                            />
                        );
                    })}
                </StyledButtons>
            </Column>
        </StyledRoot>
    );
};
