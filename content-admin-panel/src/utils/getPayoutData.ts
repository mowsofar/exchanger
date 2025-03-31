import { PayoutStatus } from "../api/types/common";

type ViewType = "primary" | "accent" | "negative" | "positive" | "default" | "warning" | "dark" | "light" | undefined;

type ButtonViewType = "accent" | "success" | 'critical' | undefined;


export function getPayoutData(payout: PayoutStatus): { label: string, view: ViewType} {
    switch (payout) {
        case 'CREATED': {
            return { label: 'Создана', view: 'accent' };
        }
        case 'WAITING_FOR_CLIENT_PAYMENT': 
            return { label: 'Проверка поступления средств', view: 'warning' };

        case 'PAYMENT_RECEIVED':
                return { label: 'Оплачена и ожидает обработки', view: 'warning' };

        case 'WAITING_FOR_OPERATOR_PROCESSING': 
            return { label: 'В обработке', view: 'accent' };

        case 'ERROR':
            return { label: 'Ошибка', view: 'negative' };

        case 'CANCELLED':
            return { label: 'Отклонена', view: 'negative' };

        case 'COMPLETED': 
            return { label: 'Завершена', view: 'positive' }

        default:
            return { label: '', view: 'primary' };
    }
}

export function getPayoutControls(payout: PayoutStatus | undefined): { label: string, value: PayoutStatus | '', view?: ButtonViewType}[]  {
    if (!payout) {
        return [];
    }

    switch (payout) {
        case 'CREATED': 
            return [{ label: 'Отметить как оплачено', value: 'PAYMENT_RECEIVED'}];
        case 'WAITING_FOR_CLIENT_PAYMENT': 
            return [{ label: 'Отметить как оплачено', value: 'PAYMENT_RECEIVED'}];
        case 'PAYMENT_RECEIVED': 
            return [{ label: 'Взять в обработку', value: 'WAITING_FOR_OPERATOR_PROCESSING'}];
        case 'WAITING_FOR_OPERATOR_PROCESSING': 
            return [{ label: 'Обработать', value: 'COMPLETED', view: 'success' }, { label: 'Отклонить', value: 'CANCELLED', view: 'critical'}, { label: 'В ошибочные', value: 'ERROR', view: 'critical'}];
        default:
            return [];
    }
}