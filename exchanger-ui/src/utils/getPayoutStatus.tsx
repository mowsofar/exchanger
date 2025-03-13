import { Payout } from '../api/types/common';

export function getPayoutStatus(payout: Payout | null) {
    if (!payout) return 'Заявка не найдена';

    switch (payout.status) {
        case 'CREATED':
            return (
                <div>
                    Заявка <span>№{payout.id}</span> создана
                </div>
            );
        case 'COMPLETED':
            return (
                <div>
                    Заявка <span>№{payout.id}</span> завершена
                </div>
            );
        case 'WAITING_FOR_CLIENT_PAYMENT':
            return (
                <div>
                    Заявка <span>№{payout.id}</span> ожидает оплаты
                </div>
            );

        case 'PAYMENT_RECEIVED':
            return (
                <div>
                    Оплата по заявке <span>№{payout.id}</span> получена
                </div>
            );
        case 'WAITING_FOR_OPERATOR_PROCESSING':
            return (
                <div>
                    Заявка <span>№{payout.id}</span> ожидает обработки
                </div>
            );

        case 'CANCELLED':
            return (
                <div>
                    Заявка <span>№{payout.id}</span> отклонена. Причина: оплата не поступила.
                </div>
            );

        case 'ERROR':
            return (
                <div>
                    Ошибка создания заявки <span>№{payout.id}</span>.
                </div>
            );
        default:
            return '';
    }
}
