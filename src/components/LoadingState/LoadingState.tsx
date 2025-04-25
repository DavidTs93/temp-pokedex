import React from 'react';
import styles from './LoadingState.module.css';

const LoadingState: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingPokeball}>
        <div className={styles.loadingPokeballTop}></div>
        <div className={styles.loadingPokeballMiddle}></div>
        <div className={styles.loadingPokeballBottom}></div>
      </div>
      <p className={styles.loadingText}>Loading Pokédex data...</p>
    </div>
  );
};

export default LoadingState;