import React from 'react';
import styles from './ScrollToTopButton.module.css';

export const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={styles.scrollToTopButton}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
};