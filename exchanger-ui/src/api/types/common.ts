export interface LoginData {
    access_token: string;
    refresh_token: string;
    role: string;
};

export interface TechStatusResponse {
    maintenance: boolean;
}

export type AdditionalFieldDirection = 'SOURCE' | 'TARGET';
export interface AdditionalField {
    id: number;
    fieldName: string;
    nameIdentify: string;
    direction: AdditionalFieldDirection;
    status: string;
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

export type CurrentCyrrencyType = 'target' | 'source' | '';

export interface Course {
    course: number;
    isReversed: boolean;
};

export type StatusType = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface ExchangeDirection {
    id: number;
    sourceCurrency: Currency;
    targetCurrency: Currency;
    profitPercent: number;
    status:	StatusType
    technicalName: string;
    minSourceAmount: number;
    maxSourceAmount: number;
    reserves: number;
    updatedAt: string;
    currentRate: number;
    course: number;
};

export type PayoutStatus = 'CREATED' | 'WAITING_FOR_REQUISITES' | 'WAITING_FOR_CLIENT_PAYMENT' | 'PAYMENT_RECEIVED' | 'WAITING_FOR_OPERATOR_PROCESSING' | 'CANCELLED' | 'ERROR' | 'COMPLETED';

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    balance: number;
}

export interface PayoutAttachment {
    id: number;
    fileUrl: string;
    fileName: string;
    contentType: string;
    uploadedAt: string;
}

export interface PayoutAdditionalField {
    fieldId: number;
    fieldName: string;
    userValue: string;
    nameIdentify: string;
}

export interface Payout {
    id: number;
    srcCurrency: Currency;
    targetCurrency:	Currency;
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
    user: User;
    attachments: PayoutAttachment[];
    sourceAdditionalFields: PayoutAdditionalField[];
    targetAdditionalFields: PayoutAdditionalField[];
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    referralCode: string;
    balance: number;
    payouts: Payout[];
}
  