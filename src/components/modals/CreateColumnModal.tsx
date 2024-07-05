import { useState } from "react";
import useModal from "../../hooks/useModal";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../ui/dialog";
import useColumnStore from "../../store/useColumn";
import { v4 as uuidv4 } from "uuid";

const CreateColumnModal = () => {
    const { modalType, isModalOpen, closeModal } = useModal();
    const toggleModal = isModalOpen && modalType === "createColumnModal";

    const { createColumn } = useColumnStore();
    const [columnName, setColumnName] = useState("");

    const handleSubmit = () => {
        const newColumn = {
            id: uuidv4(),
            title: columnName,
            items: [],
        };
        createColumn(newColumn);
        setColumnName("");
        closeModal();
    };

    const handleClose = () => {
        setColumnName("");
    };

    return (
        <Dialog open={toggleModal} onOpenChange={closeModal}>
            <DialogContent className="bg-slate-900 text-white border-none">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        Create Column
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-base font-medium">
                    <input
                        type="text"
                        placeholder="Name"
                        name="columnName"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        className="w-full p-2 border text-slate-800"
                    />
                </DialogDescription>
                <DialogFooter className="flex flex-col gap-2 md:gap-0 md:flex-row">
                    <Button
                        variant="secondary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Create
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateColumnModal;
