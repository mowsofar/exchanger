import { atom } from 'nanostores';
import { User } from '../api/types/common';

export const $isLoginModalOpen = atom(false);

export const $isRegistrationModalOpen = atom(false);

export const $user = atom<User | null>(null);
