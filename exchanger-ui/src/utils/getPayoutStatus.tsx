import { Payout, PayoutStatus } from '../api/types/common';

export function getPayoutStatus(payout: Payout | null) {
    if (!payout) return 'Заявка не найдена';

    switch (payout.status) {
        case 'CREATED':
            return (
                <div>
                    Заявка <span>№{payout.id}</span> успешно создана
                </div>
            );
        case 'COMPLETED':
            return (
                <div>
                    Заявка <span>№{payout.id}</span> завершена
                </div>
            );
        case 'WAITING_FOR_REQUISITES':
            return (
                <div>
                    Заявка <span>№{payout.id}</span> ожидает получения ревизитов
                </div>
            );
        case 'WAITING_FOR_CLIENT_PAYMENT':
            return (
                <div>
                    Заявка <span>№{payout.id}</span>. Проверка поступления средств
                </div>
            );

        case 'PAYMENT_RECEIVED':
            return (
                <div>
                    Заявка <span>№{payout.id}</span>. Оплата подтверждена. Осуществляется выплата
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
    if (!payout) return '';

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
            return (
                <div>
                    После отправки средства не всегда поступают мгновенно. Зачисление средств на ваш счёт может занять
                    некоторое время. Операция занимает от 5 до 20 минут.
                </div>
            );

        case 'PAYMENT_RECEIVED':
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

export function getPayoutData(payout: PayoutStatus): { label: string; color: string } {
    switch (payout) {
        case 'CREATED': {
            return { label: 'Создана', color: '#18181a' };
        }

        case 'WAITING_FOR_CLIENT_PAYMENT':
            return { label: 'Проверка оплаты', color: '#18181a' };

        case 'WAITING_FOR_REQUISITES':
            return { label: 'Ожидает реквизиты', color: '#18181a' };

        case 'PAYMENT_RECEIVED':
            return { label: 'Оплата получена', color: '#18181a' };

        case 'WAITING_FOR_OPERATOR_PROCESSING':
            return { label: 'В обработке', color: '#18181a' };

        case 'ERROR':
            return { label: 'Ошибка', color: '#a4232f' };

        case 'CANCELLED':
            return { label: 'Отклонена', color: '#a4232f' };

        case 'COMPLETED':
            return { label: 'Завершена', color: '#458c34' };

        default:
            return { label: '', color: '#18181a' };
    }
}
