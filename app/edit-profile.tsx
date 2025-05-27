import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const demoPhotos = [
  require('../assets/images/profile-avatar.png'),
  require('../assets/images/creator-avatar.png'),
  require('../assets/images/recipe1.png'),
];

export default function EditProfileScreen() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showFirstNameModal, setShowFirstNameModal] = useState(false);
  const [showLastNameModal, setShowLastNameModal] = useState(false);
  const [username, setUsername] = useState('6h6sxg6bf27791');
  const [firstName, setFirstName] = useState('Matty');
  const [lastName, setLastName] = useState('Abraham');
  
  // Original values to track changes
  const [originalUsername] = useState('6h6sxg6bf27791');
  const [originalFirstName] = useState('Matty');
  const [originalLastName] = useState('Abraham');

  const handleBack = () => {
    router.push('/profile');
  };

  const handlePhotoPress = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        {
          text: 'Photo Library',
          onPress: () => Alert.alert('Coming Soon', 'Photo library access will be available in a future update.'),
        },
        {
          text: 'Change Demo Photo',
          onPress: () => {
            const nextIndex = (currentPhotoIndex + 1) % demoPhotos.length;
            setCurrentPhotoIndex(nextIndex);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleFieldPress = (fieldName: string) => {
    if (fieldName === 'Username') {
      setShowUsernameModal(true);
    } else if (fieldName === 'First Name') {
      setShowFirstNameModal(true);
    } else if (fieldName === 'Last Name') {
      setShowLastNameModal(true);
    } else {
      Alert.alert(
        `Edit ${fieldName}`,
        `You tapped on ${fieldName}. This feature will be implemented soon.`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleUsernameSubmit = () => {
    setShowUsernameModal(false);
  };

  const handleFirstNameSubmit = () => {
    setShowFirstNameModal(false);
  };

  const handleLastNameSubmit = () => {
    setShowLastNameModal(false);
  };

  const handleModalDismiss = () => {
    setShowUsernameModal(false);
    setShowFirstNameModal(false);
    setShowLastNameModal(false);
  };

  // Check if values have changed
  const isUsernameChanged = username !== originalUsername;
  const isFirstNameChanged = firstName !== originalFirstName;
  const isLastNameChanged = lastName !== originalLastName;

  const Header = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.headerTitle}>Edit Profile</Text>
      
      <View style={styles.headerRight} />
    </View>
  );

  const ProfilePhotoSection = () => (
    <View style={styles.profilePhotoContainer}>
      <View style={styles.avatarOuterCircle}>
        <View style={styles.avatarInnerCircle}>
          <Image source={demoPhotos[currentPhotoIndex]} style={styles.avatarImage} />
          <TouchableOpacity 
            style={styles.cameraButton} 
            onPress={handlePhotoPress}
          >
            <Ionicons name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const FormField = ({ 
    label, 
    value, 
    field, 
    editable = true 
  }: { 
    label: string; 
    value: string; 
    field: string; 
    editable?: boolean; 
  }) => (
    <TouchableOpacity 
      style={styles.fieldContainer} 
      onPress={() => editable && handleFieldPress(field)}
      disabled={!editable}
      activeOpacity={editable ? 0.7 : 1}
    >
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldValueContainer}>
        <Text style={[styles.fieldValue, !editable && styles.fieldValueDisabled]}>
          {value}
        </Text>
        {editable && (
          <Ionicons name="chevron-forward" size={16} color="#666875" />
        )}
      </View>
    </TouchableOpacity>
  );

  const FormSection = () => (
    <View style={styles.formContainer}>
      <FormField 
        label="Username" 
        value={username} 
        field="Username" 
      />
      <View style={styles.separator} />
      
      <FormField 
        label="First Name" 
        value={firstName} 
        field="First Name" 
      />
      <View style={styles.separator} />
      
      <FormField 
        label="Last Name" 
        value={lastName} 
        field="Last Name" 
      />
      <View style={styles.separator} />
      
      <FormField 
        label="Email" 
        value="matty@plyme.com" 
        field="Email" 
        editable={false}
      />
      <View style={styles.separator} />
      
      <FormField 
        label="Region" 
        value="United States" 
        field="Region" 
        editable={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Header />
        <ProfilePhotoSection />
        <FormSection />
      </ScrollView>

      {/* Username Edit Modal */}
      <Modal
        visible={showUsernameModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalDismiss}
      >
        <Pressable style={styles.modalOverlay} onPress={handleModalDismiss}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Edit username</Text>
            <TextInput
              style={styles.modalInput}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              autoFocus={true}
            />
            <TouchableOpacity 
              style={[styles.saveButton, isUsernameChanged && styles.saveButtonActive]} 
              onPress={handleUsernameSubmit}
            >
              <Text style={[styles.saveButtonText, isUsernameChanged && styles.saveButtonTextActive]}>Save</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* First Name Edit Modal */}
      <Modal
        visible={showFirstNameModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalDismiss}
      >
        <Pressable style={styles.modalOverlay} onPress={handleModalDismiss}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Edit first name</Text>
            <TextInput
              style={styles.modalInput}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
              autoFocus={true}
            />
            <TouchableOpacity 
              style={[styles.saveButton, isFirstNameChanged && styles.saveButtonActive]} 
              onPress={handleFirstNameSubmit}
            >
              <Text style={[styles.saveButtonText, isFirstNameChanged && styles.saveButtonTextActive]}>Save</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Last Name Edit Modal */}
      <Modal
        visible={showLastNameModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalDismiss}
      >
        <Pressable style={styles.modalOverlay} onPress={handleModalDismiss}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Edit last name</Text>
            <TextInput
              style={styles.modalInput}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
              autoFocus={true}
            />
            <TouchableOpacity 
              style={[styles.saveButton, isLastNameChanged && styles.saveButtonActive]} 
              onPress={handleLastNameSubmit}
            >
              <Text style={[styles.saveButtonText, isLastNameChanged && styles.saveButtonTextActive]}>Save</Text>
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
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
    textAlign: 'center',
    flex: 1,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
  headerRight: {
    width: 40,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarOuterCircle: {
    width: 107,
    height: 107,
    borderRadius: 53.5,
    backgroundColor: '#949494',
    borderWidth: 3,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInnerCircle: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#696969',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
  },
  cameraButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#666875',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  formContainer: {
    marginHorizontal: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#C8C8C8',
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    letterSpacing: 0.28,
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fieldValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666876',
    letterSpacing: 0.24,
  },
  fieldValueDisabled: {
    color: '#999999',
  },
  separator: {
    height: 1,
    backgroundColor: '#C8C8C8',
    marginHorizontal: 0,
  },
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
    paddingBottom: 34,
    minHeight: 200,
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
    marginBottom: 24,
  },
  modalInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 20,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  saveButton: {
    backgroundColor: '#D1D1D6',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  saveButtonActive: {
    backgroundColor: '#5A3929',
  },
  saveButtonTextActive: {
    color: '#FFFFFF',
  },
});