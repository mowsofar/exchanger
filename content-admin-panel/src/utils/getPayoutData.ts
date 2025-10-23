import { success, warning } from '@salutejs/plasma-tokens/colors/values';
import { PayoutStatus } from '../api/types/common';

type ViewType = 'primary' | 'accent' | 'negative' | 'positive' | 'default' | 'warning' | 'dark' | 'light' | undefined;

type ButtonViewType = 'accent' | 'success' | 'critical' | undefined;

export function getPayoutPaymentLabel(status: PayoutStatus) {
    if (status === 'PAYMENT_RECEIVED') {
        return { label: 'Оплачено!', color: success };
    }

    if (status === 'CREATED' || status === 'WAITING_FOR_CLIENT_PAYMENT' || status === 'WAITING_FOR_REQUISITES') {
        return { label: 'Отметить как оплачено', color: warning, value: 'PAYMENT_RECEIVED' };
    }
}

export function getPayoutData(status: PayoutStatus): { label: string; view: ViewType } {
    switch (status) {
        case 'CREATED': {
            return { label: 'Создана', view: 'accent' };
        }
        case 'WAITING_FOR_REQUISITES': {
            return { label: 'Ожидает реквизиты', view: 'warning' };
        }
        case 'WAITING_FOR_CLIENT_PAYMENT':
            return { label: 'Проверка поступления средств', view: 'warning' };

        case 'PAYMENT_RECEIVED':
            return { label: 'В обработке', view: 'accent' };

        case 'WAITING_FOR_OPERATOR_PROCESSING':
            return { label: 'В обработке', view: 'accent' };

        case 'ERROR':
            return { label: 'Ошибка', view: 'negative' };

        case 'CANCELLED':
            return { label: 'Отклонена', view: 'negative' };

        case 'COMPLETED':
            return { label: 'Завершена', view: 'positive' };

        case 'REFERRAL_PAY':
            return { label: 'Реферальная выплата', view: 'accent' };

        default:
            return { label: '', view: 'primary' };
    }
}

export function getPayoutControls(
    payout: PayoutStatus | undefined,
): { label: string; value: PayoutStatus | ''; view?: ButtonViewType }[] {
    if (!payout) {
        return [];
    }

    switch (payout) {
        case 'CREATED':
            return [
                { label: 'Обработать', value: 'COMPLETED', view: 'success' },
                { label: 'Отклонить', value: 'CANCELLED', view: 'critical' },
                { label: 'В ошибочные', value: 'ERROR', view: 'critical' },
            ];
        case 'WAITING_FOR_REQUISITES':
            return [
                { label: 'Обработать', value: 'COMPLETED', view: 'success' },
                { label: 'Отклонить', value: 'CANCELLED', view: 'critical' },
                { label: 'В ошибочные', value: 'ERROR', view: 'critical' },
            ];
        case 'WAITING_FOR_CLIENT_PAYMENT':
            return [
                { label: 'Обработать', value: 'COMPLETED', view: 'success' },
                { label: 'Отклонить', value: 'CANCELLED', view: 'critical' },
                { label: 'В ошибочные', value: 'ERROR', view: 'critical' },
            ];
        case 'REFERRAL_PAY':
        case 'PAYMENT_RECEIVED':
            return [
                { label: 'Обработать', value: 'COMPLETED', view: 'success' },
                { label: 'Отклонить', value: 'CANCELLED', view: 'critical' },
                { label: 'В ошибочные', value: 'ERROR', view: 'critical' },
            ];
        case 'CANCELLED':
            return [{ label: 'Восстановить в обработку', value: 'PAYMENT_RECEIVED' }];
        case 'ERROR':
            return [{ label: 'Восстановить в обработку', value: 'PAYMENT_RECEIVED' }];
        default:
            return [];
    }
}
