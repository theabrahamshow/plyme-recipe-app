import React from 'react';
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
import { useLocalSearchParams, router } from 'expo-router';
import RecipeCard from '../../../src/components/common/RecipeCard';
import { mockRecipesData, createMasonryData } from '../../../src/data/mockRecipes';

// Mock creator data
const creatorsData = {
  '1': {
    id: '1',
    username: '@mathew.third',
    followers: 740,
    avatar: require('../../../assets/images/creator-avatar.png'),
    recipes: [
      mockRecipesData[0], // Delicious Pasta
      mockRecipesData[2], // Grilled Chicken
      mockRecipesData[4], // Seafood Platter
      mockRecipesData[6], // Breakfast Toast
    ]
  },
  // Add more creators as needed
};

export default function CreatorProfileScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const creator = creatorsData[id as string] || creatorsData['1']; // Fallback to first creator
  
  const { leftColumn, rightColumn } = createMasonryData(creator.recipes);
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 16;
  const columnGap = 4;
  const columnWidth = (screenWidth - (horizontalPadding * 2) - columnGap) / 2;

  const CreatorHeader = () => (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#5A3929" />
      </TouchableOpacity>
    </View>
  );

  const CreatorInfo = () => (
    <View style={styles.profileContainer}>
      <View style={styles.avatarContainer}>
        <Image 
          source={creator.avatar} 
          style={styles.avatar}
        />
      </View>
      
      <Text style={styles.username}>{creator.username}</Text>
      <Text style={styles.followers}>{creator.followers} followers</Text>
      
      <TouchableOpacity style={styles.followButton}>
        <Ionicons name="person-add" size={16} color="#FFFFFF" style={styles.followIcon} />
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );

  const RecipesSection = () => (
    <View style={styles.recipesSection}>
      <View style={styles.recipesTitleContainer}>
        <Text style={styles.recipesTitle}>Recipes</Text>
        <View style={styles.underline} />
      </View>
      
      <View style={styles.masonryContainer}>
        <View style={[styles.column, { width: columnWidth }]}>
          {leftColumn.map((item) => (
            <View key={item.recipe.id} style={styles.cardWrapper}>
              <RecipeCard
                id={item.recipe.id}
                title={item.recipe.title}
                imageSource={item.recipe.imageSource}
                cardHeight={item.height}
              />
            </View>
          ))}
        </View>
        
        <View style={[styles.column, { width: columnWidth }]}>
          {rightColumn.map((item) => (
            <View key={item.recipe.id} style={styles.cardWrapper}>
              <RecipeCard
                id={item.recipe.id}
                title={item.recipe.title}
                imageSource={item.recipe.imageSource}
                cardHeight={item.height}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList
        data={[{ key: 'creator' }]}
        renderItem={() => (
          <View>
            <CreatorHeader />
            <CreatorInfo />
            <RecipesSection />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
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
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F7F7F7',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 120,
    paddingTop: 24,
    paddingBottom: 32,
  },
  avatarContainer: {
    marginBottom: 14,
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
    letterSpacing: 0.32,
  },
  followers: {
    fontSize: 14,
    fontWeight: '600',
    color: '#545659',
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: 0.28,
  },
  followButton: {
    backgroundColor: '#5A3929',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    height: 42,
  },
  followIcon: {
    marginRight: 8,
  },
  followText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.28,
  },
  recipesSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recipesTitleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  recipesTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1C20',
    letterSpacing: 0.3,
    marginBottom: 8,
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
    gap: 4,
  },
  cardWrapper: {
    flex: 1,
  },
}); 