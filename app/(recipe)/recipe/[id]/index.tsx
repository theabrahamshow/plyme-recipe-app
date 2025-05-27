import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, ImageBackground, TouchableOpacity, ViewToken } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons

// Mock data for recipe slides (replace with actual data fetching later)
const mockRecipeSlides = {
  '1': [
    { id: 'slide1-1', imageUrl: 'https://via.placeholder.com/400x600.png/FF0000/FFFFFF?Text=Recipe1+Step1', overlayText: 'Step 1: Do this' },
    { id: 'slide1-2', imageUrl: 'https://via.placeholder.com/400x600.png/00FF00/FFFFFF?Text=Recipe1+Step2', overlayText: 'Step 2: Then that' },
    { id: 'slide1-3', imageUrl: 'https://via.placeholder.com/400x600.png/0000FF/FFFFFF?Text=Recipe1+Step3', overlayText: 'Step 3: Almost done' },
  ],
  '2': [
    { id: 'slide2-1', imageUrl: 'https://via.placeholder.com/400x600.png/FFFF00/000000?Text=Recipe2+Step1', overlayText: 'R2 Step 1' },
  ],
  // Add more recipes and their slides as needed
};

type Slide = {
  id: string;
  imageUrl: string;
  overlayText: string;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SlideItem: React.FC<{ item: Slide }> = ({ item }) => {
  return (
    <ImageBackground source={{ uri: item.imageUrl }} style={styles.slideItem}>
      <View style={styles.slideTextOverlay}>
        <Text style={styles.slideText}>{item.overlayText}</Text>
      </View>
    </ImageBackground>
  );
};

export default function RecipeSlideshowScreen() {
  const { id: recipeId } = useLocalSearchParams<{ id: string }>(); // Renamed for clarity
  const router = useRouter();
  const slides = recipeId ? mockRecipeSlides[recipeId as keyof typeof mockRecipeSlides] || [] : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  if (!slides.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: `Recipe ${recipeId}` }} />
        <View style={styles.content}>
          <Text style={styles.bodyText}>Recipe not found or no slides available.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} /> {/* Typically TikTok style has no header */}
      <FlatList
        data={slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={SCREEN_HEIGHT} // Each slide takes full screen height
        style={styles.slideList}
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {/* Right-side icon rail and bottom progress indicator will be added here */}
      <View style={styles.iconRail}>
        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Profile Tapped')}>
          <FontAwesome name="user-circle-o" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Like Tapped')}>
          <FontAwesome name="heart" size={30} color="#fff" />
          <Text style={styles.iconText}>Like</Text>{/* Placeholder for like count */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push(`/(recipe)/recipe/${recipeId}/slideshow`)}>
          <FontAwesome name="shopping-cart" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => alert('Share Tapped')}>
          <FontAwesome name="share" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Bottom progress indicator */}
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index ? styles.paginationDotActive : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slideList: {
    flex: 1,
  },
  slideItem: {
    height: SCREEN_HEIGHT,
    justifyContent: 'flex-end', // Position overlay at the bottom
    alignItems: 'center',
  },
  slideTextOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 50, // Position above typical home bar / nav elements
  },
  slideText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  content: { // For error/loading states
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleText: { // Kept for potential use, not currently visible due to headerShown: false
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  bodyText: { // For error/loading states
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  iconRail: {
    position: 'absolute',
    right: 10,
    bottom: 80, // Adjust as needed to avoid home bar and give space from bottom
    alignItems: 'center',
  },
  iconButton: {
    marginVertical: 15,
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 30, // Adjust to be above home bar, below icon rail
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}); 