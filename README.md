# Abstract Pokédex Site

This is an abstract Pokédex implementation that can be used as a base for any game-specific Pokédex site. It provides a complete, responsive, and accessible interface for browsing Pokémon, moves, items, locations, and abilities.

## Important Note

This repository contains **only** the abstract implementation. It does not include any game-specific data. Game-specific projects must:

1. Import this project as a dependency
2. Provide their own data following the template structure
3. Initialize the site with their configuration

## Features

- Responsive design that works on all devices
- Dark mode support
- Accessible UI with keyboard navigation
- Search and filter functionality
- Pagination with configurable items per page
- Modal views with deep linking support
- Loading states and animations
- Fully customizable game data

## How to Use

1. Install this package:
```bash
npm install @your-org/abstract-pokedex
```

2. Create your data files following the templates in the `template/` folder:
- `pokedex.json`: Contains all your game-specific data
- `config.json`: Contains site configuration, theming, and game data customization

3. Initialize the site in your HTML:
```html
<script src="path/to/pokedex/dist/index.js"></script>
<script>
  // Initialize GameData with your data
  window.GameData = {
    dataArrays: {
      game: yourData
    }
  };

  // Run the Pokédex site
  window.Pokedex.runSite({
    config: 'path/to/your/config.json'
  });
</script>
```

## Data Structure

### GameData

The `GameData.dataArrays.game` object must contain the following collections:

```typescript
interface GameData {
  pokemon: Pokemon[];
  moves: Move[];
  items: Item[];
  locations: Location[];
  abilities: Ability[];
  eggGroups?: EggGroup[];
  effects?: MoveEffect[];
}
```

See `template/pokedex.json` for the complete data structure.

### Configuration

The site can be configured using `config.json`. Options include:

- Site title and theme colors
- Feature flags
- Pagination settings
- Game data customization

#### Pagination Settings

The `config.json` file includes a `pagination` section that allows you to customize the number of items displayed per page for each section:

```json
{
  "site": {
    "pagination": {
      "pokemon": 12,
      "moves": 15,
      "items": 10,
      "locations": 8,
      "abilities": 10
    }
  }
}
```

#### Game Data Customization

The `config.json` file includes a `gameData` section that allows you to customize various game-specific data:

1. **Types**
```json
{
  "types": [
    { "id": "normal", "name": "Normal", "color": "#HEXCOLOR" },
    { "id": "fire", "name": "Fire", "color": "#HEXCOLOR" },
    // Additional types...
  ]
}
```

2. **Move Categories**
```json
{
  "categories": {
    "moves": [
      { "id": "physical", "name": "Physical" },
      { "id": "special", "name": "Special" },
      { "id": "status", "name": "Status" }
    ]
  }
}
```

3. **Item Categories**
```json
{
  "categories": {
    "items": [
      { "id": "berry", "name": "Berry" },
      { "id": "battle-item", "name": "Battle Item" },
      // Additional item categories...
    ]
  }
}
```

4. **Regions**
```json
{
  "regions": [
    { "id": "kanto", "name": "Kanto" },
    { "id": "johto", "name": "Johto" },
    // Additional regions...
  ]
}
```

5. **Stats**
```json
{
  "stats": [
    { "id": "hp", "name": "HP", "abbr": "HP" },
    { "id": "attack", "name": "Attack", "abbr": "Atk" },
    // Additional stats...
  ]
}
```

6. **Name Prefixes**
```json
{
  "namePrefixes": {
    "effect": "EFFECT_",
    "eggGroup": "EGG_GROUP_"
  }
}
```

## Development

To run the site locally for development:

```bash
npm install
npm start
```

## Building

To build the site for production:

```bash
npm run build
```

To preview the build output:

```bash
npm run preview
```

## Contributing

This is an abstract implementation. Please do not submit pull requests that include game-specific data. Instead:

1. Fork this repository
2. Create your game-specific repository
3. Import this project and add your data there

## License

MIT License - See LICENSE file for details

# Pokédex Application

A modern Pokédex application built with React and TypeScript.

## Type Effectiveness System

The application uses a flexible type effectiveness system that allows for detailed configuration of how different Pokémon types interact with each other.

### Type Effectiveness Structure

Each type in the game has an `effectiveness` array that defines how effective that type is against other types. The effectiveness is defined by a `level` value:

- `level: 0` - The defending type is immune to attacks from this type (0x damage)
- `level: 1` - The defending type is weak to attacks from this type (2x damage)
- `level: 2` - The defending type is very weak to attacks from this type (4x damage)
- `level: -1` - The defending type resists attacks from this type (1/2x damage)
- `level: -2` - The defending type strongly resists attacks from this type (1/4x damage)
- No entry - The defending type takes normal damage from this type (1x damage)

### Example

```json
{
  "id": "fire",
  "name": "Fire",
  "color": "#F08030",
  "description": "Fire-type moves are powerful and can cause burns.",
  "sprite": "/assets/types/fire.png",
  "effectiveness": [
    { "type": "fire", "level": -1 },
    { "type": "water", "level": -1 },
    { "type": "grass", "level": 1 },
    { "type": "ice", "level": 1 },
    { "type": "bug", "level": 1 },
    { "type": "rock", "level": -1 },
    { "type": "dragon", "level": -1 },
    { "type": "steel", "level": 1 }
  ]
}
```

In this example:
- Fire-type moves are resisted by Fire, Water, Rock, and Dragon types
- Fire-type moves are super effective against Grass, Ice, Bug, and Steel types
- All other types take normal damage from Fire-type moves
- The `sprite` property provides a path to the type's sprite image, which will be used instead of the name + color if present

### Calculating Damage

The damage multiplier is calculated as 2^level:
- level 0 = 2^0 = 1 (immune)
- level 1 = 2^1 = 2 (super effective)
- level 2 = 2^2 = 4 (very super effective)
- level -1 = 2^-1 = 1/2 (resisted)
- level -2 = 2^-2 = 1/4 (strongly resisted)
- no entry = 2^0 = 1 (neutral)

## Features

- Browse Pokémon, moves, items, locations, and abilities
- Search and filter functionality
- Detailed information for each entity
- Responsive design
- Type effectiveness calculations
- Configurable game data

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `contexts/` - React contexts
  - `pages/` - Page components
  - `styles/` - CSS styles
  - `types.ts` - TypeScript interfaces
  - `utils/` - Utility functions
- `public/` - Static files
  - `template/` - Template data files
