import React from 'react';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import ScrollToTopButton from './ScrollToTopButton/ScrollToTopButton';
import CloseAllButton from './CloseAllButton/CloseAllButton';
import { useModal } from '../../../contexts/ModalContext';
import styles from './BottomNavigation.module.css';

const BottomNavigation: React.FC = () => {
  const { isOpen } = useModal();

  return (
    <nav className={styles.bottomNavigation}>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomLeft}>
          <ThemeToggle />
        </div>
        <div className={styles.bottomCenter}>
          {isOpen && <CloseAllButton />}
        </div>
        <div className={styles.bottomRight}>
          {!isOpen && <ScrollToTopButton />}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;