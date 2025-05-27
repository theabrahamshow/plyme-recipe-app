import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeCard from '../src/components/common/RecipeCard';
import { mockRecipesData, createMasonryData } from '../src/data/mockRecipes';

// Updated recipe data with heights based on Figma (approximated)
// Card width is approx 174 from Figma. Heights are 174 or 232.
// MasonryList typically needs a 'uri' for the image and dimensions, or a component that defines its own height.
// We will pass height to our RecipeCard.

// Approximate screen width calculations for 2 columns:
// Screen width 390. Padding 16*2 = 32. Gap 8. (390 - 32 - 8) / 2 = 175 (approx card width)

export default function ExploreFeedScreen() {
  console.log('ExploreFeedScreen rendering with', mockRecipesData.length, 'recipes');

  const { leftColumn, rightColumn } = createMasonryData(mockRecipesData);
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 16;
  const columnGap = 4; // Reduced gap between columns for tighter packing
  const columnWidth = (screenWidth - (horizontalPadding * 2) - columnGap) / 2; // Account for padding and gap

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
      <FlatList
        data={[{ key: 'masonry' }]} // Single item to render our masonry layout
        renderItem={() => (
          <View style={styles.masonryContainer}>
            {renderColumn(leftColumn, true)}
            {renderColumn(rightColumn, false)}
          </View>
        )}
        contentContainerStyle={styles.feedContentContainer}
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
  masonryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 4, // Reduced gap between columns for tighter packing
  },
  column: {
    flex: 1,
  },
  cardWrapper: {
    marginBottom: 4, // Reduced gap between cards vertically for tighter packing
  },
  feedContentContainer: {
    paddingBottom: 100, 
  },
});
