import { atom } from 'nanostores';
import { Payout } from '../api/types/common';

export const $payouts = atom<Payout[]>([]);

export const $payoutsTotal = atom(0);

export function updatePayout(updatedPayout: Payout) {
    const currentPayouts = $payouts.get();

    const newPayouts = currentPayouts.map(p => 
      p.id === updatedPayout.id ? updatedPayout : p
    );

    $payouts.set(newPayouts);
  }