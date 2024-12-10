export type CurrencyStatus = 'ACTIVE' | 'INACTIVE';

export interface CurrencyCode {
    id: number;
    currencyCode: string;
    symbol: string;
    exchangeRate?: string | null;
    autoCorrectCourse?: string | null;
}

export interface Currency {
    id: number;
    actualFlg: CurrencyStatus;
    reserve?: string | null;
    minAmount?: string | null;
    maxAmount?: string | null;
    requisites?: string | null;
    round: number;
    currencyCode: CurrencyCode;
}

export interface PaymentSystem {
    id: number;
    paymentName: string;
    image: string;
    currencies?: Currency[];
}
