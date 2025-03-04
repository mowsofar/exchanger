import { atom } from 'nanostores';
import { Payout } from '../api/types/common';

export const $requisites = atom('');

export const $email = atom('');

export const $referralCode = atom('');

export const $payout = atom<Payout | null>(null);

