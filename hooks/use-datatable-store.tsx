"use client";

import { create } from "zustand";

interface DatatableState {
    keyword: string;
    paginate: number;
    page: number;
}

interface StoreState {
    tables: Record<string, DatatableState>;
    setKeyword: (tableId: string, keyword: string) => void;
    setPaginate: (tableId: string, paginate: number) => void;
    setPage: (tableId: string, page: number) => void;
    reset: (tableId: string) => void;
}

export const useDatatableStore = create<StoreState>((set) => ({
    tables: {},

    setKeyword: (tableId, keyword) =>
        set((state) => {
            const table = state.tables[tableId] || { keyword: "", paginate: 10, page: 1 };
            if (table.keyword !== keyword) {
                return {
                    tables: {
                        ...state.tables,
                        [tableId]: { ...table, keyword },
                    },
                };
            }
            return state; // No change, avoid re-render
        }),

    setPaginate: (tableId, paginate) =>
        set((state) => {
            const table = state.tables[tableId] || { keyword: "", paginate: 10, page: 1 };
            if (table.paginate !== paginate) {
                return {
                    tables: {
                        ...state.tables,
                        [tableId]: { ...table, paginate },
                    },
                };
            }
            return state;
        }),

    setPage: (tableId, page) =>
        set((state) => {
            const table = state.tables[tableId] || { keyword: "", paginate: 10, page: 1 };
            if (table.page !== page) {
                return {
                    tables: {
                        ...state.tables,
                        [tableId]: { ...table, page },
                    },
                };
            }
            return state;
        }),

    reset: (tableId) =>
        set((state) => ({
            tables: {
                ...state.tables,
                [tableId]: {
                    keyword: "",
                    paginate: 10,
                    page: 1,
                },
            },
        })),
}));
