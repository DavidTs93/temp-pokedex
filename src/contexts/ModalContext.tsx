import React, { createContext, useContext, useState } from 'react';
import { isUndefined } from '../utils/utils';

interface ModalState<T> {
  item: T;
  isOpen: boolean;
  isWide: boolean;
  isHeaderSpriteVisible: boolean;
  setScroll: React.Dispatch<React.SetStateAction<number>>;
}

interface ModalContextType {
  isOpen: boolean;
  isWide: boolean;
  isHeaderSpriteVisible: boolean;
  setHeaderSpriteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  scroll: number;
  setScroll: React.Dispatch<React.SetStateAction<number>>;
  modalStack: ModalState<any>[];
  selectedItem: any;
  openModal: (item: any, isWide: boolean) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = useState<ModalState<any>[]>([]);
  const [isHeaderSpriteVisible, setHeaderSpriteVisible] = useState(false);
  const [scroll, setScroll] = useState(0);

  const openModal = (item: any, isWide: boolean) => {
    setModalStack(prev => [...prev, { item, isOpen: true, isWide, isHeaderSpriteVisible, setScroll }]);
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
      isWide: currentModal?.isWide || false,
      isHeaderSpriteVisible,
      setHeaderSpriteVisible,
      scroll,
      setScroll,
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