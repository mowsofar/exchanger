import { atom } from 'nanostores';
import { ExchangeDirection } from '../api/types/common';

export const $exchangeDirectionsList = atom<ExchangeDirection[]>([]);