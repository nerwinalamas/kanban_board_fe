import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DroppableColumn from "../components/DroppableColumn";
import { columnsData } from "../data";
import { SortableContext } from "@dnd-kit/sortable";
import { Column } from "../types";
import DraggableItem from "../components/DraggableItem";

const Board = () => {
    const [columns, setColumns] = useState<Column[]>(columnsData);

    return (
        <div className="w-full grid p-4">
            <div className="flex flex-col gap-5 p-4 rounded-lg overflow-hidden bg-slate-800">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-white">
                        Kanban Board
                    </h1>
                    <button className="py-2 px-4 rounded bg-slate-600 text-white hover:bg-slate-600/50">
                        Create
                    </button>
                </div>
                <div className="w-full flex gap-5 overflow-x-auto">
                    <DndContext>
                        <SortableContext items={columns}>
                            {columns.map((column) => (
                                <DroppableColumn
                                    key={column.id}
                                    id={column.id}
                                    title={column.title}
                                >
                                    <SortableContext items={column.items}>
                                        {column.items.map((item) => (
                                            <DraggableItem
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                description={item.description}
                                            />
                                        ))}
                                    </SortableContext>
                                </DroppableColumn>
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </div>
    );
};

export default Board;
