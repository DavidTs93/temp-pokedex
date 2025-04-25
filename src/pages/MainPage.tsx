import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import PokedexPage from './PokedexPage';
import MovesPage from './MovesPage';
import AbilitiesPage from './AbilitiesPage';
import ItemsPage from './ItemsPage';
import LocationsPage from './LocationsPage';

// Define a map of page components
const PAGE_COMPONENTS = {
  pokedex: PokedexPage,
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
  const [currentPage, setCurrentPage] = useState<string>('pokedex');

  // Parse the query parameter to determine the current page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    
    if (pageParam) {
      // Check if the page parameter is valid
      if (VALID_PAGES.includes(pageParam)) {
        setCurrentPage(pageParam);
      } else {
        // If the page parameter is invalid, redirect to the pokedex page
        console.log(`Invalid page parameter: ${pageParam}. Redirecting to pokedex.`);
        navigate('?page=pokedex', { replace: true });
      }
    } else {
      // If no page parameter is provided, set it to 'pokedex' and update the URL
      navigate('?page=pokedex', { replace: true });
    }
  }, [location.search, navigate]);

  // Render the appropriate page based on the current page state
  const renderPage = () => {
    const PageComponent = PAGE_COMPONENTS[currentPage as keyof typeof PAGE_COMPONENTS] || PAGE_COMPONENTS.pokedex;
    return <PageComponent />;
  };

  return (
    <div className="main-page">
      <Navigation />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
};

export default MainPage; 