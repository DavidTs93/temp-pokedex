import React from 'react';
import { Pokemon, Type, Ability, EggGroup } from '../types/classes';
import { PokemonDetails } from '../components/Details';
import { useGameData } from '../contexts/GameDataContext';
import { BaseDataPage, Column } from '../components/BaseDataPage';
import appStyles from '../styles/App.module.css';

const PokemonPage: React.FC = () => {
  const { gameData } = useGameData();

  // Get data from GameData
  const pokemonData = gameData.pokemon.values.filter(p => !p.ignored && !p.forme);
  const types = gameData.types.values;
  const abilities = gameData.abilities.allValues.filter(a => !a.ignored);
  const eggGroups = gameData.eggGroups.allValues;
  const stats = gameData.gameConfig.stats.values;

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

  class HiddenAbility {
    constructor(public readonly ability: Ability) {}

    toDisplay() {
      return <span className={appStyles.hiddenAbility }>{this.ability.name}</span>;
    }
  }

  // Table columns
  const columns: Column<Pokemon>[] = [
    { header: 'ID', accessor: 'id' as keyof Pokemon, width: '6%', sortable: true },
    {
      header: 'Name',
      accessor: ((pokemon: Pokemon) => pokemon) as unknown as keyof Pokemon,
      width: '28%',
      sortable: true,
      sortValue: (pokemon: Pokemon) => pokemon.name
    },
    {
      header: 'Types',
      accessor: ((pokemon: Pokemon) => pokemon.types) as unknown as keyof Pokemon,
      width: '10%',
      sortable: true,
      sortValue: (pokemon: Pokemon) => pokemon.types.map(t => t.name).join(' ')
    },
    {
      header: 'Abilities',
      accessor: ((pokemon: Pokemon) =>
        [
          ...pokemon.abilities.filter(a => !a.ignored),
          ...(pokemon.hiddenAbilities?.filter(a => !a.ignored).map(a => new HiddenAbility(a)) || [])
        ]
      ) as unknown as keyof Pokemon,
      width: '10%',
      sortable: true
    },
    ...stats.map(stat => ({
      header: stat.abbreviation,
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
      isWide={true}
      searchPlaceholder="Search Pokémon by name or description"
      enableSessionStorage={true}
      sessionStoragePrefix="pokemon"
    />
  );
};

export default PokemonPage;