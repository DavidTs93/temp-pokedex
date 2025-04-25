import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';
import MainPage from './pages/MainPage';

const AppRoutes: React.FC = () => {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
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