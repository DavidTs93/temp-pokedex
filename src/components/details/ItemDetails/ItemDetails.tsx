import React from 'react';
import { Item } from '../../../types/classes';
import styles from './ItemDetails.module.css';

const ItemDetails: React.FC<Item> = (item) => {
  return (
    <div className={styles.itemDetails}>
      <div className={styles.itemHeader}>
        {item.spriteUrl && (
          <div className={styles.itemImage}>
            <img src={item.spriteUrl} alt={item.name} />
          </div>
        )}
        <h3 className={styles.itemName}>{item.name}</h3>
        <span className={styles.categoryBadge}>
          {item.category.name}
        </span>
      </div>

      <div className={styles.detailSection}>
        <h3>Description</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default ItemDetails;