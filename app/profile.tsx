import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Dimensions, 
  TouchableOpacity, 
  Text,
  Image
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '../src/components/common/RecipeCard';
import IngredientModal from '../src/components/common/IngredientModal';
import { mockRecipesData, createMasonryData, Recipe } from '../src/data/mockRecipes';

// Mock saved recipes data (subset of recipes that user has saved)
const savedRecipesData = [
  mockRecipesData[1], // Fresh Salad
  mockRecipesData[3], // Chocolate Cake
  mockRecipesData[5], // Veggie Bowl
  mockRecipesData[7], // Fruit Smoothie
  mockRecipesData[0], // Delicious Pasta
  mockRecipesData[2], // Grilled Chicken
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const { leftColumn, rightColumn } = createMasonryData(savedRecipesData);
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 16;
  const columnGap = 4;
  const columnWidth = (screenWidth - (horizontalPadding * 2) - columnGap) / 2;

  const handleCartPress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsIngredientModalVisible(true);
  };

  const renderColumn = (columnData: any[], isLeftColumn: boolean) => (
    <View style={[styles.column, { width: columnWidth }]}>
      {columnData.map((item, index) => (
        <View key={item.recipe.id} style={styles.cardWrapper}>
          <RecipeCard
            id={item.recipe.id}
            title={item.recipe.title}
            imageSource={item.recipe.imageSource}
            cardHeight={item.height}
            showCartButton={true}
            onCartPress={() => handleCartPress(item.recipe)}
          />
        </View>
      ))}
    </View>
  );

  const ProfileHeader = () => (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity style={styles.headerIcon}>
        <Ionicons name="help-circle-outline" size={24} color="#5A3929" />
      </TouchableOpacity>
      
      <View style={styles.headerRightIcons}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="notifications" size={24} color="#5A3929" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="settings" size={24} color="#5A3929" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ProfileInfo = () => (
    <View style={styles.profileContainer}>
      <View style={styles.avatarContainer}>
        <Image 
          source={require('../assets/images/recipe1.png')} 
          style={styles.avatar}
        />
      </View>
      
      <Text style={styles.username}>@mathew.third</Text>
      <Text style={styles.bio}>early beta user 🍳</Text>
      
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit profile</Text>
      </TouchableOpacity>
    </View>
  );

  const SavedRecipesSection = () => (
    <View style={styles.savedSection}>
      <View style={styles.savedHeader}>
        <Text style={styles.savedTitle}>Saved Recipes</Text>
        <View style={styles.underline} />
      </View>
      
      <View style={styles.masonryContainer}>
        {renderColumn(leftColumn, true)}
        {renderColumn(rightColumn, false)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={[{ key: 'profile' }]}
        renderItem={() => (
          <View>
            <ProfileHeader />
            <ProfileInfo />
            <SavedRecipesSection />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Ingredient Modal */}
      <IngredientModal
        isVisible={isIngredientModalVisible}
        onClose={() => setIsIngredientModalVisible(false)}
        recipeTitle={selectedRecipe?.title || ''}
        servings={2}
        calories={selectedRecipe?.calories || 350}
        recipeImage={selectedRecipe?.imageSource ? Image.resolveAssetSource(selectedRecipe.imageSource).uri : undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F7F7F7',
  },
  headerIcon: {
    padding: 8,
    borderRadius: 8,
  },
  headerRightIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 120,
    paddingTop: 24,
    paddingBottom: 32,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 99,
    height: 99,
    borderRadius: 49.5,
    borderWidth: 3,
    borderColor: '#E8E8E8',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1C20',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
  bio: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
    height: 17,
  },
  editButton: {
    backgroundColor: '#D2D1D0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
  savedSection: {
    paddingHorizontal: 17,
  },
  savedHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  savedTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1C20',
    marginBottom: 8,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
  underline: {
    width: 48,
    height: 2,
    backgroundColor: '#000000',
  },
  masonryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  column: {
    flex: 1,
  },
  cardWrapper: {
    marginBottom: 4,
  },
}); 