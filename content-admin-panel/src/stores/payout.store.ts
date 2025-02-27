import { atom } from 'nanostores';
import { Payout } from '../api/types/common';

export const $selectedPayout = atom<Payout | null>(null);