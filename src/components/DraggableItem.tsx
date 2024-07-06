// import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "../types";
import { useSortable } from "@dnd-kit/sortable";

const DraggableItem = ({ id, title, description, columnId }: Item) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: {
            columnId,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="h-20 p-4 flex-shrink-0 rounded-lg cursor-pointer bg-slate-800"
        >
            <h2 className="capitalize">{title}</h2>
        </div>
    );
};

export default DraggableItem;
