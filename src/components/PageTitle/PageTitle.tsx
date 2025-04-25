import React, { useEffect } from 'react';
import { useGameData } from '../../contexts/GameDataContext';
import styles from './PageTitle.module.css';

interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  const { gameData } = useGameData();

  useEffect(() => {
    // Get page title from config
    const pageTitle = gameData.config.pageTitle;

    // Set the document title
    document.title = pageTitle;
  }, [gameData]);

  return <h1 className={styles.title}>{children}</h1>;
};

export default PageTitle;