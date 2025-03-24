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
                    Заявка <span>№{payout.id}</span>. Оплата подтверждена
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
                    Заявка <span>№{payout.id}</span> отклонена. Причина: оплата не поступила
                </div>
            );

        case 'ERROR':
            return (
                <div>
                    Ошибка создания заявки <span>№{payout.id}</span>
                </div>
            );
        default:
            return '';
    }
}

export function getPayoutStatusDescription(payout: Payout | null) {
    if (!payout) return 'Заявка не найдена';

    switch (payout.status) {
        case 'COMPLETED':
            return (
                <div>
                    Уважаемый клиент, ваша заявка обработана, зачисление транзакции на кошелёк составляет от 5-30 мин в
                    среднем, а зачисление на банковскую карту моментально. Отследить статус вашей заявки можно в личном
                    кабинете.
                </div>
            );
        case 'WAITING_FOR_CLIENT_PAYMENT':
            return <div>Заявка ожидает оплаты.</div>;

        case 'PAYMENT_RECEIVED':
            return <div>В течение 15-30 минут ваша заявка будет обработана.</div>;
        case 'WAITING_FOR_OPERATOR_PROCESSING':
            return <div>В течение 15-30 минут ваша заявка будет обработана.</div>;

        case 'CANCELLED':
            return (
                <div>
                    Оплата не поступила. Если Вы уверены, что оплатили заявку, но её удалили, обратитесь, пожалуйста, в
                    чат.
                </div>
            );

        case 'ERROR':
            return (
                <div>
                    В ходе создания заявки произошла ошибка. Если Вы уверены, что оплатили заявку, но её удалили,
                    обратитесь, пожалуйста, в чат.
                </div>
            );
        default:
            return '';
    }
}
