import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, onPress, showArrow = true }) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsItemLeft}>
      <Ionicons name={icon} size={21} color="#8A8A8A" />
      <Text style={styles.settingsItemText}>{title}</Text>
    </View>
    {showArrow && (
      <Ionicons name="chevron-forward" size={24} color="#666875" />
    )}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    router.push('/profile');
  };

  const handleAccount = () => {
    router.push('/account');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleReportProblem = () => {
    router.push('/report-problem');
  };

  const handleTermsOfService = async () => {
    // Open Terms of Service using SFSafariViewController (iOS) / Chrome Custom Tabs (Android)
    await WebBrowser.openBrowserAsync('https://focustree.notion.site/Terms-of-Service');
  };

  const handlePrivacyPolicy = async () => {
    // Open Privacy Policy using SFSafariViewController (iOS) / Chrome Custom Tabs (Android)
    await WebBrowser.openBrowserAsync('https://focustree.notion.site/Privacy-Policy');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            Alert.alert('Logged Out', 'You have been logged out successfully.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#09121F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main Settings Container */}
        <View style={styles.settingsContainer}>
          <SettingsItem
            icon="person"
            title="Account"
            onPress={handleAccount}
          />
          
          <View style={styles.separator} />
          
          <SettingsItem
            icon="notifications"
            title="Notifications"
            onPress={handleNotifications}
          />
          
          <View style={styles.separator} />
          
          <SettingsItem
            icon="flag"
            title="Report a problem"
            onPress={handleReportProblem}
          />
          
          <View style={styles.separator} />
          
          <SettingsItem
            icon="document-text"
            title="Terms of Service"
            onPress={handleTermsOfService}
          />
          
          <View style={styles.separator} />
          
          <SettingsItem
            icon="shield-checkmark"
            title="Privacy Policy"
            onPress={handlePrivacyPolicy}
          />
        </View>

        {/* Log Out Section */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={21} color="#8A8A8A" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
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
    width: 40, // Same width as back button to center title
  },
  settingsContainer: {
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
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 8,
    paddingVertical: 12,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemText: {
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
  logoutContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 35,
    marginTop: 39,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    fontFamily: 'Inter',
    letterSpacing: 0.28,
    marginLeft: 15,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
}); 