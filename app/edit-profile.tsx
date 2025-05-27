import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
// import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  
  // Form state
  const [formData, setFormData] = useState({
    username: 'mathew.third',
    firstName: 'Mathew',
    lastName: 'Abraham',
    email: 'ladadeladadi@gmail.com',
    region: 'Asia'
  });
  
  const [profileImage, setProfileImage] = useState(require('../assets/images/profile-avatar.png'));

  const handleBack = () => {
    router.back();
  };

  const handleImagePicker = async () => {
    // Temporarily disabled until we rebuild the development build
    Alert.alert('Photo Picker', 'Photo picker functionality will be available after rebuilding the development build with expo-image-picker.');
  };

  const handleFieldEdit = (field: string) => {
    // For now, we'll just show an alert. In a real app, this would navigate to individual edit screens
    Alert.alert('Edit Field', `Edit ${field} functionality would be implemented here.`);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const Header = () => (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="#09121F" />
      </TouchableOpacity>
      
      <Text style={styles.headerTitle}>Edit Profile</Text>
      
      <View style={styles.headerSpacer} />
    </View>
  );

  const ProfilePhotoSection = () => (
    <View style={styles.profilePhotoContainer}>
      <View style={styles.avatarOuterCircle}>
        <View style={styles.avatarInnerCircle}>
          <Image source={profileImage} style={styles.avatarImage} />
          <TouchableOpacity style={styles.cameraButton} onPress={handleImagePicker}>
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
      onPress={() => editable && handleFieldEdit(field)}
      disabled={!editable}
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
        value={formData.username} 
        field="username" 
      />
      <View style={styles.separator} />
      
      <FormField 
        label="First Name" 
        value={formData.firstName} 
        field="firstName" 
      />
      <View style={styles.separator} />
      
      <FormField 
        label="Last Name" 
        value={formData.lastName} 
        field="lastName" 
      />
      <View style={styles.separator} />
      
      <FormField 
        label="Email" 
        value={formData.email} 
        field="email" 
        editable={false}
      />
      <View style={styles.separator} />
      
      <FormField 
        label="Region" 
        value={formData.region} 
        field="region" 
        editable={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Header />
        <ProfilePhotoSection />
        <FormSection />
      </ScrollView>
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
  headerSpacer: {
    width: 40, // Same width as back button to center title
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
});