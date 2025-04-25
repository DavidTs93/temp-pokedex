import React, { useState } from 'react';
import { Pokemon, Type } from '../../../types/classes';
import styles from './PokemonDetails.module.css';

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onTypeClick?: (type: Type) => void;
  onAbilityClick?: (ability: string) => void;
  onMoveClick?: (move: string) => void;
  onEggGroupClick?: (eggGroup: string) => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  pokemon,
  onTypeClick,
  onAbilityClick,
  onMoveClick,
  onEggGroupClick
}) => {
  const [selectedType, setSelectedType] = useState<Type | undefined>();

  const handleTypeClick = (type: Type) => {
    setSelectedType(type);
    onTypeClick?.(type);
  };

  return (
    <div className={styles.pokemonDetails}>
      <div className={styles.pokemonHeader}>
        <div className={styles.pokemonImage}>
          {pokemon.spriteUrl && <img src={pokemon.spriteUrl} alt={pokemon.species} />}
        </div>
        <div className={styles.pokemonInfo}>
          <h2>{pokemon.species}</h2>
          <div className={styles.pokemonTypes}>
            {pokemon.types.map((type) => (
              <span
                key={type.id}
                className={`${styles.type} ${type.id}`}
                onClick={() => handleTypeClick(type)}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.pokemonInfo}>
        <div className={styles.pokemonStats}>
          {Object.values(pokemon.stats.stats.byId).map((ps) => (
            <div key={ps.stat.id} className={styles.stat}>
              <span className={styles.statName}>{ps.stat.name}</span>
              <span className={styles.statValue}>{ps.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.detailSection}>
          <h3>Abilities</h3>
          <div className={styles.pokemonAbilities}>
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.id}
                className={`${styles.ability} ${onAbilityClick ? styles.clickable : ''}`}
                onClick={() => onAbilityClick?.(ability.id)}
              >
                {ability.name}
              </span>
            ))}
          </div>
        </div>

        {pokemon.moves?.levelUp && (
          <div className={styles.detailSection}>
            <h3>Moves</h3>
            <div className={styles.pokemonMoves}>
              {pokemon.moves.levelUp.map((move) => (
                <span
                  key={move.move.id}
                  className={`${styles.move} ${onMoveClick ? styles.clickable : ''}`}
                  onClick={() => onMoveClick?.(move.move.id)}
                >
                  {move.move.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {pokemon.eggGroups && pokemon.eggGroups.length > 0 && (
          <div className={styles.detailSection}>
            <h3>Egg Groups</h3>
            <div className={styles.pokemonEggGroups}>
              {pokemon.eggGroups.map((eggGroup) => (
                <span
                  key={eggGroup.id}
                  className={`${styles.eggGroup} ${onEggGroupClick ? styles.clickable : ''}`}
                  onClick={() => onEggGroupClick?.(eggGroup.id)}
                >
                  {eggGroup.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;