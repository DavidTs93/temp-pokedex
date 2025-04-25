import React from 'react';
import { Location } from '../../../types/classes';
import styles from './LocationDetails.module.css';

const LocationDetails: React.FC<Location> = (location) => {
  return (
    <div className={styles.locationDetails}>
      <div className={styles.locationHeader}>
        <h3 className={styles.locationName}>{location.name}</h3>
        {location.region && <span className={styles.regionBadge}>{location.region.name}</span>}
      </div>

      {location.description && (
        <div className={styles.detailSection}>
          <h3>Description</h3>
          <p>{location.description}</p>
        </div>
      )}

      {location.pokemonEncounters && location.pokemonEncounters.length > 0 && (
        <div className={styles.detailSection}>
          <h3>Available Pokémon</h3>
          <div className={styles.pokemonList}>
            <ul>
              {location.pokemonEncounters.map((encounter) => (
                <li key={encounter.pokemon.id} className={styles.encounterItem}>
                  <span className={styles.pokemonId}>Pokémon ID: {encounter.pokemon.id}</span>
                  <div className={styles.encounterDetails}>
                    <span style={{ color: encounter.method.color }}>
                      {encounter.method.name}
                    </span>
                    {encounter.time && (
                      <span style={{ color: encounter.time.color }}>
                        {encounter.time.name}
                      </span>
                    )}
                    {encounter.season && (
                      <span style={{ color: encounter.season.color }}>
                        {encounter.season.name}
                      </span>
                    )}
                    <span>{encounter.chance}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {location.specialEncounters && location.specialEncounters.length > 0 && (
        <div className={styles.detailSection}>
          <h3>Special Encounters</h3>
          <div className={styles.pokemonList}>
            <ul>
              {location.specialEncounters.map((pokemon) => (
                <li key={pokemon.id}>
                  {pokemon.species}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {location.items && location.items.length > 0 && (
        <div className={styles.detailSection}>
          <h3>Available Items</h3>
          <div className={styles.itemsList}>
            <ul>
              {location.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;