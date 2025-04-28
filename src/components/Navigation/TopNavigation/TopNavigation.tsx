import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './TopNavigation.module.css';
import { useGameData } from '../../../contexts/GameDataContext';
const TopNavigation: React.FC = () => {
  const location = useLocation();
  const { gameData } = useGameData();

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.navLogo}>
          {gameData.config.logo && (
            <img src={gameData.config.logo} alt="Pokédex Logo" />
          )}
          <h1>{gameData.config.title}</h1>
        </Link>
        <div className={styles.navLinks}>
          <Link
            to={`?page=pokemon`}
            className={`${styles.navLink} ${location.search.includes('page=pokemon') ? styles.active : ''}`}
          >
            Pokémon
          </Link>
          <Link
            to={`?page=moves`}
            className={`${styles.navLink} ${location.search.includes('page=moves') ? styles.active : ''}`}
          >
            Moves
          </Link>
          <Link
            to={`?page=items`}
            className={`${styles.navLink} ${location.search.includes('page=items') ? styles.active : ''}`}
          >
            Items
          </Link>
          <Link
            to={`?page=locations`}
            className={`${styles.navLink} ${location.search.includes('page=locations') ? styles.active : ''}`}
          >
            Locations
          </Link>
          <Link
            to={`?page=abilities`}
            className={`${styles.navLink} ${location.search.includes('page=abilities') ? styles.active : ''}`}
          >
            Abilities
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;