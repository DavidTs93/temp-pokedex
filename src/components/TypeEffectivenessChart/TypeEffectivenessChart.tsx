import React from 'react';
import { Type, TypeEffectivenessLevel } from '../../types/classes';
import { useGameData } from '../../contexts/GameDataContext';
import styles from './TypeEffectivenessChart.module.css';

interface TypeEffectivenessChartProps {
  attackingType?: Type;
  defendingType?: Type;
  onTypeClick?: (type: Type) => void;
}

const TypeEffectivenessChart: React.FC<TypeEffectivenessChartProps> = ({
  attackingType,
  defendingType,
  onTypeClick
}) => {
  const { gameData } = useGameData();

  // Get all types from game data
  const types = gameData.types.values;

  // Helper function to get effectiveness level between two types
  const getEffectivenessLevel = (attacker: Type, defender: Type): TypeEffectivenessLevel | undefined => {
    return gameData.typeEffectiveness.findByAD(attacker, defender)?.level;
  };

  return (
    <div className={styles.chart}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Type Effectiveness</h3>
      </div>
      <div className={styles.chartContent}>
        <table>
          <thead>
            <tr>
              <th>Attacking ↓ / Defending →</th>
              {types.map(type => (
                <th
                  key={type.id}
                  className={`${styles.typeHeader} ${defendingType?.id === type.id ? styles.selected : ''}`}
                  onClick={() => onTypeClick?.(type)}
                  style={{ backgroundColor: type.color }}
                >
                  {type.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {types.map(attacker => (
              <tr key={attacker.id}>
                <td
                  className={`${styles.typeHeader} ${attackingType?.id === attacker.id ? styles.selected : ''}`}
                  onClick={() => onTypeClick?.(attacker)}
                  style={{ backgroundColor: attacker.color }}
                >
                  {attacker.name}
                </td>
                {types.map(defender => {
                  const level = getEffectivenessLevel(attacker, defender);
                  return (
                    <td
                      key={`${attacker.id}-${defender.id}`}
                      className={styles.effectivenessCell}
                      style={{
                        backgroundColor: level?.color || 'transparent',
                        color: level?.immunity ? '#fff' : '#000'
                      }}
                    >
                      {level?.multiplier || '1'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TypeEffectivenessChart;