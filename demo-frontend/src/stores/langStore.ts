import {create} from 'zustand';

interface LangState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLangStore = create<LangState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
}));