import React, { createContext, useContext, useState } from 'react';
import { isUndefined } from '../utils/utils';

interface ModalState<T> {
  item: T;
  isWide: boolean;
}

interface ModalContextType {
  modalStack: ModalState<any>[];
  isOpen: boolean;
  topModal: ModalState<any> | undefined;
  openModal: (item: any, isWide: boolean) => void;
  closeTopModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = useState<ModalState<any>[]>([]);

  const openModal = (item: any, isWide: boolean) => {
    setModalStack(prev => [...prev, {
      item: item,
      isWide: isWide
    }]);
  };

  const closeTopModal = () => {
    setModalStack(prev => prev.slice(0, -1));
  };

  const closeAllModals = () => {
    setModalStack([]);
  };

  return (
    <ModalContext.Provider value={{
      modalStack: modalStack,
      isOpen: modalStack.length > 0,
      topModal: modalStack[modalStack.length - 1],
      openModal: openModal,
      closeTopModal: closeTopModal,
      closeAllModals: closeAllModals
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