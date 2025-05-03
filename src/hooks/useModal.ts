import { useState } from 'react';

interface ModalState<T> {
  item: T;
}

export function useModal<T extends { id: string | number }>() {
  const [modalStack, setModalStack] = useState<ModalState<T>[]>([]);

  // Open modal with entity
  const openModal = (item: T) => {
    setModalStack(prev => [...prev, { item }]);
  };

  // Close the topmost modal
  const closeModal = () => {
    setModalStack(prev => prev.slice(0, -1));
  };

  // Close all modals
  const closeAllModals = () => {
    setModalStack([]);
  };

  // Get the current top modal
  const currentModal = modalStack[modalStack.length - 1];

  return {
    isOpen: modalStack.length > 0,
    selectedItem: currentModal?.item || null,
    modalStack,
    openModal,
    closeModal,
    closeAllModals
  };
}