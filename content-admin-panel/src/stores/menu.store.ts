import { atom } from "nanostores";

type isRolledUpPartnerListStore = boolean;

export const $isRolledUpPartnerListStore = atom<isRolledUpPartnerListStore>(false);