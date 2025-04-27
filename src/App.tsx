import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataLoader } from './components/DataLoader';
import { SortProvider } from './contexts/SortContext';
import AppRoutes from './routes';
import styles from './styles/App.module.css';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <div className={styles.app}>
          <DataLoader>
            <SortProvider>
              <AppRoutes />
            </SortProvider>
          </DataLoader>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
