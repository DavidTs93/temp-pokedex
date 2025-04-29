import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavigation from '../components/Navigation/TopNavigation/TopNavigation';
import PokemonPage from './PokemonPage';
import MovesPage from './MovesPage';
import AbilitiesPage from './AbilitiesPage';
import ItemsPage from './ItemsPage';
import LocationsPage from './LocationsPage';
import styles from '../styles/App.module.css';
// Define a map of page components
const PAGE_COMPONENTS = {
  pokemon: PokemonPage,
  moves: MovesPage,
  abilities: AbilitiesPage,
  items: ItemsPage,
  locations: LocationsPage
};

// Get valid page keys from the map
const VALID_PAGES = Object.keys(PAGE_COMPONENTS);

const MainPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<string>('pokemon');

  // Parse the query parameter to determine the current page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    if (!pageParam || !VALID_PAGES.includes(pageParam)) {
      params.set('page', 'pokemon');
      navigate(`?${params.toString()}`, { replace: true });
    } else {
      setCurrentPage(pageParam);
    }
  }, [location.search, navigate]);

  // Render the appropriate page based on the current page state
  const renderPage = () => {
    const PageComponent = PAGE_COMPONENTS[currentPage as keyof typeof PAGE_COMPONENTS] || PAGE_COMPONENTS.pokemon;
    return <PageComponent />;
  };

  return (
    <div className={styles.mainPage}>
      <TopNavigation />
      <main className={styles.mainContent}>
        {renderPage()}
      </main>
    </div>
  );
};

export default MainPage;