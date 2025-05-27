import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function AppLayout() {
  const pathname = usePathname();
  const isSlideshow = pathname?.includes('/slideshow');
  const animatedValue = useRef(new Animated.Value(isSlideshow ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isSlideshow ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSlideshow, animatedValue]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: isSlideshow ? {
          // Dark navigation for slideshow
          backgroundColor: '#000000',
          borderTopWidth: 0,
          borderRadius: 0,
          height: 80,
          position: 'absolute',
          marginHorizontal: 0,
          bottom: 0,
          paddingBottom: 20,
          paddingTop: 12,
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        } : {
          // Light navigation for other screens (flush to bottom)
          backgroundColor: 'rgba(245, 241, 235, 0.95)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 0,
          height: 80,
          position: 'absolute',
          marginHorizontal: 0,
          bottom: 0,
          paddingBottom: 20,
          paddingTop: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
        tabBarActiveTintColor: isSlideshow ? '#FFFFFF' : '#5A3929',
        tabBarInactiveTintColor: isSlideshow ? 'rgba(255, 255, 255, 0.6)' : '#A88F7F',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      {/* Hide auxiliary routes so they don't appear as tabs */}
      <Tabs.Screen name="(recipe)" options={{ href: null }} />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="_sitemap" options={{ href: null }} />
      <Tabs.Screen name="+not-found" options={{ href: null }} />
    </Tabs>
  );
}
