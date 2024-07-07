import useModal from "../../hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const ViewItemModal = () => {
    const { modalType, isModalOpen, closeModal, data } = useModal();
    const toggleModal = isModalOpen && modalType === "viewItemModal";

    return (
        <Dialog open={toggleModal} onOpenChange={closeModal}>
            <DialogContent className="bg-slate-900 text-white border-none">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold capitalize">
                        {data?.title}
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ViewItemModal;
