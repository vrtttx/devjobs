import { create } from 'zustand';

interface PostJobModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const usePostJobModal = create<PostJobModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default usePostJobModal;
