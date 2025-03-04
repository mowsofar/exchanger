import React from 'react';
import { Breadcrumbs } from '../BreadCrumbs/BreadCrumbs';
import {
    Row,
    StyledAmount,
    StyledButton,
    StyledButtonBack,
    StyledContent,
    StyledDescription,
    StyledHeader,
    StyledLayout,
    StyledText,
} from './PayoutPayment.styled';
import { useStore } from '@nanostores/react';
import { $amountFrom, $sourceCurrency } from '../../stores/currencies.store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { IconChevronLeft } from '@salutejs/plasma-icons';
import { $payout } from '../../stores/payout.store';
import { setPayoutStatus } from '../../api/handlers';

export const PayoutPayment: React.FC = () => {
    const amountFrom = useStore($amountFrom);
    const sourceCurrency = useStore($sourceCurrency);
    const payout = useStore($payout);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(ROUTES.userDetails);
    };

    const handleForward = () => {
        navigate(ROUTES.payoutStatus);

        if (payout?.id) {
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

                <StyledAmount>
                    <div>Сумма</div>
                    <div>
                        {amountFrom.toLocaleString().replace(/,/g, ' ')} {sourceCurrency?.currencyCode.code || ''}
                    </div>
                </StyledAmount>

                <StyledDescription>
                    Время на оплату заявки до 10 минут. Мы не принимаем платежи от юридических лиц. Заявки оплаченные от
                    юр. лиц не будут исполнены. Переводы со счета сим карт и других платежных систем так же не будут
                    засчитаны в пользу оплаты. Средства поступят в течение 24 часов. Статус заявки можете отследить
                    через личный кабинет. По всем вопросам обращайтесь в техническую поддержку.
                </StyledDescription>

                <StyledButton onClick={handleForward}>Я оплатил</StyledButton>
            </StyledContent>
        </StyledLayout>
    );
};
