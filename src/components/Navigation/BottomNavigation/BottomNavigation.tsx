import React from 'react';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import { ScrollToTopButton } from './ScrollToTopButton/ScrollToTopButton';
import styles from './BottomNavigation.module.css';

const BottomNavigation: React.FC = () => {
  return (
    <nav className={styles.bottomNavigation}>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomLeft}>
          <ThemeToggle />
        </div>
        <div className={styles.bottomRight}>
          <ScrollToTopButton />
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;