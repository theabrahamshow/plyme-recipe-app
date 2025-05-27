import { CARD_HEIGHTS } from '../constants/cardHeights';

export interface Recipe {
  id: string;
  title: string;
  imageSource: any;
  tags: string[];
  prepTime: number;
  calories: number;
}

export const mockRecipesData: Recipe[] = [
  { 
    id: '1', 
    title: 'Delicious Pasta', 
    imageSource: require('../../assets/images/recipe1.png'),
    tags: ['italian', 'pasta', 'dinner', 'vegetarian'],
    prepTime: 30,
    calories: 450
  },
  { 
    id: '2', 
    title: 'Fresh Salad', 
    imageSource: require('../../assets/images/recipe2.png'),
    tags: ['healthy', 'vegan', 'salad', 'lunch', 'quick'],
    prepTime: 15,
    calories: 200
  },
  {
    id: '3', 
    title: 'Grilled Chicken', 
    imageSource: require('../../assets/images/recipe3.png'),
    tags: ['protein', 'chicken', 'dinner', 'keto'],
    prepTime: 25,
    calories: 350
  },
  {
    id: '4', 
    title: 'Chocolate Cake', 
    imageSource: require('../../assets/images/recipe4.png'),
    tags: ['dessert', 'chocolate', 'sweet', 'baking'],
    prepTime: 60,
    calories: 520
  },
  {
    id: '5', 
    title: 'Seafood Platter', 
    imageSource: require('../../assets/images/recipe5.png'),
    tags: ['seafood', 'fish', 'dinner', 'protein', 'keto'],
    prepTime: 40,
    calories: 380
  },
  {
    id: '6', 
    title: 'Veggie Bowl', 
    imageSource: require('../../assets/images/recipe6.png'),
    tags: ['vegan', 'healthy', 'bowl', 'lunch', 'vegetables'],
    prepTime: 20,
    calories: 280
  },
  {
    id: '7', 
    title: 'Breakfast Toast', 
    imageSource: require('../../assets/images/recipe7.png'),
    tags: ['breakfast', 'toast', 'quick', 'vegetarian'],
    prepTime: 10,
    calories: 320
  },
  {
    id: '8', 
    title: 'Fruit Smoothie', 
    imageSource: require('../../assets/images/recipe8.png'),
    tags: ['smoothie', 'fruit', 'healthy', 'breakfast', 'vegan'],
    prepTime: 5,
    calories: 180
  },
];

// Function to get height based on position in grid
const getHeightForPosition = (columnIndex: number, itemIndex: number): number => {
  // Left column (0): alternating TALL, SHORT, TALL, SHORT...
  // Right column (1): alternating SHORT, TALL, SHORT, TALL...
  if (columnIndex === 0) {
    return itemIndex % 2 === 0 ? CARD_HEIGHTS.TALL : CARD_HEIGHTS.SHORT;
  } else {
    return itemIndex % 2 === 0 ? CARD_HEIGHTS.SHORT : CARD_HEIGHTS.TALL;
  }
};

// Helper function to create masonry layout with position-based heights
export const createMasonryData = (data: Recipe[]) => {
  const leftColumn: { recipe: Recipe; height: number }[] = [];
  const rightColumn: { recipe: Recipe; height: number }[] = [];

  data.forEach((item, index) => {
    // Simple alternating distribution
    if (index % 2 === 0) {
      const height = getHeightForPosition(0, leftColumn.length);
      leftColumn.push({ recipe: item, height });
    } else {
      const height = getHeightForPosition(1, rightColumn.length);
      rightColumn.push({ recipe: item, height });
    }
  });

  return { leftColumn, rightColumn };
}; 