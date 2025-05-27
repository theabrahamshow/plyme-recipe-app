import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Dimensions, 
  TextInput, 
  TouchableOpacity, 
  Text,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '../src/components/common/RecipeCard';
import { mockRecipesData, createMasonryData } from '../src/data/mockRecipes';

// Filter categories
const filterCategories = [
  { id: 'all', label: 'All', tag: null },
  { id: 'vegan', label: 'Vegan', tag: 'vegan' },
  { id: 'keto', label: 'Keto', tag: 'keto' },
  { id: 'chicken', label: 'Chicken', tag: 'chicken' },
  { id: 'seafood', label: 'Seafood', tag: 'seafood' },
  { id: 'quick', label: 'Quick (< 20 min)', tag: 'quick' },
  { id: 'healthy', label: 'Healthy', tag: 'healthy' },
  { id: 'dessert', label: 'Dessert', tag: 'dessert' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter recipes based on search query and selected filter
  const filteredRecipes = useMemo(() => {
    let filtered = mockRecipesData;

    // Apply text search
    if (searchQuery.trim()) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      const filterCategory = filterCategories.find(cat => cat.id === selectedFilter);
      if (filterCategory?.tag) {
        filtered = filtered.filter(recipe => 
          recipe.tags.includes(filterCategory.tag!)
        );
      }
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const { leftColumn, rightColumn } = createMasonryData(filteredRecipes);
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 16;
  const columnGap = 4;
  const columnWidth = (screenWidth - (horizontalPadding * 2) - columnGap) / 2;

    const renderColumn = (columnData: any[], isLeft: boolean) => (
    <View style={[styles.column, { width: columnWidth }]}>
      {columnData.map((item) => (
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
  );

  const renderFilterChip = (category: typeof filterCategories[0]) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.filterChip,
        selectedFilter === category.id && styles.filterChipActive
      ]}
      onPress={() => setSelectedFilter(category.id)}
    >
      <Text style={[
        styles.filterChipText,
        selectedFilter === category.id && styles.filterChipTextActive
      ]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={19} color="#5A3929" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or ingredient"
            placeholderTextColor="#4E4747"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options" size={24} color="#5A3929" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Categories */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScrollContent}
          >
            {filterCategories.map(renderFilterChip)}
          </ScrollView>
        </View>
      )}

      {/* Results Grid */}
      <FlatList
        data={[{ key: 'masonry' }]}
        renderItem={() => (
          <View style={styles.masonryContainer}>
            {renderColumn(leftColumn, true)}
            {renderColumn(rightColumn, false)}
          </View>
        )}
        contentContainerStyle={styles.feedContentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No recipes found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search or filters</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  searchContainer: {
    paddingHorizontal: 17,
    paddingTop: 24,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEDEC',
    borderRadius: 30,
    height: 45,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#4E4747',
    fontFamily: 'Inter',
  },
  filterButton: {
    padding: 4,
  },
  filtersContainer: {
    paddingBottom: 16,
  },
  filtersScrollContent: {
    paddingHorizontal: 17,
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipActive: {
    backgroundColor: '#5A3929',
    borderColor: '#5A3929',
  },
  filterChipText: {
    fontSize: 14,
    color: '#5A3929',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  masonryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 4,
  },
  column: {
    flex: 1,
  },
  cardWrapper: {
    marginBottom: 4,
  },
  feedContentContainer: {
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5A3929',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#A88F7F',
    textAlign: 'center',
  },
}); 