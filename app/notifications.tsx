import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface NotificationItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ icon, title, isEnabled, onToggle }) => (
  <TouchableOpacity style={styles.notificationItem} onPress={onToggle}>
    <View style={styles.notificationItemLeft}>
      <Ionicons name={icon} size={21} color="#8A8A8A" />
      <Text style={styles.notificationItemText}>{title}</Text>
    </View>
    <Ionicons 
      name={isEnabled ? "checkmark" : "close"} 
      size={21} 
      color={isEnabled ? "#57C449" : "#FF3B30"} 
      strokeWidth={4} 
    />
  </TouchableOpacity>
);

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  
  // Notification settings state - structured for easy Supabase integration
  const [notificationSettings, setNotificationSettings] = useState({
    newRecipeNotifications: true, // Default enabled
    // Future notification types can be added here:
    // recipeRecommendations: false,
    // weeklyDigest: true,
    // cookingReminders: false,
  });

  const handleBack = () => {
    router.push('/settings');
  };

  const handleToggleNewRecipeNotifications = () => {
    setNotificationSettings(prev => ({
      ...prev,
      newRecipeNotifications: !prev.newRecipeNotifications
    }));
    
    // TODO: When integrating with Supabase, add API call here:
    // await updateUserNotificationSettings({ newRecipeNotifications: !prev.newRecipeNotifications });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#09121F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Notifications Container */}
        <View style={styles.notificationsContainer}>
          <NotificationItem
            icon="notifications"
            title="New Recipe Notifications"
            isEnabled={notificationSettings.newRecipeNotifications}
            onToggle={handleToggleNewRecipeNotifications}
          />
          
          {/* Future notification types can be added here:
          <View style={styles.separator} />
          <NotificationItem
            icon="restaurant"
            title="Recipe Recommendations"
            isEnabled={notificationSettings.recipeRecommendations}
            onToggle={handleToggleRecipeRecommendations}
          />
          */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
    fontFamily: 'Inter',
    letterSpacing: 0.4,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
  headerSpacer: {
    width: 40,
  },
  notificationsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 35,
    marginTop: 32,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    paddingTop: 8,
    paddingBottom: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 8,
    paddingVertical: 12,
  },
  notificationItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#232323',
    fontFamily: 'Inter',
    letterSpacing: 0.28,
    marginLeft: 12,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#C8C8C8',
    marginLeft: 43,
    marginRight: 0,
  },
}); 