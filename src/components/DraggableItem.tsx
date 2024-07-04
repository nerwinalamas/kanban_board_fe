import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "../types";

const DraggableItem = ({ id, title, description }: Item) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
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
