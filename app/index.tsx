import { StyleSheet, View, FlatList, Dimensions, TextInput, TouchableOpacity, Animated, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useMemo } from 'react';
import RecipeCard from '../src/components/common/RecipeCard';
import { mockRecipesData, createMasonryData } from '../src/data/mockRecipes';

// Updated recipe data with heights based on Figma (approximated)
// Card width is approx 174 from Figma. Heights are 174 or 232.
// MasonryList typically needs a 'uri' for the image and dimensions, or a component that defines its own height.
// We will pass height to our RecipeCard.

// Approximate screen width calculations for 2 columns:
// Screen width 390. Padding 16*2 = 32. Gap 8. (390 - 32 - 8) / 2 = 175 (approx card width)

export default function ExploreFeedScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const searchBarTranslateY = useRef(new Animated.Value(-60)).current;

  console.log('ExploreFeedScreen rendering with', mockRecipesData.length, 'recipes');

  // Filter recipes based on search query
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockRecipesData;
    }
    return mockRecipesData.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const { leftColumn, rightColumn } = createMasonryData(filteredRecipes);
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 16;
  const columnGap = 4;
  const columnWidth = (screenWidth - (horizontalPadding * 2) - columnGap) / 2;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        
        if (offsetY > 50 && !showSearch) {
          setShowSearch(true);
          Animated.parallel([
            Animated.timing(searchBarOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(searchBarTranslateY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start();
        } else if (offsetY <= 50 && showSearch) {
          setShowSearch(false);
          Animated.parallel([
            Animated.timing(searchBarOpacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(searchBarTranslateY, {
              toValue: -60,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    }
  );

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

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Animated Search Bar */}
      <Animated.View 
        style={[
          styles.searchContainer,
          {
            opacity: searchBarOpacity,
            transform: [{ translateY: searchBarTranslateY }],
          }
        ]}
      >
        <View style={styles.searchBar}>
          <Ionicons name="search" size={19} color="#5A3929" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or ingredient"
            placeholderTextColor="#4E4747"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Ionicons name="close-circle" size={20} color="#8A8A8A" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

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
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No recipes found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search</Text>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 17,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#F7F7F7',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
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
  clearButton: {
    padding: 4,
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
