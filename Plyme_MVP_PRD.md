
# Plyme MVP Product Requirements Document (PRD)

> Plyme is a Gen-Z focused, iOS-only, TikTok-style slideshow app for discovering, saving, and shopping healthy, simple recipes. MVP will be built with Expo + React Native, using Supabase as the backend. All UGC will be seeded for launch.

---

## 🎯 Core Problem
People want to eat healthier, cook at home, and be inspired by recipes — but most recipe apps are bloated and impersonal. Gen Z users increasingly discover meals on TikTok, where they see them visually and decide in seconds. Plyme brings that exact experience to a native app.

---

## ✅ Goals (MVP)
- Users can discover visual recipe slideshows (seeded, UGC later)
- Can save, like, and explore recipes via a TikTok-style interface
- Can view ingredients, modify portion size, and jump to Instacart
- No login required to browse; account required to save/share

---

## 🧭 User Flows

### Anonymous User
- Lands on Explore feed
- Scrolls recipes as slideshows
- Taps into a recipe → browses steps
- Taps on cart icon → sees ingredients modal
- Chooses serving size → hits "Shop with Instacart"
- Taps save/like → prompted to sign in with Apple

### Logged-in User
- Likes and saves slideshows
- Views profile (fake personas for now)
- Can access saved tab

---

## 🧱 Core Features

### 1. Explore Feed
- Pinterest-style masonry feed
- Tiles are 4:5 or square images with TikTok overlay text
- No top bar or logo; clean minimalist
- Bottom nav: Home, Search, +Create (disabled), Saved

### 2. Slideshow Viewer (Recipe Steps)
- Fullscreen swipe-down interface like TikTok
- Each step is an image with TikTok-style overlay
- Right-side icon rail: Profile, Like, Save, Cart, Share
- Bottom: dot progress indicator, tap to advance

### 3. Ingredient Modal (Cart Flow)
- Opens when user taps cart icon
- Choose portion size (1–2–4 servings)
- Shows ingredient images, names, qty
- Deselect toggle for already owned items
- One-tap deep link to Instacart (region-aware SKUs or fallback search)

### 4. Profile View
- Displays user avatar, follower count (static for now)
- Tabs: Recipes, Plates (disabled for MVP)
- Recipes: Grid layout same as Explore
- No edit features or social graphs

### 5. Saved Tab
- Same layout as Explore feed
- Recipes the user has liked or saved

### 6. Apple Sign-In Auth
- Uses Supabase + Expo Apple Auth module
- Anonymous users allowed to browse
- Required only when taking actions (save, like)

---

## 🧰 Technology Stack

### Frontend
- React Native (Expo SDK)
- EAS Build (iOS only)
- `expo-router` for navigation
- `expo-secure-store` for JWT storage
- `expo-image`, `expo-local-authentication` (optional)

### Backend
- Supabase for auth, DB, storage
- Supabase RLS on all tables (auth.uid())
- Supabase Edge Functions for UGC seeding
- Supabase Storage for slide images, avatars
- CDN for slideshow image delivery (via CloudFront or Supabase CDN)

---

## 📊 Database Schema (Simplified)

### Tables
- `users`: id, auth_id, created_at
- `recipes`: id, title, creator_id, calories, prep_time
- `slides`: id, recipe_id, order, image_url, overlay_text
- `ingredients`: id, name, sku_list, image_url
- `recipe_ingredients`: recipe_id, ingredient_id, qty_per_serving
- `user_likes`: user_id, recipe_id
- `user_saves`: user_id, recipe_id
- `creators`: id, name, bio, avatar_url (fake at launch)

---

## 🪝 Actions (Hooks / RPCs)
- `likeRecipe()`
- `saveRecipe()`
- `openIngredientSheet()`
- `calculatePortion()`
- `getInstacartURL()` (mapped or fallback)

---

## ❌ Not Included in MVP
- UGC creation flow
- Plates (board-like grouping)
- Comments or social following
- Notifications
- Cross-platform (Android)

---

## 📈 Launch Plan
- Seed 100 recipes across 25 fake profiles
- Generate slides using AI and edge automation
- Distribute via TestFlight, soft launch with early testers
- Collect qualitative feedback on navigation, content appeal
- Measure session length, saves, cart interaction

---

## ✅ Done =
- 100 seed recipes loaded
- Explore, slideshow, profile, ingredient modal all functional
- Instacart deep link works for core items
- Build passes App Store review

---

Let me know if you want a scoped dev plan or .sql schema export next.
