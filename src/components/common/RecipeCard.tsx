import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface RecipeCardProps {
  id: string;
  title: string;
  imageSource?: ImageSourcePropType;
  cardHeight?: number;
  showCartButton?: boolean;
  onCartPress?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  id, 
  title, 
  imageSource, 
  cardHeight, 
  showCartButton = false,
  onCartPress 
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(recipe)/recipe/${id}/slideshow`);
  };

  const handleCartPress = (event: any) => {
    event.stopPropagation(); // Prevent card press when cart button is pressed
    onCartPress?.();
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={[
        styles.card,
        { 
          height: cardHeight || 200, // Use cardHeight or default
        }
      ]}
    >
      {imageSource && (
        <Image 
          source={imageSource} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      {/* Cart Button - only show if showCartButton is true */}
      {showCartButton && (
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={handleCartPress}
          activeOpacity={0.8}
        >
          <FontAwesome name="shopping-cart" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%', // Take full width of the column
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%', // Take up the full card space
  },
  cartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5A3929',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RecipeCard; 