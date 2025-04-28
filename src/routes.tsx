import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopNavigation from './components/Navigation/TopNavigation/TopNavigation';
import BottomNavigation from './components/Navigation/BottomNavigation/BottomNavigation';
import MainPage from './pages/MainPage';
import styles from './styles/App.module.css';

const AppRoutes: React.FC = () => {
  return (
    <div className={styles.app}>
      <TopNavigation />
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default AppRoutes;