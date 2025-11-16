import { create } from 'zustand';

interface StonkStore {
    stonks: Array<any>;
    setStonks: (myStonks: Array<any>) => void;

    revealStonks: Array<any>,
    setStonksReveal: (mySecretStonks: Array<any>) => void;

    ticker: string;
    setTicker: (myTicker: string) => void;

    min: number;
    setMin: (myMin: number) => void;

    buy: number;
    setBuy: (price: number) => void;

    sell: number;
    setSell: (price: number) => void;

    userAmount: number;
    setUserAmount: () => void;
}

export const useStonkStore = create<StonkStore>((set) => ({
    stonks: new Array(),
    setStonks: (myStonks) => set({ stonks: myStonks }),

    revealStonks: new Array(),
    setStonksReveal: (mySecretStonks) => set({ revealStonks: mySecretStonks }),

    ticker: "",
    setTicker: (myTicker) => set({ ticker: myTicker }),

    min: Number.MAX_SAFE_INTEGER,
    setMin: (myMin) => set({ min: myMin }),

    buy: 0,
    setBuy: (price) => set(({ buy: price })),

    sell: 0,
    setSell: (price) => set(({ sell: price })),

    userAmount: 100,
    setUserAmount: () => set((state) => ({ userAmount: state.userAmount }))
}));