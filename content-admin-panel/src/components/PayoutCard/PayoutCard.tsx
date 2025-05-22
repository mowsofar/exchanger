import React from 'react';
import { Payout, PayoutStatus } from '../../api/types/common';
import { getPayoutControls, getPayoutData, getPayoutPaymentLabel } from '../../utils/getPayoutData';
import { IconDone } from '@salutejs/plasma-icons';
import { formatCalculatorInput } from '../../utils/formatNumber';
import { InfoBlock, InfoBlockCurrency } from '../InfoBlock/InfoBlock';
import {
    Column,
    ExchangeAmount,
    InfoBlockColumn,
    InfoText,
    StatusLabel,
    StyledBadge,
    StyledBill,
    StyledButtons,
    StyledRoot,
    StyledSaveButton,
    SubmitButton,
    TextArea,
    Title,
} from './PayoutCard.styled';

interface Props {
    payout: Payout;
    setPayoutRequisites: (id: number, requisites: string) => void;
    editPayoutStatus: (id: number, status: PayoutStatus) => Promise<void>;
    verifyRequisites: (requisites: string) => Promise<void>;
}

export const PayoutCard: React.FC<Props> = ({ payout, setPayoutRequisites, editPayoutStatus, verifyRequisites }) => {
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

    const handleVerifyRequisites = () => {
        if (payout?.cardDtoResponse?.number) {
            verifyRequisites(payout.cardDtoResponse.number);
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

                <TextArea
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

                {!Boolean(payout?.cardDtoResponse?.isApproved) && payout?.srcCurrency?.filterType === 'RUB' && (
                    <StyledButtons>
                        <StyledSaveButton view="warning" onClick={handleVerifyRequisites}>
                            Верифицировать
                        </StyledSaveButton>

                        <ExchangeAmount>
                            Кол-во обменов: <span>{payout?.cardDtoResponse?.payoutIds?.length ?? 1}</span>
                        </ExchangeAmount>
                    </StyledButtons>
                )}

                {Boolean(payout?.cardDtoResponse?.isApproved) && payout?.srcCurrency?.filterType === 'RUB' && (
                    <StyledButtons>
                        <StyledSaveButton view="success">Верифицирован</StyledSaveButton>

                        <ExchangeAmount>
                            Кол-во обменов: <span>{payout?.cardDtoResponse?.payoutIds?.length ?? 1}</span>
                        </ExchangeAmount>
                    </StyledButtons>
                )}
            </Column>

            <Column>
                <InfoBlockColumn>
                    <InfoBlockCurrency
                        label="Отдаёт клиент"
                        currency={payout?.srcCurrency}
                        value={formatCalculatorInput(payout?.amountFrom)}
                        hasCopyButton
                    />

                    {payout?.sourceAdditionalFields?.map((field) => (
                        <InfoBlock label={field?.fieldName} value={field?.userValue} hasCopyButton />
                    ))}
                </InfoBlockColumn>
            </Column>

            <Column>
                <InfoBlockColumn>
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
                </InfoBlockColumn>
            </Column>

            <Column>
                <InfoBlockColumn>
                    <InfoBlock label="E-mail" value={payout?.email} hasCopyButton />
                    <InfoBlock label="IP" value={payout?.ipAddress} hasCopyButton />
                </InfoBlockColumn>

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
