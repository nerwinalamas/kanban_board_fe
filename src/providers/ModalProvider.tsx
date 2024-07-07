import CreateColumnModal from "../components/modals/CreateColumnModal";
import UpdateColumnModal from "../components/modals/UpdateColumnModal";
import DeleteColumnModal from "../components/modals/DeleteColumnModal";
import ViewItemModal from "../components/modals/ViewItemModal";

const ModalProvider = () => {
    return (
        <>
            <CreateColumnModal />
            <UpdateColumnModal />
            <DeleteColumnModal />
            <ViewItemModal />
        </>
    );
};

export default ModalProvider;
