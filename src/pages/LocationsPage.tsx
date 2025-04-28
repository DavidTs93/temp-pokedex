import React from 'react';
import { Location } from '../types/classes';
import { LocationDetails } from '../components/Details';
import { useGameData } from '../contexts/GameDataContext';
import { BaseDataPage, Column } from '../components/BaseDataPage';

const LocationsPage: React.FC = () => {
  const { gameData } = useGameData();

  // Get data from GameData
  const locations = Object.values(gameData.locations.byId);
  const regions = Object.values(gameData.gameConfig.regions.byId);

  // Filter options
  const filterOptions = regions.map(region => ({
    value: region.id,
    label: region.name
  }));

  // Table columns
  const columns: Column<Location>[] = [
    { header: 'Name', accessor: 'name' as keyof Location, width: '60%', sortable: true },
    {
      header: 'Type',
      accessor: ((location: Location) => location.wilderness ? 'Wilderness' : 'City') as unknown as keyof Location,
      width: '40%',
      sortable: true
    }
  ];

  return (
    <BaseDataPage<Location>
      title="Locations"
      description="Browse and search for locations"
      data={locations}
      columns={columns}
      filterOptions={filterOptions}
      searchFields={['name', 'description']}
      filterConfig={{
        region: { field: 'region', type: 'multi' }
      }}
      itemsPerPage={gameData.config.pagination.locations}
      entityType="location"
      DetailsComponent={LocationDetails}
      searchPlaceholder="Search locations by name or description"
      enableSessionStorage={true}
      sessionStoragePrefix="locations"
    />
  );
};

export default LocationsPage;