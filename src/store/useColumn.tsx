import { create } from "zustand";
import { Column, Item } from "../types";
import { arrayMove } from "@dnd-kit/sortable";
import { initialColumns } from "../data";

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
    moveColumn: (sourceIndex: number, destinationIndex: number) => void;
    moveItem: (
        sourceColumnId: string,
        destinationColumnId: string,
        sourceIndex: number,
        destinationIndex: number
    ) => void;
};

const useColumnStore = create<ColumnState>((set) => ({
    columns: initialColumns,
    createColumn: (data) =>
        set((state) => ({
            columns: [...state.columns, { ...data, items: [] }],
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
    moveColumn: (oldIndex, newIndex) =>
        set((state) => {
            const columns = arrayMove(state.columns, oldIndex, newIndex);
            return { columns };
        }),
    moveItem: (
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex
    ) =>
        set((state) => {
            const sourceColumn = state.columns.find(
                (col) => col.id === sourceColumnId
            );
            const destinationColumn = state.columns.find(
                (col) => col.id === destinationColumnId
            );

            if (!sourceColumn || !destinationColumn)
                return { columns: state.columns };

            // Moving item within the same column
            if (sourceColumnId === destinationColumnId) {
                const updatedItems = arrayMove(
                    sourceColumn.items,
                    sourceIndex,
                    destinationIndex
                );
                return {
                    columns: state.columns.map((column) =>
                        column.id === sourceColumnId
                            ? { ...column, items: updatedItems }
                            : column
                    ),
                };
            } else {
                // Moving item between different columns
                const [movedItem] = sourceColumn.items.splice(sourceIndex, 1);
                destinationColumn.items.splice(destinationIndex, 0, movedItem);

                return {
                    columns: state.columns.map((column) => {
                        if (column.id === sourceColumnId) {
                            return { ...column, items: sourceColumn.items };
                        }
                        if (column.id === destinationColumnId) {
                            return {
                                ...column,
                                items: destinationColumn.items,
                            };
                        }
                        return column;
                    }),
                };
            }
        }),
}));

export default useColumnStore;
