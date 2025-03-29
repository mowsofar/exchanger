import { atom } from 'nanostores';
import { AdditionalFields, Currency, Requisites } from '../api/types/common';

export const $currencyList = atom<Currency[]>([]);

export const $selectedCurrency = atom<Currency | null>(null);

export const $additionalFields = atom<AdditionalFields>({source: [], target: []});

export const $requisites = atom<Requisites[]>([]);