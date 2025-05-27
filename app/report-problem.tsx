import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Message {
  id: string;
  text: string;
  isFromDeveloper: boolean;
  timestamp?: string;
}

export default function ReportProblemScreen() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messageText, setMessageText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  // Initial developer messages as shown in Figma
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey Matty!',
      isFromDeveloper: true,
    },
    {
      id: '2',
      text: "Just wanted to say thanks for using Plyme and helping us out ✌️ It's just one person building this app, so I am trying my best to make your experience the best on Plyme.",
      isFromDeveloper: true,
    },
    {
      id: '3',
      text: 'Please let me know if you encounter any bugs or if you have any suggestions. Even if you think it is something only you would want, I would love to hear it.',
      isFromDeveloper: true,
    },
  ]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const handleBack = () => {
    router.push('/settings');
  };

  const handleRefresh = () => {
    // Reset messages to initial state (refresh conversation)
    setMessages([
      {
        id: '1',
        text: 'Hey Matty!',
        isFromDeveloper: true,
      },
      {
        id: '2',
        text: "Just wanted to say thanks for using Plyme and helping us out ✌️ It's just one person building this app, so I am trying my best to make your experience the best on Plyme.",
        isFromDeveloper: true,
      },
      {
        id: '3',
        text: 'Please let me know if you encounter any bugs or if you have any suggestions. Even if you think it is something only you would want, I would love to hear it.',
        isFromDeveloper: true,
      },
    ]);
    
    // Clear any input text
    setMessageText('');
    
    // Scroll to top
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 100);
    
    console.log('Conversation refreshed to initial state');
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        isFromDeveloper: false,
        timestamp: new Date().toLocaleString(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      
      // TODO: Send message to backend when integrated
      console.log('Sending message:', newMessage.text);
    }
  };

  // Debug the button state
  const isButtonActive = messageText.trim().length > 0;
  console.log('Button state debug:', { messageText: `"${messageText}"`, trimmed: `"${messageText.trim()}"`, length: messageText.trim().length, isActive: isButtonActive });

  const formatTimestamp = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('en', { month: 'short' }).toUpperCase();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} AT ${hours}:${minutes}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#09121F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>App Support</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={24} color="#09121F" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={[
            styles.messagesContent,
            { flexGrow: 1, justifyContent: 'flex-end' }
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.messagesSection}>
            {/* Timestamp */}
            <Text style={styles.timestamp}>{formatTimestamp()}</Text>
            
            {/* Messages */}
            {messages.map((message) => (
              <View key={message.id} style={styles.messageWrapper}>
                <View style={[
                  styles.messageBubble,
                  message.isFromDeveloper ? styles.developerMessage : styles.userMessage
                ]}>
                  <Text style={[
                    styles.messageText,
                    !message.isFromDeveloper && styles.userMessageText
                  ]}>
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Message Input */}
        <View style={[
          styles.inputContainer,
          { marginBottom: keyboardHeight > 0 ? 10 : insets.bottom + 10 }
        ]}>
          <TextInput
            style={styles.messageInput}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Message"
            placeholderTextColor="#7F7F7F"
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              isButtonActive ? styles.sendButtonActive : styles.sendButtonInactive
            ]} 
            onPress={handleSendMessage}
            disabled={!isButtonActive}
          >
            <Ionicons 
              name="send" 
              size={18} 
              color={isButtonActive ? "#FFFFFF" : "#7F7F7F"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  keyboardAvoidingView: {
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
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  messagesSection: {
    paddingTop: 20,
  },
  timestamp: {
    fontSize: 11,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Inter',
    letterSpacing: 0.22,
    textAlign: 'center',
    marginVertical: 20,
  },
  messageWrapper: {
    marginBottom: 12,
  },
  messageBubble: {
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 11,
    maxWidth: '80%',
  },
  developerMessage: {
    backgroundColor: '#EEEEEE', // Darker grey to contrast with background
    alignSelf: 'flex-start',
    marginLeft: 70, // Increased offset for better dialogue spacing
  },
  userMessage: {
    backgroundColor: '#8B4513', // Brown background to match app's color scheme
    alignSelf: 'flex-start', // Move user messages to the left
    marginLeft: 0, // No offset for user messages on the left
  },
  messageText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Inter',
    letterSpacing: 0.28,
    lineHeight: 17,
  },
  userMessageText: {
    color: '#FFFFFF', // White text for brown background
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8, // Reduced from 12 to make it more compact
    fontSize: 16,
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
    height: 36, // Fixed height to match send button size
    marginRight: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#07CE03', // This is the exact green from Figma
  },
  sendButtonInactive: {
    backgroundColor: '#E5E5E7', // Light gray for inactive state
  },
}); 