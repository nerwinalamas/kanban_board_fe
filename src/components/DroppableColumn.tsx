import { useDroppable } from "@dnd-kit/core";
import { ColumnProps } from "../types";
import { Ellipsis, Plus } from "lucide-react";

const DroppableColumn = ({ id, title, children }: ColumnProps) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className="w-72 bg-slate-700 flex flex-col flex-shrink-0 justify-between gap-5 p-4 rounded-lg"
        >
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold mb-2">{title}</h2>
                    <div className="cursor-pointer p-2 rounded-full hover:bg-slate-600">
                        <Ellipsis />
                    </div>
                </div>
                <div className="flex flex-col gap-2">{children}</div>
            </div>

            <div className="flex items-center gap-1 p-2 rounded-md cursor-pointer hover:bg-slate-600">
                <Plus size={18} />
                <p>Add card</p>
            </div>
        </div>
    );
};

export default DroppableColumn;
