import {
    closestCorners,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import DroppableColumn from "../components/DroppableColumn";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import DraggableItem from "../components/DraggableItem";
import useModal from "../hooks/useModal";
import useColumnStore from "../store/useColumn";

const Board = () => {
    const { columns } = useColumnStore();
    const { openModal } = useModal();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (e: DragEndEvent) => {
        // const { active, over } = e;
    };

    return (
        <div className="w-full grid p-4">
            <div className="flex flex-col gap-5 p-4 rounded-lg overflow-hidden bg-slate-800">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-white">
                        Kanban Board
                    </h1>
                    <button
                        onClick={() => openModal("createColumnModal")}
                        className="py-2 px-4 rounded bg-slate-600 text-white hover:bg-slate-600/50"
                    >
                        Create
                    </button>
                </div>
                {columns.length > 0 && (
                    <div className="w-full flex gap-5 overflow-x-auto">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={columns.map((column) => column.id)}
                            >
                                {columns.map((task) => (
                                    <DroppableColumn
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                    >
                                        <SortableContext
                                            items={task.items.map(
                                                (item) => item.id
                                            )}
                                        >
                                            {task.items.map((item) => (
                                                <DraggableItem
                                                    key={item.id}
                                                    id={item.id}
                                                    title={item.title}
                                                    description={
                                                        item.description
                                                    }
                                                    columnId={task.id}
                                                />
                                            ))}
                                        </SortableContext>
                                    </DroppableColumn>
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Board;
