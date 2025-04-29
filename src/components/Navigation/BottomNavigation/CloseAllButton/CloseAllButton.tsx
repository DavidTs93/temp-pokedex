import React from 'react';
import { useModal } from '../../../../contexts/ModalContext';
import styles from './CloseAllButton.module.css';
import bnStyles from '../BottomNavigation.module.css';

const CloseAllButton: React.FC = () => {
  const { closeAllModals } = useModal();

  return (
    <button
      className={`${styles.closeAllButton} ${bnStyles.bottomButton}`}
      onClick={closeAllModals}
      aria-label="Close all modals"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>

    </button>
  );
};

export default CloseAllButton;