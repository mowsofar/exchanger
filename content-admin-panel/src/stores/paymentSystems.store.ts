import { atom } from 'nanostores';
import { PaymentSystem } from '../api/types/common';

export const $paymentSystemsList = atom<PaymentSystem[]>([]);