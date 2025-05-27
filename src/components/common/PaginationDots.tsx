import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PaginationDotsProps {
  total: number;
  current: number;
  activeColor?: string;
  inactiveColor?: string;
  opacity?: number;
  spacing?: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ 
  total, 
  current,
  activeColor = '#8B4513', // More vibrant brown (saddle brown)
  inactiveColor = '#ECEDEC',
  opacity = 1.0, // Remove container opacity for better visibility
  spacing = 8
}) => {
  return (
    <View style={[styles.paginationContainer, { opacity, gap: spacing }]}>
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === current;
        const isAdjacent = index === current + 1 || index === current - 1;
        
        let dotSize;
        if (isActive) {
          dotSize = styles.largeDot;
        } else if (isAdjacent) {
          dotSize = styles.mediumDot;
        } else {
          dotSize = styles.smallDot;
        }

        return (
          <View
            key={index}
            style={[
              styles.paginationDot,
              dotSize,
              {
                backgroundColor: isActive ? activeColor : inactiveColor,
                opacity: isActive ? 1 : 0.5, // Slightly higher opacity for inactive dots
              }
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  largeDot: {
    width: 10,
    height: 10,
  },
  mediumDot: {
    width: 7,
    height: 7,
  },
  smallDot: {
    width: 4,
    height: 4,
  },
});

export default PaginationDots; 