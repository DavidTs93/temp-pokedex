import React from 'react';
import { Pokemon, Type, Ability, Move, EggGroup } from '../../../types/classes';
import { useModal } from '../../../contexts/ModalContext';
import styles from './PokemonDetails.module.css';
import appStyles from '../../../styles/App.module.css';
import modalStyles from '../../Modal/Modal.module.css';

export function TypeDisplay(value: Type, keyProps?: Readonly<Record<string, any>>, extraClass?: string) {
  return value.sprite ?
    <img {...keyProps || {}} src={value.sprite} alt={value.name} className={`${styles.typeSprite} ${extraClass}`} /> :
    <span {...keyProps || {}} className={`${appStyles.typeBadge} ${extraClass}`}
      style={{ backgroundColor: value.color }}>
      {value.name}
    </span>
}

const PokemonDetails: React.FC<Pokemon> = (pokemon) => {
  const { openModal } = useModal();

  const handleTypeClick = (type: Type) => {
    openModal(type, false);
  };

  const handleAbilityClick = (ability: Ability) => {
    openModal(ability, false);
  };

  const handleMoveClick = (move: Move) => {
    openModal(move, false);
  };

  const handleEggGroupClick = (eggGroup: EggGroup) => {
    openModal(eggGroup, false);
  };

  return (
    <div className={styles.pokemonDetails}>
      <div className={styles.pokemonHeader}>
        {pokemon.sprite && <img src={pokemon.sprite} alt={pokemon.name} className={styles.pokemonSprite} />}
        <div className={styles.pokemonInfo}>
          <div className={styles.detailSection}>
            <h6 className={modalStyles.innerHeader}>Types</h6>
            <div className={`${appStyles.arrContainer} ${appStyles.flexRow} ${styles.pokemonTypes}`}>
              {pokemon.types.map((type) =>
                TypeDisplay(type, { onClick: () => handleTypeClick(type) }, appStyles.clickable)
              )}
            </div>
          </div>
          {pokemon.eggGroups && pokemon.eggGroups.length > 0 && (
            <div className={styles.detailSection}>
              <h6 className={modalStyles.innerHeader}>Egg Groups</h6>
              <div className={`${appStyles.arrContainer} ${appStyles.flexRow} ${styles.pokemonEggGroups}`}>
                {pokemon.eggGroups.map((eggGroup) => (
                  <span
                    key={eggGroup.id}
                    className={`${styles.eggGroup} ${appStyles.clickable}`}
                    onClick={() => handleEggGroupClick(eggGroup)}
                  >
                    {eggGroup.name}
                  </span>
                ))}
              </div>
            </div>
          )}
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
            {pokemon.abilities.filter(a => !a.ignored).map((ability) => (
              <span
                key={ability.id}
                className={`${styles.ability} ${appStyles.clickable}`}
                onClick={() => handleAbilityClick(ability)}
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
              {pokemon.moves.levelUp.filter(m => !m.move.ignored).map((move) => (
                <span
                  key={move.move.id}
                  className={`${styles.move} ${appStyles.clickable}`}
                  onClick={() => handleMoveClick(move.move)}
                >
                  {move.move.name}
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