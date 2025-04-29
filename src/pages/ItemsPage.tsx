import React from 'react';
import { Item } from '../types/classes';
import { ItemDetails } from '../components/Details';
import { useGameData } from '../contexts/GameDataContext';
import { BaseDataPage, Column } from '../components/BaseDataPage';

const ItemsPage: React.FC = () => {
  const { gameData } = useGameData();

  // Get data from GameData
  const itemsData = gameData.items.values.filter(i => !i.ignored);
  const categories = gameData.itemCategories.allValues;

  // Create filter options
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(category => ({
      value: category.id,
      label: category.name
    }))
  ];

  // Table columns
  const columns: Column<Item>[] = [
    { header: 'Name', accessor: 'name' as keyof Item, width: '25%', sortable: true },
    {
      header: 'Category',
      accessor: ((item: Item) => item.category.name) as unknown as keyof Item,
      width: '15%',
      sortable: true
    },
    { header: 'Description', accessor: 'description' as keyof Item, width: '60%', sortable: true }
  ];

  return (
    <BaseDataPage<Item>
      title="Items"
      description="Browse and search for items"
      data={itemsData}
      columns={columns}
      filterOptions={categoryOptions}
      searchFields={['name', 'description']}
      filterConfig={{
        category: { field: 'category', type: 'multi' }
      }}
      itemsPerPage={gameData.config.pagination.items}
      entityType="item"
      DetailsComponent={ItemDetails}
      searchPlaceholder="Search items by name or description"
      enableSessionStorage={true}
      sessionStoragePrefix="items"
    />
  );
};

export default ItemsPage;