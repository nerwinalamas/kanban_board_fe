import { useEffect, useState } from "react";
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

const UpdateColumnModal = () => {
    const { modalType, isModalOpen, closeModal, data } = useModal();
    const toggleModal = isModalOpen && modalType === "updateColumnModal";

    const { updateColumn } = useColumnStore();
    const [updatedColumnName, setUpdatedColumnName] = useState("");

    useEffect(() => {
        if (toggleModal && data) {
            setUpdatedColumnName(data.title);
        }
    }, [toggleModal, data]);

    const handleSubmit = () => {
        updateColumn(data.id, updatedColumnName);
        setUpdatedColumnName("");
        closeModal();
    };

    const handleClose = () => {
        setUpdatedColumnName("");
    };

    return (
        <Dialog open={toggleModal} onOpenChange={closeModal}>
            <DialogContent className="bg-slate-900 text-white border-none">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        Update Column
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-base font-medium">
                    <input
                        type="text"
                        placeholder="Update Name"
                        name="updatedColumnName"
                        value={updatedColumnName}
                        onChange={(e) => setUpdatedColumnName(e.target.value)}
                        className="w-full p-2 border text-slate-800"
                    />
                </DialogDescription>
                <DialogFooter className="flex flex-col gap-2 md:gap-0 md:flex-row">
                    <Button
                        variant="secondary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Update
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

export default UpdateColumnModal;
