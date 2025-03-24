import { atom } from 'nanostores';
import { AdditionalFields, Currency } from '../api/types/common';

export const $currencyList = atom<Currency[]>([]);

export const $selectedCurrency = atom<Currency | null>(null);

export const $additionalFields = atom<AdditionalFields>({source: [], target: []});