import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UseModalOptions {
  entityType: 'pokemon' | 'move' | 'item' | 'location' | 'ability';
  enableDeepLinking?: boolean;
}

export function useModal({ entityType, enableDeepLinking = false }: UseModalOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page and ID from query parameters
  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get('page') || 'pokedex';
  const idParam = queryParams.get('id');

  // Handle deep linking - check URL params on mount and when they change
  useEffect(() => {
    if (enableDeepLinking) {
      if (idParam) {
        setSelectedId(idParam);
        setIsOpen(true);
      } else if (isOpen) {
        // If modal is open but no ID in URL, close it
        setIsOpen(false);
      }
    }
  }, [idParam, enableDeepLinking, isOpen]);

  // Open modal with entity ID
  const openModal = (id: string | number) => {
    setSelectedId(id);
    setIsOpen(true);

    if (enableDeepLinking) {
      // Update URL with ID parameter
      const newQueryParams = new URLSearchParams(location.search);
      newQueryParams.set('id', String(id));
      navigate(`?${newQueryParams.toString()}`, { replace: true });
    }
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);

    if (enableDeepLinking) {
      // Remove the ID from the URL
      const newQueryParams = new URLSearchParams(location.search);
      newQueryParams.delete('id');
      navigate(`?${newQueryParams.toString()}`, { replace: true });
    }
  };

  return {
    isOpen,
    selectedId,
    openModal,
    closeModal
  };
}