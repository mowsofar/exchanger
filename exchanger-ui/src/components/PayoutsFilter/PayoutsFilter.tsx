import { useStore } from '@nanostores/react';
import { Checkbox } from '@salutejs/plasma-web';
import styled from 'styled-components';
import { $payoutFilter } from '../../stores/payout.store';
import { PayoutStatus } from '../../api/types/common';
import { getFilteredPayouts, getPayouts } from '../../api/handlers';
import { $userPayouts } from '../../stores/user.store';

export const PayoutStatusValues = [
    { value: '', label: 'Все' },
    { value: 'CREATED', label: 'Создана' },
    { value: 'WAITING_FOR_CLIENT_PAYMENT', label: 'Проверка оплаты' },
    { value: 'PAYMENT_RECEIVED', label: 'Оплата потверждена' },
    { value: 'WAITING_FOR_OPERATOR_PROCESSING', label: 'В обработке оператором' },
    { value: 'CANCELLED', label: 'Отклонена' },
    { value: 'ERROR', label: 'Ошибка' },
    { value: 'COMPLETED', label: 'Завершна' },
];

const Root = styled.div`
    width: 30rem;
    display: flex;
    flex-direction: column;
    row-gap: 2.5rem;
    font-size: 1.6rem;
    color: white;
`;

const Header = styled.div`
    font-size: 1.8rem;
    font-weight: 600;
`;

const StyledCheckbox = styled(Checkbox)`
    width: 30rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    & label > div:first-child {
        background: none !important;
        border-color: var(--accent) !important;
        width: 1.8rem;
        height: 1.8rem;
    }

    & svg > path {
        fill: var(--accent) !important;
    }
`;

export const PayoutsFilter = () => {
    const filter = useStore($payoutFilter);

    const handleClickFilter = async (status?: PayoutStatus) => {
        try {
            if (!status) {
                const payouts = await getPayouts();
                $userPayouts.set(payouts);
                $payoutFilter.set('');
                return;
            }

            $payoutFilter.set(status);
            const payouts = await getFilteredPayouts(status);
            $userPayouts.set(payouts);
        } catch (error) {}
    };

    return (
        <Root>
            <Header>Отфильтровать заявки по статусу:</Header>
            {PayoutStatusValues.map((payout) => (
                <StyledCheckbox
                    label={payout.label}
                    checked={payout.value === filter}
                    onClick={() => {
                        if (payout.value === filter) {
                            $payoutFilter.set('');
                            handleClickFilter();
                        } else {
                            handleClickFilter(payout?.value as PayoutStatus);
                        }
                    }}
                />
            ))}
        </Root>
    );
};
