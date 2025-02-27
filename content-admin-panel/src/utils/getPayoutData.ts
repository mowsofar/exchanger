import { PayoutStatus } from "../api/types/common";

type ViewType = "primary" | "accent" | "negative" | "positive" | "default" | "warning" | "dark" | "light" | undefined;

export function getPayoutData(payout: PayoutStatus): { label: string, view: ViewType} {
    switch (payout) {
        case 'CREATED': {
            return { label: 'Создана', view: 'primary' };
        }
        case 'WAITING_FOR_CLIENT_PAYMENT': 
            return { label: 'Ожидается оплата', view: 'accent' };

        case 'WAITING_FOR_OPERATOR_PROCESSING': 
            return { label: 'Ожидает обработки', view: 'accent' };

        case 'ERROR':
            return { label: 'Ошибка', view: 'negative' };

        case 'COMPLETED': 
            return { label: 'Завершно', view: 'positive' }

        default:
            return { label: '', view: 'primary' };
    }
}