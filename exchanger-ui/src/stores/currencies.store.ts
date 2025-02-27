import { atom } from 'nanostores';
import { ExchangeDirectionResponseDto } from '../api/types/currency';
import { Course, Currency, CurrentCyrrencyType } from '../api/types/common';

export const $sourceCurrencies = atom<Currency[]>([]);
export const $sourceCurrency = atom<Currency | null>(null);

export const $targetCurrencies = atom<Currency[]>([]);
export const $targetCurrency = atom<Currency | null>(null);

export const $currencyType = atom<CurrentCyrrencyType>('');

export const $exchangeDirections = atom<ExchangeDirectionResponseDto | null>(null);
export const $course = atom<Course | null>(null);

export const $amountFrom = atom<number>(0);
export const $amountTo = atom<number>(0);

export const $exchangeError = atom('');