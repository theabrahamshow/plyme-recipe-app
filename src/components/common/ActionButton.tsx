import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ActionButtonProps {
  icon: string;
  onPress: () => void;
  hasAvatar?: boolean;
  avatarUrl?: string;
  isActive?: boolean;
  hasShadow?: boolean;
  size?: number;
  iconColor?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  onPress, 
  hasAvatar = false,
  avatarUrl,
  isActive = false,
  hasShadow = false,
  size = 44,
  iconColor = '#FFFFFF'
}) => {
  const buttonSize = size;
  const iconSize = Math.round(size * 0.55); // Icon is roughly 55% of button size
  const avatarSize = Math.round(size * 0.64); // Avatar is roughly 64% of button size

  return (
    <TouchableOpacity 
      style={[
        styles.actionButton,
        { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 },
        hasShadow && styles.actionButtonShadow
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {hasAvatar ? (
        <View style={[styles.avatarContainer, { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 }]}>
          <View style={[
            styles.avatarBackground, 
            { 
              width: avatarSize, 
              height: avatarSize, 
              borderRadius: avatarSize / 2 
            }
          ]} />
          <Image 
            source={{ 
              uri: avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' 
            }}
            style={[
              styles.avatar,
              { 
                width: avatarSize, 
                height: avatarSize, 
                borderRadius: avatarSize / 2 
              }
            ]}
          />
        </View>
      ) : (
        <FontAwesome 
          name={icon as any} 
          size={iconSize} 
          color={iconColor} 
          style={hasShadow && styles.iconShadow}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // TikTok-style semi-transparent dark background
    justifyContent: 'center',
    alignItems: 'center',
    // Subtle drop shadow for depth
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonShadow: {
    // Enhanced shadow for cart button
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Consistent background for avatar
  },
  avatarBackground: {
    position: 'absolute',
    backgroundColor: '#FFFFFF', // White background for avatar contrast
  },
  avatar: {
    // No additional styles needed, size is handled by props
  },
  iconShadow: {
    // Remove icon shadow since we now have background contrast
  },
});

export default ActionButton; 