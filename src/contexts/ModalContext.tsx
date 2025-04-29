import React, { createContext, useContext, useState } from 'react';
import { isUndefined } from '../utils/utils';

interface ModalState<T> {
  item: T;
  isOpen: boolean;
}

interface ModalContextType {
  isOpen: boolean;
  modalStack: ModalState<any>[];
  selectedItem: any;
  openModal: (item: any) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = useState<ModalState<any>[]>([]);

  const openModal = (item: any) => {
    setModalStack(prev => [...prev, { item, isOpen: true }]);
  };

  const closeModal = () => {
    setModalStack(prev => prev.slice(0, -1));
  };

  const closeAllModals = () => {
    setModalStack([]);
  };

  const currentModal = modalStack[modalStack.length - 1];

  return (
    <ModalContext.Provider value={{
      isOpen: modalStack.length > 0,
      modalStack,
      selectedItem: currentModal?.item || null,
      openModal,
      closeModal,
      closeAllModals
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (isUndefined(context)) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}; 