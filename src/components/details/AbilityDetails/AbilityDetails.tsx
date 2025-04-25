import React from 'react';
import { Ability } from '../../../types/classes';
import styles from './AbilityDetails.module.css';

const AbilityDetails: React.FC<Ability> = (ability) => {
  return (
    <div className={styles.abilityDetails}>
      <div className={styles.abilityHeader}>
        <h3 className={styles.abilityName}>{ability.name}</h3>
      </div>

      <div className={styles.detailSection}>
        <h3>Description</h3>
        <p>{ability.description}</p>
      </div>
    </div>
  );
};

export default AbilityDetails;