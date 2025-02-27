export interface ExchangeDirectionResponseDto {
    id: number;
    sourceCurrencyId: number;
    targetCurrencyId: number;
    commission: number;
    status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
    technicalName: string;
    minTargetAmount: number;
    maxTargetAmount: number;
    minSourceAmount: number;
    maxSourceAmount: number;
    rounding: number;
    reserves: number;
    requisites: string;
    updatedAt: string;
    currentRate: number;
}

export interface ExchangeDirectionWithCourseResponseDto {
    id: number;
    sourceCurrencyId: number;
    targetCurrencyId: number;
    exchangeRate: number;
    exchangeRateSource: string;
    comission: number;
    status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
    technicalName: string;
    minTargetAmount: number;
    maxTargetAmount: number;
    minSourceAmount: number;
    maxSourceAmount: number;
    rounding: number;
    reserves: number;
    requisites: string;
    updatedAt: string;
    currentRate: number;
}

export interface GetCourseResponseDto {
    course: number;
    isReversed: boolean;
}

    