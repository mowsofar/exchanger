import { atom } from 'nanostores';
import { ExchangeDirection } from '../api/types/common';

export const $exchangeDirectionsTotal = atom<number>(0);

export const $exchangeDirectionsPaged = atom<ExchangeDirection[]>([]);