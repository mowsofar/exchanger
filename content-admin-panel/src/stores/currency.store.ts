import { atom } from 'nanostores';
import { AdditionalFieldDirection, AdditionalFields, Autobroker, Currency, Requisites } from '../api/types/common';

export const $currencyList = atom<Currency[]>([]);

export const $selectedCurrency = atom<Currency | null>(null);

export const $additionalFields = atom<AdditionalFields>({source: [], target: []});

export const $additionalFieldsTyped = atom<AdditionalFieldDirection[]>([]);

export const $requisites = atom<Requisites[]>([]);

export const $autobrokers = atom<Autobroker[]>([]);