export const PAYOUTS_PER_PAGE = 20;

export const DIRECTIONS_PER_PAGE = 20;

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

export type AdditionalFieldDirections = 'TARGET' | 'SOURCE';

export interface AdditionalFieldDirection {
    id: number;
    direction: AdditionalFieldDirections;
    fieldName: string;
    status: AdditionalFieldStatus;
    nameIdentify: string;
    currencies: {
        id: number;
        technicalName: string;
    }[];
};

export interface AdditionalFields {
    source: AdditionalFieldDirection[];
    target: AdditionalFieldDirection[];
};

export interface PayoutAdditionalField {
    fieldId: number,
    fieldName: string,
    userValue: string,
    nameIdentify: string,
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
    additionalFieldsList: AdditionalFields;
    updatedAt: string;
    sort: number;
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

export const ExchangeDirectionsStatusValues = [
    { value: 'ACTIVE', label: 'Активное направление' },
    { value: 'INACTIVE', label: 'Не активное направление' },
    { value: 'ARCHIVED', label: 'Архивное направление' },
];

export type PayoutStatus = 'CREATED' | 'WAITING_FOR_REQUISITES' | 'WAITING_FOR_CLIENT_PAYMENT' | 'PAYMENT_RECEIVED' | 'WAITING_FOR_OPERATOR_PROCESSING' | 'CANCELLED' | 'ERROR' | 'COMPLETED';

export const AdditionalFieldTypeValues: Array<{value: string; label: string}> = [
    { value: '', label: 'Все поля' },
    { value: 'ACTIVE', label: 'Активные' },
    { value: 'INACTIVE', label: 'Не активные' },
];

export type StatusType = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

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
    sourceAdditionalFields: PayoutAdditionalField[];
    targetAdditionalFields: PayoutAdditionalField[];
    previousPayoutIds: number[];
    requisitesVerified: boolean;
    cardDtoResponse: {
        number: string;
        fio: string;
        isApproved: boolean;
        payoutIds: number[];
    }
};

export interface getPayoutsResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Payout[];
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface ExchangeDirection {
    id: number;
    sourceCurrency: Currency;
    targetCurrency: Currency;
    profitPercent:	number;
    status:	StatusType;
    minSourceAmount: number;
    maxSourceAmount: number;
    reserves: number;
    updatedAt: string;
    currentRate: number;
    course: number;
};

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    referralCode: string;
    balance: number;
    payouts: Payout[];
}

export interface Requisites {
    id: number;
    name: string;
    details: string;
    currencies: Currency[];
}

export interface ProfitUpdatePayload {
    ids: number[];
    newProfit: number;
}

export interface MinMaxAmountPayload {
    ids: number[];
    minSourceAmount: number;
    maxSourceAmount: number;
}

export interface StatusUpdatePayload {
    ids: number[];
    newStatus: StatusType;
}