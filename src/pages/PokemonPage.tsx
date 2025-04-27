import React from 'react';
import { Pokemon, Type, Ability, EggGroup } from '../types/classes';
import { PokemonDetails } from '../components/details';
import { useGameData } from '../contexts/GameDataContext';
import { BaseDataPage, Column } from '../components/BaseDataPage';

const PokemonPage: React.FC = () => {
  const { gameData } = useGameData();

  // Get data from GameData
  const pokemonData = Object.values(gameData.pokemon.byId).filter(p => !p.ignored);
  const types = Object.values(gameData.types.byId);
  const abilities = Object.values(gameData.abilities.byId).filter(a => !a.ignored);
  const eggGroups = Object.values(gameData.eggGroups.byId);
  const stats = Object.values(gameData.gameConfig.stats.byId);

  // Create filter options
  const typeOptions = types.map((type: Type) => ({
    value: type.id,
    label: type.name
  }));

  const abilityOptions = abilities.filter(a => !a.ignored).map((ability: Ability) => ({
    value: ability.id,
    label: ability.name
  }));

  const eggGroupOptions = eggGroups.map((group: EggGroup) => ({
    value: group.id,
    label: group.name
  }));

  // Table columns
  const columns: Column<Pokemon>[] = [
    { header: 'ID', accessor: 'id' as keyof Pokemon, width: '6%', sortable: true },
    { header: 'Name', accessor: 'name' as keyof Pokemon, width: '28%', sortable: true },
    {
      header: 'Types',
      accessor: ((pokemon: Pokemon) => pokemon.types.map(t => t.name).join(', ')) as unknown as keyof Pokemon,
      width: '10%',
      sortable: true
    },
    {
      header: 'Abilities',
      accessor: ((pokemon: Pokemon) => pokemon.abilities.
        filter(a => !a.ignored).map(a => a.name).join(', ')) as unknown as keyof Pokemon,
      width: '10%',
      sortable: true
    },
    ...stats.map(stat => ({
      header: stat.name,
      accessor: ((pokemon: Pokemon) => pokemon.stats.stats.findById(stat.id)?.value) as unknown as keyof Pokemon,
      width: '6.5%',
      sortable: true
    })),
    {
      header: 'Total',
      accessor: ((pokemon: Pokemon) => pokemon.stats.total) as unknown as keyof Pokemon,
      width: '7%',
      sortable: true
    }
  ];

  return (
    <BaseDataPage<Pokemon>
      title="Pokémon"
      description="Browse and search for Pokémon"
      data={pokemonData}
      columns={columns}
      filterOptions={[...typeOptions, ...abilityOptions, ...eggGroupOptions]}
      searchFields={['name', 'abilities']}
      filterConfig={{
        type: { field: 'types', type: 'multi' },
        ability: { field: 'abilities', type: 'multi' },
        eggGroup: { field: 'eggGroups', type: 'multi' }
      }}
      itemsPerPage={gameData.config.pagination.pokemon}
      entityType="pokemon"
      DetailsComponent={PokemonDetails}
      searchPlaceholder="Search Pokémon by name or description"
      enableSessionStorage={true}
      sessionStoragePrefix="pokedex"
    />
  );
};

export default PokemonPage;