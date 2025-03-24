import { atom } from 'nanostores';
import { Payout, PayoutStatus } from '../api/types/common';

export const $requisites = atom('');

export const $email = atom('');

export const $referralCode = atom('');

export const $payout = atom<Payout | null>(null);

export const $payoutFilter = atom<PayoutStatus | ''>('');

