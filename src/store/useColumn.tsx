import { create } from "zustand";
import { Column, Item } from "../types";

type ColumnState = {
    columns: Column[];
    createColumn: (data: Column) => void;
    updateColumn: (columnId: string, newTitle: string) => void;
    deleteColumn: (columnId: string) => void;
    createItem: (columnId: string, item: Item) => void;
    updateItem: (
        columnId: string,
        itemId: string,
        updatedItem: Partial<Item>
    ) => void;
    deleteItem: (columnId: string, itemId: string) => void;
    moveItem: (
        sourceColumnId: string,
        targetColumnId: string,
        itemId: string
    ) => void;
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
    createItem: (columnId, item) =>
        set((state) => ({
            columns: state.columns.map((column) =>
                column.id === columnId
                    ? { ...column, items: [...column.items, item] }
                    : column
            ),
        })),
    updateItem: (columnId, itemId, updatedItem) =>
        set((state) => ({
            columns: state.columns.map((column) =>
                column.id === columnId
                    ? {
                          ...column,
                          items: column.items.map((item) =>
                              item.id === itemId
                                  ? { ...item, ...updatedItem }
                                  : item
                          ),
                      }
                    : column
            ),
        })),
    deleteItem: (columnId, itemId) =>
        set((state) => ({
            columns: state.columns.map((column) =>
                column.id === columnId
                    ? {
                          ...column,
                          items: column.items.filter(
                              (item) => item.id !== itemId
                          ),
                      }
                    : column
            ),
        })),
    moveItem: (sourceColumnId, targetColumnId, itemId) =>
        set((state) => {
            const itemToMove = state.columns
                .find((column) => column.id === sourceColumnId)
                ?.items.find((item) => item.id === itemId);
            if (!itemToMove) return state;

            return {
                columns: state.columns.map((column) => {
                    if (column.id === sourceColumnId) {
                        return {
                            ...column,
                            items: column.items.filter(
                                (item) => item.id !== itemId
                            ),
                        };
                    } else if (column.id === targetColumnId) {
                        return {
                            ...column,
                            items: [
                                ...column.items,
                                { ...itemToMove, columnId: targetColumnId },
                            ],
                        };
                    }
                    return column;
                }),
            };
        }),
}));

export default useColumnStore;
