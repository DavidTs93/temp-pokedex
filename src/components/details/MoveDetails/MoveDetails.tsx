import React from 'react';
import { Move } from '../../../types/classes';
import styles from './MoveDetails.module.css';

const MoveDetails: React.FC<Move> = (move) => {
  return (
    <div className={styles.moveDetails}>
      <div className={styles.moveHeader}>
        {move.spriteUrl && (
          <div className={styles.moveImage}>
            <img src={move.spriteUrl} alt={move.name} />
          </div>
        )}
        <h3 className={styles.moveName}>{move.name}</h3>
        <div className={styles.moveTypeCategory}>
          {move.types.map((type) => (
            <div
              key={type.id}
              className={styles.typeBadge}
              style={{
                backgroundColor: type.spriteUrl ? 'transparent' : type.color,
                padding: type.spriteUrl ? '0' : undefined
              }}
            >
              {type.spriteUrl ? (
                <img src={type.spriteUrl} alt={type.name} className={styles.typeSprite} />
              ) : (
                type.name
              )}
            </div>
          ))}
          <div className={styles.categoryBadge}>
            {move.category.name}
          </div>
        </div>
      </div>

      <div className={styles.moveStats}>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Power:</span>
          <span className={styles.statValue}>{move.power || '—'}</span>
        </div>

        <div className={styles.statRow}>
          <span className={styles.statLabel}>Accuracy:</span>
          <span className={styles.statValue}>{move.accuracy ? `${move.accuracy}%` : '—'}</span>
        </div>

        <div className={styles.statRow}>
          <span className={styles.statLabel}>PP:</span>
          <span className={styles.statValue}>{move.pp}</span>
        </div>
      </div>

      <div className={styles.moveDescription}>
        <h4>Description</h4>
        <p>{move.description}</p>
      </div>

      {move.effect && (
        <>
          <div className={styles.moveEffect}>
            <h4>Effect Type</h4>
            <p>{move.effect.effectType.name}</p>
          </div>

          <div className={styles.moveEffectChance}>
            <h4>Effect Chance</h4>
            <p>{move.effect.chance}%</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MoveDetails;