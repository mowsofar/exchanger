import { PayoutStatus } from "../api/types/common";

type ViewType = "primary" | "accent" | "negative" | "positive" | "default" | "warning" | "dark" | "light" | undefined;

type ButtonViewType = "accent" | "success" | 'critical' | undefined;


export function getPayoutData(payout: PayoutStatus): { label: string, view: ViewType} {
    switch (payout) {
        case 'CREATED': {
            return { label: 'Создана', view: 'accent' };
        }
        case 'WAITING_FOR_CLIENT_PAYMENT': 
            return { label: 'Ожидается оплата', view: 'accent' };

        case 'WAITING_FOR_OPERATOR_PROCESSING': 
            return { label: 'Ожидает обработки', view: 'accent' };

        case 'ERROR':
            return { label: 'Отклонена', view: 'negative' };

        case 'COMPLETED': 
            return { label: 'Завершна', view: 'positive' }

        default:
            return { label: '', view: 'primary' };
    }
}

export function getPayoutControls(payout: PayoutStatus | undefined): { label: string, value: PayoutStatus, view?: ButtonViewType}[]  {
    if (!payout) {
        return [];
    }

    switch (payout) {
        case 'CREATED': 
            return [{ label: 'Перевести в "Ожидает оплаты"', value: 'WAITING_FOR_CLIENT_PAYMENT'}];
        case 'WAITING_FOR_CLIENT_PAYMENT': 
            return [{ label: 'Взять в работу', value: 'WAITING_FOR_OPERATOR_PROCESSING' }];
        case 'WAITING_FOR_OPERATOR_PROCESSING': 
            return [{ label: 'Выполнить', value: 'COMPLETED', view: 'success' }, { label: 'Отклонить', value: 'ERROR', view: 'critical'}];
        default:
            return [];
    }
}