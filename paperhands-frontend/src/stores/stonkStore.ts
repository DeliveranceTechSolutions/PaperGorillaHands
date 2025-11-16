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

    minReveal: number;
    setMinReveal: (myMin: number) => void;

    buy: number;
    setBuy: (price: number) => void;

    sell: number;
    setSell: (price: number) => void;

    noBid: boolean,
    setNoBid: (event: boolean) => void;

    userAmount: number;
    setUserAmount: (amount: number) => void;
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

    minReveal: Number.MAX_SAFE_INTEGER,
    setMinReveal: (myMinReveal) => set({ min: myMinReveal }),

    buy: 0,
    setBuy: (price) => set(({ buy: price })),

    sell: 0,
    setSell: (price) => set(({ sell: price })),

    noBid: false,
    setNoBid: (event) => set(({ noBid: event })),

    userAmount: 100,
    setUserAmount: (amount) => set((state) => ({ userAmount: amount }))
}));