import { create } from "zustand";

type ModalState = {
    modalType: string | null;
    data?: any;
    isModalOpen: boolean;
    openModal: (modalType: string, data?: any) => void;
    closeModal: () => void;
};

const useModal = create<ModalState>((set) => ({
    modalType: null,
    data: undefined,
    isModalOpen: false,
    openModal: (modalType: string, data?: any) =>
        set({ modalType, data, isModalOpen: true }),
    closeModal: () =>
        set({ modalType: null, data: undefined, isModalOpen: false }),
}));

export default useModal;
