import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface AccountItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  showCheckmark?: boolean;
  onPress?: () => void;
}

const AccountItem: React.FC<AccountItemProps> = ({ icon, label, value, showCheckmark = false, onPress }) => {
  const ItemContent = (
    <View style={styles.accountItem}>
      <View style={styles.accountItemLeft}>
        <Ionicons name={icon} size={21} color="#8A8A8A" />
        <Text style={styles.accountLabel}>{label}</Text>
      </View>
      <View style={styles.accountItemRight}>
        <Text style={styles.accountValue}>{value}</Text>
        {showCheckmark && (
          <Ionicons name="checkmark" size={21} color="#57C449" strokeWidth={4} style={styles.checkmark} />
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {ItemContent}
      </TouchableOpacity>
    );
  }

  return ItemContent;
};

interface ActionItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  isDestructive?: boolean;
}

const ActionItem: React.FC<ActionItemProps> = ({ icon, title, onPress, isDestructive = false }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <Ionicons name={icon} size={21} color="#8A8A8A" />
    <Text style={[styles.actionText, isDestructive && styles.destructiveText]}>{title}</Text>
  </TouchableOpacity>
);

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const [timezone, setTimezone] = useState('Loading...');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Current username for confirmation
  const currentUsername = 'mathew.third';

  const getLocalTimezone = () => {
    try {
      // Get the user's timezone (e.g., "Asia/Kolkata", "America/New_York")
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Return the full timezone string, but format it nicely
      // Replace underscores with spaces for better readability
      return userTimezone.replace(/_/g, ' ');
    } catch (error) {
      console.log('Error detecting timezone:', error);
      return 'Unknown';
    }
  };

  // Auto-detect timezone on component mount
  useEffect(() => {
    const detectedTimezone = getLocalTimezone();
    setTimezone(detectedTimezone);
  }, []);

  const handleBack = () => {
    router.push('/settings');
  };

  const handleTimezonePress = () => {
    const detectedTimezone = getLocalTimezone();
    
    // If the detected timezone is different from current, update it
    if (detectedTimezone !== timezone) {
      setTimezone(detectedTimezone);
      Alert.alert('Timezone Updated', `Your timezone has been updated to ${detectedTimezone}`);
    } else {
      // If it's the same, just show a confirmation
      Alert.alert('Timezone Current', `Your timezone is already set to ${detectedTimezone}`);
    }
  };



  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteModalDismiss = () => {
    setShowDeleteModal(false);
    setDeleteConfirmationText('');
    setIsDeleting(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmationText !== currentUsername) {
      Alert.alert('Error', 'Username does not match. Please try again.');
      return;
    }

    setIsDeleting(true);
    
    try {
      // TODO: Integrate with Supabase to delete user account
      // await deleteUserAccount();
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear local data
      // TODO: Clear AsyncStorage, user preferences, etc.
      
      Alert.alert(
        'Account Deleted',
        'Your account has been permanently deleted.',
        [
          {
            text: 'OK',
            onPress: () => {
              // TODO: Navigate to login/onboarding screen
              handleDeleteModalDismiss();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to delete account. Please try again.');
      setIsDeleting(false);
    }
  };

  // Check if username matches for delete confirmation
  const isDeleteConfirmationValid = deleteConfirmationText === currentUsername;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#09121F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* User Information Container */}
        <View style={styles.userInfoContainer}>
          <AccountItem
            icon="person"
            label="Username"
            value="mathew.third"
          />
          
          <View style={styles.separator} />
          
          <AccountItem
            icon="mail"
            label="Email"
            value="ladedaladadi@gmail.com"
          />
          
          <View style={styles.separator} />
          
          <AccountItem
            icon="time"
            label="Timezone"
            value={timezone}
            showCheckmark={true}
            onPress={handleTimezonePress}
          />
        </View>

        {/* Account Actions Container */}
        <View style={styles.actionsContainer}>
          <ActionItem
            icon="trash"
            title="Delete account"
            onPress={handleDeleteAccount}
            isDestructive={true}
          />
        </View>
      </ScrollView>

      {/* Delete Account Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleDeleteModalDismiss}
      >
        <Pressable style={styles.modalOverlay} onPress={handleDeleteModalDismiss}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalWarning}>
              This action cannot be undone. All your data will be permanently deleted.
            </Text>
            <Text style={styles.modalInstruction}>
              Type your username "{currentUsername}" to confirm:
            </Text>
            <TextInput
              style={styles.modalInput}
              value={deleteConfirmationText}
              onChangeText={setDeleteConfirmationText}
              placeholder="Enter your username"
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity 
              style={[
                styles.deleteButton, 
                isDeleteConfirmationValid && styles.deleteButtonActive,
                isDeleting && styles.deleteButtonDisabled
              ]} 
              onPress={handleConfirmDelete}
              disabled={!isDeleteConfirmationValid || isDeleting}
            >
              <Text style={[
                styles.deleteButtonText, 
                isDeleteConfirmationValid && styles.deleteButtonTextActive
              ]}>
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
  userInfoContainer: {
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
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 8,
    paddingVertical: 12,
  },
  accountItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accountItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#232323',
    fontFamily: 'Inter',
    letterSpacing: 0.28,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
    marginLeft: 12,
  },
  accountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#232323',
    fontFamily: 'Inter',
    letterSpacing: 0.28,
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
  actionsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 35,
    marginTop: 39,
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
    marginBottom: 40,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 8,
    paddingVertical: 12,
  },
  actionText: {
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
  destructiveText: {
    color: '#232323', // Keep same color as design shows
  },
  checkmark: {
    marginLeft: 8,
  },
  // Modal styles (matching edit-profile pattern)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 50,
    minHeight: 350,
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#D1D1D6',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalWarning: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalInstruction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 20,
    borderWidth: 0,
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  deleteButton: {
    backgroundColor: '#D1D1D6',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  deleteButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#8E8E93',
    textAlign: 'center',
  },
  deleteButtonActive: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonTextActive: {
    color: '#FFFFFF',
  },
  deleteButtonDisabled: {
    backgroundColor: '#F2F2F7',
    opacity: 0.6,
  },
}); 