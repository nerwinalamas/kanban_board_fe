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
            className="flex flex-col gap-2 p-4 rounded-lg cursor-pointer bg-slate-800"
        >
            <h2 className="font-semibold capitalize">{title}</h2>
            <p>{description && description}</p>
        </div>
    );
};

export default DraggableItem;
