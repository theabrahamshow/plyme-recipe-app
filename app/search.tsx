import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { mockRecipesData } from '../src/data/mockRecipes';

export default function FeedScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the first recipe's slideshow when Feed tab is accessed
    // This creates a seamless experience where Feed tab opens directly into slideshow mode
    const firstRecipeId = mockRecipesData[0]?.id;
    if (firstRecipeId) {
      router.replace(`/(recipe)/recipe/${firstRecipeId}/slideshow`);
    }
  }, [router]);

  // Return empty view since we're navigating away immediately
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
}); 