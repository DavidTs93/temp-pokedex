import React from 'react';
import { Move, Type } from '../types/classes';
import { MoveDetails } from '../components/details';
import { useGameData } from '../contexts/GameDataContext';
import { BaseDataPage, Column } from '../components/BaseDataPage';

const MovesPage: React.FC = () => {
  const { gameData } = useGameData();

  // Get data from GameData
  const movesData = Object.values(gameData.moves.byId);
  const types = Object.values(gameData.types.byId);
  const categories = Object.values(gameData.gameConfig.moveCategories.byId);

  // Create filter options
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    ...types.map((type: Type) => ({
      value: type.id,
      label: type.name,
      color: type.color
    }))
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(category => ({
      value: category.id,
      label: category.name
    }))
  ];

  // Table columns
  const columns: Column<Move>[] = [
    { header: 'Name', accessor: 'name' as keyof Move, width: '16%', sortable: true },
    {
      header: 'Type',
      accessor: ((move: Move) => move.types[0].name) as unknown as keyof Move,
      width: '10%',
      sortable: true
    },
    {
      header: 'Split',
      accessor: ((move: Move) => move.category.name) as unknown as keyof Move,
      width: '7%',
      sortable: true
    },
    { header: 'Power', accessor: 'power' as keyof Move, width: '8%', sortable: true },
    {
      header: 'Acc.',
      accessor: ((move: Move) => {
        const acc = move.accuracy;
        return (acc <= 0 || acc >= 100) ? '—' : acc;
      }) as unknown as keyof Move,
      width: '7%',
      sortable: true,
      sortValue: (move: Move) => {
        return move.accuracy <= 0 || move.accuracy >= 100 ? 101 : move.accuracy;
      }
    },
    { header: 'PP', accessor: 'pp' as keyof Move, width: '6%', sortable: true },
    {
      header: 'Effect',
      accessor: ((move: Move) => {
        if (!move.effect) return '';
        return move.effect.effectType.name;
      }) as unknown as keyof Move,
      width: '12%',
      sortable: true
    },
    {
      header: 'Effect%',
      accessor: ((move: Move) => {
        const chance = move.effect?.chance;
        return !chance ? '' : (chance <= 0 || chance >= 100 ? '—' : chance);
      }) as unknown as keyof Move,
      width: '9%',
      sortable: true,
      sortValue: (move: Move) => {
        const chance = move.effect?.chance;
        return !chance ? 0 : (chance <= 0 || chance >= 100 ? 101 : chance);
      }
    },
    { header: 'Description', accessor: 'description' as keyof Move, width: '25%', sortable: true }
  ];

  return (
    <BaseDataPage<Move>
      title="Moves"
      description="Browse and search for moves"
      data={movesData}
      columns={columns}
      filterOptions={[...typeOptions, ...categoryOptions]}
      searchFields={['name', 'description']}
      filterConfig={{
        type: { field: 'type', type: 'multi' },
        category: { field: 'category', type: 'multi' }
      }}
      itemsPerPage={gameData.config.pagination.moves}
      entityType="move"
      DetailsComponent={MoveDetails}
      searchPlaceholder="Search moves by name or description"
      enableSessionStorage={true}
      sessionStoragePrefix="moves"
    />
  );
};

export default MovesPage;