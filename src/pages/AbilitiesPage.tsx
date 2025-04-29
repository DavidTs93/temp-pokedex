import React from 'react';
import { Ability } from '../types/classes';
import { AbilityDetails } from '../components/Details';
import { useGameData } from '../contexts/GameDataContext';
import { BaseDataPage, Column } from '../components/BaseDataPage';

const AbilitiesPage: React.FC = () => {
  const { gameData } = useGameData();

  // Get data from GameData
  const abilitiesData = gameData.abilities.allValues.filter(a => !a.ignored);

  // Table columns
  const columns: Column<Ability>[] = [
    { header: 'Name', accessor: 'name' as keyof Ability, width: '30%', sortable: true },
    { header: 'Description', accessor: 'description' as keyof Ability, width: '70%', sortable: true }
  ];

  return (
    <BaseDataPage<Ability>
      title="Abilities"
      description="Browse and search for abilities"
      data={abilitiesData}
      columns={columns}
      searchFields={['name', 'description']}
      itemsPerPage={gameData.config.pagination.abilities}
      entityType="ability"
      DetailsComponent={AbilityDetails}
      searchPlaceholder="Search abilities by name or description"
      enableSessionStorage={true}
      sessionStoragePrefix="abilities"
    />
  );
};

export default AbilitiesPage;