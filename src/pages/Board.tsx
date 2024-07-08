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
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableItem from "../components/DraggableItem";
import useModal from "../hooks/useModal";
import useColumnStore from "../store/useColumn";
import Footer from "../components/Footer";

const Board = () => {
    const { columns, moveItem, moveColumn } = useColumnStore();
    const { openModal } = useModal();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (!over) return;
        if (active.id === over.id) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        if (active.data.current?.type === "column") {
            const oldIndex = columns.findIndex(
                (column) => column.id === activeId
            );
            const newIndex = columns.findIndex(
                (column) => column.id === overId
            );

            moveColumn(oldIndex, newIndex);
        } else {
            const activeColumnId = active.data.current?.columnId.toString();
            const overColumnId = over.data.current?.columnId.toString();

            if (activeColumnId && overColumnId) {
                const activeColumn = columns.find(
                    (column) => column.id === activeColumnId
                );
                const overColumn = columns.find(
                    (column) => column.id === overColumnId
                );

                if (activeColumn && overColumn) {
                    const activeIndex = activeColumn.items.findIndex(
                        (item) => item.id === activeId
                    );
                    const overIndex = overColumn.items.length
                        ? overColumn.items.findIndex(
                              (item) => item.id === overId
                          )
                        : 0;

                    if (activeColumnId === overColumnId) {
                        // Moving within the same column
                        moveItem(
                            activeColumnId,
                            overColumnId,
                            activeIndex,
                            overIndex
                        );
                    } else {
                        // Moving between columns
                        moveItem(
                            activeColumnId,
                            overColumnId,
                            activeIndex,
                            overIndex
                        );
                    }
                }
            }
        }
    };

    return (
        <div className="w-full grid p-4">
            <div className="md:h-[90vh] md:overflow-y-auto flex flex-col gap-5 p-4 rounded-lg overflow-hidden bg-slate-800">
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
                    <div className="w-full flex flex-col items-center justify-center md:items-start md:flex-wrap md:flex-row gap-5 xl:justify-start xl:h-full xl:flex-nowrap xl:overflow-x-auto">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                strategy={horizontalListSortingStrategy}
                                items={columns.map((column) => column.id)}
                            >
                                {columns.map((column) => (
                                    <DroppableColumn
                                        key={column.id}
                                        id={column.id}
                                        title={column.title}
                                    >
                                        <SortableContext
                                            strategy={
                                                verticalListSortingStrategy
                                            }
                                            items={column.items.map(
                                                (item) => item.id
                                            )}
                                        >
                                            {column.items.map((item) => (
                                                <DraggableItem
                                                    key={item.id}
                                                    id={item.id}
                                                    title={item.title}
                                                    description={
                                                        item.description
                                                    }
                                                    columnId={column.id}
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
            <Footer />
        </div>
    );
};

export default Board;
