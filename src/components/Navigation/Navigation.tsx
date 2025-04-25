import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.navLogo}>
          <img src="/logo.png" alt="Pokédex Logo" />
          <h1>Pokédex</h1>
        </Link>
        <div className={styles.navLinks}>
          <Link
            to="/pokemon"
            className={`${styles.navLink} ${location.pathname.startsWith('/pokemon') ? styles.active : ''}`}
          >
            Pokémon
          </Link>
          <Link
            to="/moves"
            className={`${styles.navLink} ${location.pathname.startsWith('/moves') ? styles.active : ''}`}
          >
            Moves
          </Link>
          <Link
            to="/items"
            className={`${styles.navLink} ${location.pathname.startsWith('/items') ? styles.active : ''}`}
          >
            Items
          </Link>
          <Link
            to="/locations"
            className={`${styles.navLink} ${location.pathname.startsWith('/locations') ? styles.active : ''}`}
          >
            Locations
          </Link>
          <Link
            to="/abilities"
            className={`${styles.navLink} ${location.pathname.startsWith('/abilities') ? styles.active : ''}`}
          >
            Abilities
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;