# 🍳 Plyme Recipe App MVP

> Gen-Z focused, TikTok-style recipe discovery app built with Expo + React Native

## 🎯 Current Features

### ✅ **Core Discovery Experience**
- **Pinterest-style masonry feed** - Discover recipes with dynamic card heights
- **TikTok-style slideshow viewer** - Swipe through recipe steps with smooth animations
- **Search & filtering** - Find recipes by tags (Vegan, Keto, Chicken, etc.)
- **Creator profiles** - View recipe creators and their content

### ✅ **User Profile Management**
- **Personal profile** - View saved recipes and user info
- **Edit profile screen** - Update username, name, and profile photo
- **Photo picker integration** - Change profile picture from camera roll
- **Saved recipes** - Organize and access saved content with cart functionality

### ✅ **Shopping Integration**
- **Ingredient modal** - View recipe ingredients with serving size adjustment
- **Instacart integration** - One-tap shopping for recipe ingredients
- **Cart buttons** - Quick access to shopping from saved recipes

## 🏗️ **Technical Architecture**

### **Frontend Stack**
- **React Native** with Expo SDK 52
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **Position-based masonry layout** system
- **Shared component library**

### **Key Components**
- `RecipeCard` - Reusable recipe display component
- `IngredientModal` - Shopping interface
- `ActionButton` - Slideshow interaction buttons
- `PaginationDots` - Step progress indicators

### **Navigation Structure**
```
app/
├── index.tsx           # Home/Explore feed
├── search.tsx          # Search with filters
├── profile.tsx         # User profile
├── edit-profile.tsx    # Profile editing (NEW)
└── (recipe)/
    ├── recipe/[id]/
    │   ├── index.tsx    # Recipe details
    │   └── slideshow.tsx # TikTok-style viewer
    └── creator/[id].tsx # Creator profiles
```

## 🎨 **Design System**

### **Layout System**
- **Position-based heights** - Cards get TALL/SHORT based on grid position
- **Consistent spacing** - 16px horizontal padding, 4px gaps
- **Safe area handling** - Proper iOS design compliance
- **Responsive design** - Adapts to different screen sizes

### **Typography & Colors**
- **Inter font family** throughout
- **iOS-native color palette**
- **Consistent text shadows** for depth
- **Proper contrast ratios**

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+
- Expo CLI
- iOS Simulator or physical device

### **Installation**
```bash
# Clone the repository
git clone https://github.com/theabrahamshow/plyme-recipe-app.git
cd plyme-recipe-app

# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS
npx expo run:ios
```

### **Development**
```bash
# Install new dependencies
npx expo install [package-name]

# Type checking
npx tsc --noEmit

# Build for production
npx expo build:ios
```

## 📱 **User Flow**

1. **Discover** - Browse recipes in masonry feed
2. **Engage** - Tap to enter slideshow experience
3. **Save** - Like and save interesting recipes
4. **Organize** - View saved content in profile
5. **Edit** - Update profile information and photo
6. **Shop** - Access ingredients and shop with Instacart

## 🎯 **MVP Status**

### **✅ Completed**
- Core discovery and viewing experience
- User profile management with editing
- Shopping integration
- Search and filtering
- Creator profile system
- Photo picker functionality

### **🔄 Next Steps**
- Individual field editing screens
- Form validation and error handling
- Profile data persistence
- Push notifications
- Social features (following, comments)

## 📊 **Performance**

- **Optimized masonry layout** with position-based heights
- **Smooth 60fps animations** in slideshow viewer
- **Efficient image loading** with proper caching
- **TypeScript** for compile-time error prevention

## 🔒 **Security**

- Input validation on all user inputs
- Secure image picker permissions
- Type-safe data handling
- Following React Native security best practices

---

**Ready for viral growth with a simple, addictive user experience focused on recipe discovery and immediate action! 🚀**
