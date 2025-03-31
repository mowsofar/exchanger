import { Headline3, Headline4, Headline5 } from '@salutejs/plasma-web';
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
    StyledBill,
} from './PayoutPage.styled';
import { getPayoutControls, getPayoutData } from '../../utils/getPayoutData';
import { useStore } from '@nanostores/react';
import { $selectedPayout } from '../../stores/payout.store';
import { usePayoutPage } from './PayoutPage.hooks';
import { InfoBlock } from '../../components/InfoBlock/InfoBlock';
import { Link } from 'react-router-dom';
import { formatCalculatorInput } from '../../utils/formatNumber';

export const PayoutPage: React.FC = () => {
    const { editPayoutStatus, setPayoutRequisites } = usePayoutPage();

    const payout = useStore($selectedPayout);

    const [exchangeRequisites, setExchangeRequisites] = React.useState('');

    const courseTitle = `Курс: 1 ${payout?.srcCurrency?.currencyCode.code} = ${formatCalculatorInput(
        payout?.course,
    )} ${payout?.targetCurrency?.currencyCode.code}`;

    const controls = getPayoutControls(payout?.status);

    const handleSumbitRequisites = () => {
        if (exchangeRequisites && payout?.id) {
            setPayoutRequisites(payout.id, exchangeRequisites);
        }
    };

    React.useEffect(() => {
        if (payout) {
            setExchangeRequisites(payout.exchangeRequisites || '');
        }
    }, [payout]);

    return (
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
                                if (payout?.id && control.value) {
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
                    <Headline4>О клиенте</Headline4>
                    <InfoBlock label="Реквизиты" value={payout?.requisites} hasCopyButton />
                    {payout?.user?.firstname && <InfoBlock label="Имя" value={payout?.user?.firstname} hasCopyButton />}
                    {payout?.user?.lastname && (
                        <InfoBlock label="Фамилия" value={payout?.user?.lastname} hasCopyButton />
                    )}
                    <InfoBlock label="E-mail" value={payout?.email || payout?.user?.email} hasCopyButton />
                    <InfoBlock label="IP" value={payout?.ipAddress} hasCopyButton />

                    {payout?.sourceAdditionalFields.map((field) => (
                        <InfoBlock label={field?.fieldName} value={field?.userValue} hasCopyButton />
                    ))}

                    {payout?.targetAdditionalFields.map((field) => (
                        <InfoBlock label={field?.fieldName} value={field?.userValue} hasCopyButton />
                    ))}
                </StyledBlock>

                <StyledLine />

                <StyledBlock>
                    <Headline4>Детали</Headline4>
                    <InfoBlock label="Отдаёт клиент" value={formatCalculatorInput(payout?.amountFrom)} hasCopyButton />
                    <InfoBlock
                        label="Валюта"
                        value={
                            <Row>
                                <Icon src={payout?.srcCurrency?.paymentSystem.imagePath} />
                                <div>{payout?.srcCurrency?.currencyCode.code}</div>
                            </Row>
                        }
                    />
                    <InfoBlock label="Переводит сервис" value={formatCalculatorInput(payout?.amountTo)} hasCopyButton />
                    <InfoBlock
                        label="Валюта"
                        value={
                            <Row>
                                <Icon src={payout?.targetCurrency?.paymentSystem.imagePath} />
                                <div>{payout?.targetCurrency?.currencyCode.code}</div>
                            </Row>
                        }
                    />

                    {payout?.attachments?.length ? (
                        <StyledBill>
                            <Headline5>Чек об оплате заявки: </Headline5>
                            {payout?.attachments.map((attachment) => (
                                <Link to={attachment.fileUrl}>{attachment.fileName}</Link>
                            ))}
                        </StyledBill>
                    ) : null}

                    <StyledTextField
                        label="Введите реквизиты для оплаты заявки"
                        placeholder="Введите реквизиты"
                        value={exchangeRequisites}
                        onChange={(e) => setExchangeRequisites(e.target.value)}
                    />

                    <StyledSaveButton onClick={handleSumbitRequisites}>Сохранить</StyledSaveButton>
                </StyledBlock>
            </StyledTwoBlocks>
        </StyledRoot>
    );
};
