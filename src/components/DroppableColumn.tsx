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
import React, { useState } from "react";
import useColumnStore from "../store/useColumn";
import { v4 as uuidv4 } from "uuid";

const DroppableColumn = ({ id, title, children }: ColumnProps) => {
    const { setNodeRef } = useDroppable({
        id,
    });
    const { openModal } = useModal();
    const { createItem } = useColumnStore();
    const [toggleDropDownMenu, setToggleDropDownMenu] = useState(false);
    const [toggleAddItem, setToggleAddItem] = useState(false);
    const [newItemTitle, setNewItemTitle] = useState("");

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newItem = {
                id: uuidv4(),
                title: newItemTitle,
                description: "",
                columnId: id,
            };
            createItem(id, newItem);
        } catch (error) {
            console.log("Create Item Error: ", error);
        }

        setNewItemTitle("");
        setToggleAddItem(false);
    };

    const handleCancel = () => {
        setToggleAddItem(false);
        setNewItemTitle("");
    };

    return (
        <div
            ref={setNodeRef}
            className="w-72 h-max bg-slate-700 flex flex-col flex-shrink-0 justify-between gap-5 p-4 rounded-lg"
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
                <div className="max-h-[47vh] flex flex-col gap-2 overflow-y-auto">
                    {children}
                </div>
            </div>

            {toggleAddItem ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newItemTitle}
                        onChange={(e) => setNewItemTitle(e.target.value)}
                        className="p-4 rounded-lg cursor-pointer outline-none bg-slate-800"
                    />
                    <div className="flex gap-2">
                        <input
                            type="submit"
                            value="Add"
                            className="py-2 px-4 rounded cursor-pointer bg-slate-600 text-white hover:bg-slate-600/50"
                        />
                        <input
                            type="button"
                            value="Cancel"
                            onClick={handleCancel}
                            className="py-2 px-4 rounded cursor-pointer text-white hover:bg-slate-600/50"
                        />
                    </div>
                </form>
            ) : (
                <div
                    onClick={() => setToggleAddItem(true)}
                    className="flex items-center gap-1 p-2 rounded-md cursor-pointer hover:bg-slate-600"
                >
                    <Plus size={18} />
                    <p>Add card</p>
                </div>
            )}
        </div>
    );
};

export default DroppableColumn;
