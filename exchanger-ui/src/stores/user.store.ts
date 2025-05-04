import { atom } from 'nanostores';
import { Payout, User } from '../api/types/common';

export const $isLoginModalOpen = atom(false);

export const $isRegistrationModalOpen = atom(false);

export const $technicalMode = atom(false);

export const $user = atom<User | null>(null);

export const $userPayouts = atom<Payout[]>([]);
