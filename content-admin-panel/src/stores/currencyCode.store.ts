import { atom } from 'nanostores';
import { CurrencyCode } from '../api/types/common';

export const $currencyCodeList = atom<CurrencyCode[]>([]);