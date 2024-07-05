import CreateColumnModal from "../components/modals/CreateColumnModal";
import UpdateColumnModal from "../components/modals/UpdateColumnModal";
import DeleteColumnModal from "../components/modals/DeleteColumnModal";

const ModalProvider = () => {
    return (
        <>
            <CreateColumnModal />
            <UpdateColumnModal />
            <DeleteColumnModal />
        </>
    );
};

export default ModalProvider;
