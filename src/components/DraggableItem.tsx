import { CSS } from "@dnd-kit/utilities";
import { Item } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { Grip } from "lucide-react";
import useModal from "../hooks/useModal";

const DraggableItem = ({ id, title, description, columnId }: Item) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id,
            data: {
                type: "item",
                columnId,
            },
        });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const { openModal } = useModal();

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            onClick={() => {
                openModal("viewItemModal", {
                    id,
                    title,
                    description,
                    columnId,
                });
            }}
            className="p-4 flex justify-between items-center gap-2 flex-shrink-0 rounded-lg cursor-pointer bg-slate-800"
        >
            <h2 className="flex-1 capitalize line-clamp-1">{title}</h2>
            <div
                {...listeners}
                title={`Move ${title}`}
                className="w-max flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-slate-600"
            >
                <Grip />
            </div>
        </div>
    );
};

export default DraggableItem;
