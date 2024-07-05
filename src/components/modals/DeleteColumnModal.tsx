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

const DeleteColumnModal = () => {
    const { modalType, isModalOpen, closeModal, data } = useModal();
    const toggleModal = isModalOpen && modalType === "deleteColumnModal";

    const { deleteColumn } = useColumnStore();

    const handleSubmit = () => {
        deleteColumn(data);
        closeModal();
    };

    return (
        <Dialog open={toggleModal} onOpenChange={closeModal}>
            <DialogContent className="bg-slate-900 text-white border-none">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-red-600">
                        Delete Column
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-base font-medium">
                    Are you sure you want to delete this permanently?
                </DialogDescription>
                <DialogFooter className="flex flex-col gap-2 md:gap-0 md:flex-row">
                    <Button
                        variant="secondary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Delete
                    </Button>
                    <DialogClose asChild>
                        <Button type="button">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteColumnModal;
