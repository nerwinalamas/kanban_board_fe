import { create } from "zustand";
import { Column } from "../types";

type ColumnState = {
    columns: Column[];
    createColumn: (data: Column) => void;
    updateColumn: (columnId: string, newTitle: string) => void;
    deleteColumn: (columnId: string) => void;
};

const useColumnStore = create<ColumnState>((set) => ({
    columns: [],
    createColumn: (data) =>
        set((state) => ({
            columns: [...state.columns, data],
        })),
    updateColumn: (columnId, newTitle) =>
        set((state) => ({
            columns: state.columns.map((column) =>
                column.id === columnId ? { ...column, title: newTitle } : column
            ),
        })),
    deleteColumn: (columnId) =>
        set((state) => ({
            columns: state.columns.filter((column) => column.id !== columnId),
        })),
}));

export default useColumnStore;
