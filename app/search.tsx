import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { mockRecipesData } from '../src/data/mockRecipes';

export default function FeedScreen() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // This runs when the tab comes into focus
      const navigateToSlideshow = async () => {
        try {
          setIsNavigating(true);
          const firstRecipeId = mockRecipesData[0]?.id;
          if (firstRecipeId) {
            // Use push instead of replace to maintain proper navigation stack
            router.push(`/(recipe)/recipe/${firstRecipeId}/slideshow`);
          }
        } catch (error) {
          console.error('Navigation error:', error);
          setIsNavigating(false);
        }
      };

      navigateToSlideshow();
    }, [router])
  );

  // Show loading state while navigating
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading Feed...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
    marginTop: 16,
  },
}); 