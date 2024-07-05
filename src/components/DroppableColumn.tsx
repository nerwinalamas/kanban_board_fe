import { useDroppable } from "@dnd-kit/core";
import { ColumnProps } from "../types";
import { Ellipsis, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useModal from "../hooks/useModal";
import { useState } from "react";

const DroppableColumn = ({ id, title, children }: ColumnProps) => {
    const { setNodeRef } = useDroppable({
        id,
    });
    const { openModal } = useModal();
    const [toggleDropDownMenu, setToggleDropDownMenu] = useState(false);

    const handleUpdateColumn = () => {
        openModal("updateColumnModal", {
            id,
            title,
        });
        setToggleDropDownMenu(false);
    };

    const handleDeleteColumn = () => {
        openModal("deleteColumnModal", id);
        setToggleDropDownMenu(false);
    };

    const toggleMenu = () => {
        setToggleDropDownMenu((prev) => !prev);
    };

    return (
        <div
            ref={setNodeRef}
            className="w-72 bg-slate-700 flex flex-col flex-shrink-0 justify-between gap-5 p-4 rounded-lg"
        >
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold mb-2">{title}</h2>
                    <DropdownMenu
                        open={toggleDropDownMenu}
                        onOpenChange={toggleMenu}
                    >
                        <DropdownMenuTrigger>
                            <div className="cursor-pointer p-2 rounded-full hover:bg-slate-600">
                                <Ellipsis />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="border-none bg-slate-900 text-white"
                        >
                            <DropdownMenuLabel
                                onClick={handleUpdateColumn}
                                className="cursor-pointer rounded-sm hover:bg-slate-700"
                            >
                                Update
                            </DropdownMenuLabel>
                            <DropdownMenuLabel
                                onClick={handleDeleteColumn}
                                className="text-red-600 cursor-pointer rounded-sm hover:bg-slate-700"
                            >
                                Delete
                            </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="max-h-[480px] flex flex-col gap-2 overflow-y-auto">
                    {children}
                </div>
            </div>

            <div className="flex items-center gap-1 p-2 rounded-md cursor-pointer hover:bg-slate-600">
                <Plus size={18} />
                <p>Add card</p>
            </div>
        </div>
    );
};

export default DroppableColumn;
