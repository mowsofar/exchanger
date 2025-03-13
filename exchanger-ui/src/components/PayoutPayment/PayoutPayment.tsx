import React from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    Badge,
    ButtonCopy,
    Requisites,
    Row,
    StyledAmount,
    StyledButton,
    StyledButtonBack,
    StyledContent,
    StyledDescription,
    StyledHeader,
    StyledLayout,
    StyledSpinner,
    StyledText,
} from './PayoutPayment.styled';
import { useStore } from '@nanostores/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconChevronLeft, IconCopyFill } from '@salutejs/plasma-icons';
import { $payout } from '../../stores/payout.store';
import { setPayoutStatus } from '../../api/handlers';
import { Spinner } from '@salutejs/plasma-web';

export const PayoutPayment: React.FC = () => {
    const payout = useStore($payout);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(ROUTES.userDetails);
    };

    const handleForward = () => {
        navigate(ROUTES.payoutStatus(payout?.id));

        if (payout?.id && payout.status !== 'COMPLETED' && payout?.status !== 'ERROR') {
            setPayoutStatus(payout.id);
        }
    };

    return (
        <StyledLayout>
            <StyledContent>
                <Row>
                    <StyledButtonBack view="clear" onClick={handleBack}>
                        <IconChevronLeft size="s" color="white" />
                    </StyledButtonBack>

                    <Breadcrumbs
                        path={[
                            { number: 1, name: 'Ввод реквизитов', isActive: false },
                            { number: 2, name: 'Оплата заявки', isActive: true },
                            { number: 3, name: 'Завершение', isActive: false },
                        ]}
                    />
                </Row>

                <StyledText>Заявка №{payout?.id} успешно создана!</StyledText>

                <StyledHeader>Оплатите заявку</StyledHeader>

                <Requisites>
                    <div>Реквизиты для оплаты:</div>

                    {payout?.exchangeRequisites ? (
                        <Badge>
                            <div>{payout?.exchangeRequisites}</div>
                            <ButtonCopy
                                view="clear"
                                onClick={() => {
                                    navigator.clipboard.writeText(payout?.exchangeRequisites);
                                }}
                            >
                                <IconCopyFill color="white" />
                            </ButtonCopy>
                        </Badge>
                    ) : (
                        <>
                            <StyledSpinner>
                                <Spinner size="3rem" color="white" />
                            </StyledSpinner>
                            <StyledDescription>Реквизиты появятся здесь в течение 10 минут</StyledDescription>
                        </>
                    )}
                </Requisites>

                <StyledAmount>
                    <div>Сумма</div>
                    <div>
                        {payout?.amountFrom} {payout?.srcCurrency.currencyCode.code || ''}
                    </div>
                </StyledAmount>

                <StyledDescription>
                    Время на оплату заявки до 10 минут. Мы не принимаем платежи от юридических лиц. Заявки оплаченные от
                    юр. лиц не будут исполнены. Переводы со счета сим карт и других платежных систем так же не будут
                    засчитаны в пользу оплаты. Средства поступят в течение 24 часов.
                </StyledDescription>

                <StyledButton onClick={handleForward}>Я оплатил</StyledButton>
            </StyledContent>
        </StyledLayout>
    );
};
