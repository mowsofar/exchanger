export interface LoginData {
    access_token: string;
    refresh_token: string;
    role: string;
};

export interface CurrencyCode {
    id: number;
    code: string;
    symbol: string;
    updatedAt: string;
};

export interface PaymentSystem {
    id: number;
    name: string;
    imagePath: string;
    updatedAt: string;
};

type AdditionalFieldStatus = 'ACTIVE' | 'INACTIVE';

export interface AdditionalField {
    id: number;
    fieldName: string;
    keyId: string;
    status: AdditionalFieldStatus;
    currencyIds: number[];
};

export interface Currency {
    id: number;
    paymentSystem: {
        id:	number;
        name: string;
        imagePath: string;
    }
    currencyCode: {
        id: number;
        code: string;
        symbol: string;
    }
    status: string;
    technicalName: string;
    xmlCode: string;
    decimalPlaces: number;
    filterType: string;
    received: number;
    sent: number;
    accountName: string;
    accountComment: string;
    additionalFieldsList: AdditionalField[];
    updatedAt: string;
};

export const CurrencyStatusValues = [
    { value: 'ACTIVE', label: 'Активная валюта' },
    { value: 'INACTIVE', label: 'Не активная валюта' },
    { value: 'ARCHIVE', label: 'Архивная валюта' },
];

export const FilterTypeValues = [
    { value: 'RUB', label: 'Руб' },
    { value: 'USDT', label: 'USDT' },
    { value: 'COIN', label: 'Coin' },
];

export type PayoutStatus = 'CREATED' | 'WAITING_FOR_CLIENT_PAYMENT' | 'PAYMENT_RECEIVED' | 'WAITING_FOR_OPERATOR_PROCESSING' | 'CANCELLED' | 'ERROR' | 'COMPLETED';

export const PayoutSelectStatusValues: Array<{value: string; label: string}> = [
    { value: '', label: 'Все заявки' },
    { value: 'CREATED', label: 'Созданные' },
    { value: 'WAITING_FOR_CLIENT_PAYMENT', label: 'Ожидают оплаты' },
    { value: 'PAYMENT_RECEIVED', label: 'Оплата получена' },
    { value: 'WAITING_FOR_OPERATOR_PROCESSING', label: 'Ожидают обработки' },
    { value: 'CANCELLED', label: 'Отклонённые' },
    { value: 'ERROR', label: 'Ошибка' },
    { value: 'COMPLETED', label: 'Завершённые' },
];

export type StatusType = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export const PayoutStatusValues = [
    { value: 'CREATED', label: 'Создана', view: 'primary' },
    { value: 'WAITING_FOR_CLIENT_PAYMENT', label: 'Ожидается оплата', view: 'accent' },
    { value: 'PAYMENT_RECEIVED', label: 'Оплата получена', view: 'accent' },
    { value: 'WAITING_FOR_OPERATOR_PROCESSING', label: 'Ожидает обработки', view: 'accent' },
    { value: 'CANCELLED', label: 'Отклонена', view: 'accent' },
    { value: 'ERROR', label: 'Ошибка', view: 'negative'},
    { value: 'COMPLETED', label: 'Завершна', view: 'positive' }
];

export interface UserForPayout {
    firstname: string;
    lastname: string;
    email: string;
    balance: number;
};

export interface PayoutAttachment {
    id: number;
    fileUrl: string;
    fileName: string;
    contentType: string;
    uploadedAt: string;
};
export interface Payout {
    id: number;
    srcCurrency: Currency;
    targetCurrency: Currency;
    amountFrom: number;
    amountTo: number;
    requisites: string;
    exchangeRequisites: string;
    course: number;
    status: PayoutStatus;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    email: string;
    user: UserForPayout;
    attachments: PayoutAttachment[];
};

export interface ExchangeDirection {
        id: number;
        sourceCurrency: Currency;
        targetCurrency: Currency;
        profitPercent:	number;
        status:	StatusType
        minSourceAmount: number;
        maxSourceAmount: number;
        reserves: number;
        updatedAt: string;
        currentRate: number;
};