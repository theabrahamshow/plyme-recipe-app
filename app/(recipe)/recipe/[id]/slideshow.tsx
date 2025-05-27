import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import ActionButton from '../../../../src/components/common/ActionButton';
import PaginationDots from '../../../../src/components/common/PaginationDots';
import IngredientModal from '../../../../src/components/common/IngredientModal';

// Mock data for recipes with multiple images per recipe
const mockRecipes = [
  {
    id: '1',
    title: 'Greek Yogurt Bowl',
    images: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=800&fit=crop',
  ],
  },
  {
    id: '2',
    title: 'Air-Fryer Tenders',
    images: [
    'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=800&fit=crop',
  ],
  },
  {
    id: '3',
    title: 'Pizza Buns',
    images: [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=800&fit=crop',
  ],
  },
  {
    id: '4',
    title: 'Lazy Chana',
    images: [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=800&fit=crop',
  ],
  },
  {
    id: '5',
    title: 'Smashed Avo',
    images: [
    'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=800&fit=crop',
  ],
  },
  {
    id: '6',
    title: 'Air-Fryer Cookies',
    images: [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=800&fit=crop',
  ],
  },
  {
    id: '7',
    title: 'Glow-Up Ramen',
    images: [
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=800&fit=crop',
  ],
  },
  {
    id: '8',
    title: 'Pasta Night',
    images: [
    'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=800&fit=crop',
  ],
  },
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Individual Recipe Component (for each vertical slide)
const RecipeSlide = ({ recipe, isActive, router }: { recipe: any; isActive: boolean; router: any }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);
  const stepFlatListRef = useRef<FlatList>(null);

  const handleStepScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentStepIndex(roundIndex);
  };

  const handleLike = () => {
    console.log(`Like pressed for recipe ${recipe.id}`);
  };

  const handleBookmark = () => {
    console.log(`Bookmark pressed for recipe ${recipe.id}`);
  };

  const handleCart = () => {
    console.log(`Cart pressed for recipe ${recipe.id}`);
    setIsIngredientModalVisible(true);
  };

  const handleShare = () => {
    console.log(`Share pressed for recipe ${recipe.id}`);
  };

  const handleProfile = () => {
    console.log(`Profile pressed for recipe ${recipe.id}`);
    // Navigate to creator profile - for now, we'll use creator ID '1' for all recipes
    // In a real app, this would be recipe.creatorId
    router.push(`/creator/1`);
  };

  return (
    <View style={styles.recipeSlide}>
      {/* Horizontal FlatList for recipe steps */}
      <FlatList
        ref={stepFlatListRef}
        data={recipe.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleStepScroll}
        keyExtractor={(item, index) => `${recipe.id}-step-${index}`}
        renderItem={({ item: imageUrl }) => (
          <View style={styles.stepSlide}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
          </View>
        )}
        scrollEnabled={isActive} // Only allow horizontal scrolling when this recipe is active
      />



      {/* Pagination Dots for Steps */}
      <View style={styles.paginationContainer}>
        <PaginationDots total={recipe.images.length} current={currentStepIndex} />
      </View>

      {/* Action Buttons Panel */}
      <View style={styles.actionPanel}>
        <ActionButton
          icon="user"
          onPress={handleProfile}
          hasAvatar={true}
          size={52}
        />
        <ActionButton
          icon="heart"
          onPress={handleLike}
          size={52}
        />
        <ActionButton
          icon="bookmark"
          onPress={handleBookmark}
          size={52}
        />
        <ActionButton
          icon="shopping-cart"
          onPress={handleCart}
          hasShadow={true}
          size={52}
        />
        <ActionButton
          icon="share"
          onPress={handleShare}
          size={52}
        />
      </View>

      {/* Ingredient Modal */}
      <IngredientModal
        isVisible={isIngredientModalVisible}
        onClose={() => setIsIngredientModalVisible(false)}
        recipeTitle={recipe.title}
        servings={2}
        calories={350}
        recipeImage={recipe.images[0]}
      />
    </View>
  );
};

export default function SlideshowScreen() {
  const { id: recipeId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const verticalFlatListRef = useRef<FlatList>(null);

  // Find starting recipe index based on the ID from route params
  const startingIndex = recipeId ? mockRecipes.findIndex(recipe => recipe.id === recipeId) : 0;

  // Set initial recipe index
  React.useEffect(() => {
    if (startingIndex >= 0) {
      setCurrentRecipeIndex(startingIndex);
    }
  }, [startingIndex]);

  const handleVerticalScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.height;
    const index = event.nativeEvent.contentOffset.y / slideSize;
    const roundIndex = Math.round(index);
    setCurrentRecipeIndex(roundIndex);
  };

  const renderRecipe = useCallback(({ item: recipe, index }: { item: any; index: number }) => {
    const isActive = index === currentRecipeIndex;
    return <RecipeSlide recipe={recipe} isActive={isActive} router={router} />;
  }, [currentRecipeIndex, router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Vertical FlatList for recipes */}
      <FlatList
        ref={verticalFlatListRef}
        data={mockRecipes}
        vertical
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleVerticalScroll}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipe}
        initialScrollIndex={startingIndex >= 0 ? startingIndex : 0}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  recipeSlide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  stepSlide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },

  paginationContainer: {
    position: 'absolute',
    bottom: 120, // Adjusted for new 80px nav bar height + padding
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionPanel: {
    position: 'absolute',
    right: 12, // 334px from left in 390px screen ≈ 12px from right
    top: 312,
    width: 52, // Updated for larger button size
    gap: 20, // TikTok-style spacing
  },

}); 