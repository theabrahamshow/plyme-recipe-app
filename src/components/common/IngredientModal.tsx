import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Dimensions,
  StatusBar,
  Animated,
  PanResponder
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mock ingredient data based on Figma design (quantities for 2 servings)
const mockIngredients = [
  {
    id: '1',
    name: 'Chicken Tenderloins',
    baseQuantity: 0.5, // 1 lb for 2 servings = 0.5 lb per serving
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=100&h=100&fit=crop',
    selected: false,
  },
  {
    id: '2',
    name: 'Eggs',
    baseQuantity: 6, // 12 ct for 2 servings = 6 ct per serving
    unit: 'ct',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop',
    selected: false,
  },
  {
    id: '3',
    name: 'Panko Breadcrumbs',
    baseQuantity: 4, // 8 oz for 2 servings = 4 oz per serving
    unit: 'oz',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=100&h=100&fit=crop',
    selected: false,
  },
  {
    id: '4',
    name: 'Grated parmesan',
    baseQuantity: 4, // 8 oz for 2 servings = 4 oz per serving
    unit: 'oz',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop',
    selected: false,
  },
  {
    id: '5',
    name: 'Paprika',
    baseQuantity: 0.56, // 1.12 oz for 2 servings = 0.56 oz per serving
    unit: 'oz',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop',
    selected: false,
  },
];

interface IngredientModalProps {
  isVisible: boolean;
  onClose: () => void;
  recipeTitle?: string;
  servings?: number;
  calories?: number;
  recipeImage?: string;
}

const IngredientModal: React.FC<IngredientModalProps> = ({ 
  isVisible, 
  onClose, 
  recipeTitle = "Air-fryer chicken tenders",
  servings = 2,
  calories = 350,
  recipeImage
}) => {
  const [ingredients, setIngredients] = useState(mockIngredients);
  const [selectedServings, setSelectedServings] = useState(servings);

  const translateY = new Animated.Value(SCREEN_HEIGHT);

  React.useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // More sensitive to vertical movement, allow drag from anywhere
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      // Stop any ongoing animations when user starts dragging
      translateY.stopAnimation();
    },
    onPanResponderMove: (evt, gestureState) => {
      // Only allow downward movement (closing)
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dy, vy } = gestureState;
      
      // Dismiss if dragged down more than 120px OR if velocity is high enough
      const shouldDismiss = dy > 120 || (dy > 50 && vy > 0.5);
      
      if (shouldDismiss) {
        // Animate out with velocity consideration
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          onClose();
        });
      } else {
        // Snap back to original position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    },
  });

  const toggleIngredientSelection = (id: string) => {
    setIngredients(prev => 
      prev.map(ingredient => 
        ingredient.id === id 
          ? { ...ingredient, selected: !ingredient.selected }
          : ingredient
      )
    );
  };



  const handleInstacartPress = () => {
    console.log('Opening Instacart with selected ingredients');
    // TODO: Implement Instacart integration
  };

  if (!isVisible) return null;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.4)" translucent />
      
      {/* Backdrop */}
      <View style={styles.backdrop}>
        <BlurView intensity={20} style={StyleSheet.absoluteFillObject} />
        <TouchableOpacity 
          style={StyleSheet.absoluteFillObject} 
          onPress={onClose}
          activeOpacity={1}
        />
      </View>

      {/* Modal Content */}
      <Animated.View 
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY }]
          }
        ]}
        {...panResponder.panHandlers}
      >
        {/* Handle Bar */}
        <View style={styles.handleBar} />

        {/* Recipe Header */}
        <View style={styles.headerContainer}>
          {/* Recipe Image */}
          <View style={styles.recipeImageContainer}>
            <Image 
              source={{ uri: recipeImage || 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=200&h=200&fit=crop' }}
              style={styles.recipeImage}
            />
          </View>

          {/* Recipe Info */}
          <View style={styles.recipeInfoContainer}>
            <Text style={styles.recipeTitle}>{recipeTitle}</Text>
            
            <View style={styles.metaInfoRow}>
              <View style={styles.servingsContainer}>
                <Text style={styles.infoLabel}>Servings:</Text>
                <View style={styles.servingsSelector}>
                  <TouchableOpacity 
                    style={styles.servingsButton}
                    onPress={() => setSelectedServings(Math.max(1, selectedServings - 1))}
                  >
                    <FontAwesome name="minus" size={12} color="#1C8758" />
                  </TouchableOpacity>
                  <Text style={styles.servingsText}>{selectedServings}</Text>
                  <TouchableOpacity 
                    style={styles.servingsButton}
                    onPress={() => setSelectedServings(selectedServings + 1)}
                  >
                    <FontAwesome name="plus" size={12} color="#1C8758" />
          </TouchableOpacity>
        </View>
              </View>

              <View style={styles.caloriesContainer}>
                <Text style={styles.infoLabel}>Calories:</Text>
                <Text style={styles.caloriesText}>{calories * selectedServings}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ingredients List */}
        <ScrollView style={styles.ingredientsList} showsVerticalScrollIndicator={false}>
          {ingredients.map((ingredient, index) => (
            <View key={ingredient.id}>
              <View style={styles.ingredientRow}>
                {/* Ingredient Image */}
                <View style={styles.ingredientImageContainer}>
                  <Image 
                    source={{ uri: ingredient.image }} 
                    style={styles.ingredientImage}
                  />
          </View>

                {/* Ingredient Details */}
              <View style={styles.ingredientDetails}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  <Text style={styles.ingredientQuantity}>
                    {(() => {
                      const calculatedQuantity = ingredient.baseQuantity * selectedServings;
                      const isWholeNumber = calculatedQuantity % 1 === 0;
                      return `${isWholeNumber ? calculatedQuantity.toString() : calculatedQuantity.toFixed(2)} ${ingredient.unit}`;
                    })()}
                  </Text>
                </View>

                {/* Selection Circle */}
                <TouchableOpacity 
                  style={styles.selectionCircle}
                  onPress={() => toggleIngredientSelection(ingredient.id)}
                >
                  <View style={[
                    styles.circle,
                    ingredient.selected && styles.circleSelected
                  ]} />
                </TouchableOpacity>
              </View>

              {/* Separator Line */}
              {index < ingredients.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </ScrollView>

        {/* Add to Instacart Button */}
        <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.instacartButton} onPress={handleInstacartPress}>
          <Text style={styles.instacartButtonText}>Add to Instacart</Text>
          <FontAwesome name="shopping-cart" size={16} color="#F2F8F6" />
        </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT * 0.78, // About 78% of screen height
    backgroundColor: '#F7F7F7',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 8,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#C7C7CC',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 28,
    alignItems: 'flex-start',
  },
  recipeImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    overflow: 'hidden',
    marginRight: 16,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  recipeInfoContainer: {
    flex: 1,
    paddingTop: 4,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#215553',
    marginBottom: 12,
    letterSpacing: 0.36,
    lineHeight: 22,
  },
  metaInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 32,
  },
  servingsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  caloriesContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 6,
    letterSpacing: 0.28,
  },
  servingsSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCFDFC',
    borderWidth: 1,
    borderColor: '#E2E2E4',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 4,
    minWidth: 70,
  },
  servingsButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  servingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    minWidth: 24,
    letterSpacing: 0.28,
  },
  caloriesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    letterSpacing: 0.32,
  },
  ingredientsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  ingredientImageContainer: {
    width: 52,
    height: 52,
    borderRadius: 23,
    overflow: 'hidden',
    marginRight: 16,
  },
  ingredientImage: {
    width: '100%',
    height: '100%',
  },
  ingredientDetails: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: 0.32,
  },
  ingredientQuantity: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
    letterSpacing: 0.28,
  },

  selectionCircle: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#DBDADB',
    backgroundColor: 'transparent',
  },
  circleSelected: {
    backgroundColor: '#1C8758',
    borderColor: '#1C8758',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    marginLeft: 68, // Align with text, not image
  },
  buttonContainer: {
    paddingHorizontal: 26,
    paddingBottom: 34,
    paddingTop: 16,
  },
  instacartButton: {
    height: 50,
    backgroundColor: '#5A3929', // Using the primary brown color from the gradient
    borderRadius: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(42, 104, 102, 0.2)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
    gap: 12,
  },
  instacartButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F2F8F6',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

});

export default IngredientModal; 