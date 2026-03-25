ReactNative Task App
A mobile application built with React Native (Expo) demonstrating clean architecture, reusable components, Firebase authentication, and REST API integration.

 App Features:

Email & Password Authentication (Firebase)
Google Sign-In (Firebase)
Persistent Login Session
Posts List from JSONPlaceholder API
Post Detail Screen
Like / Unlike Posts (persisted locally)
Comment on Posts (stored locally)
Offline-aware UI
Pull to Refresh
Error Handling & Loading States




Architecture:
This project follows a Feature-Based Modular Architecture with strict separation of concerns.
Layer Responsibilities
LayerLocationResponsibilityUIfeatures/*/screens/Render only. No business logic.Componentssrc/components/Reusable UI elementsHooksfeatures/*/hooks/Business logic and stateServicesfeatures/*/services/API calls and Firebase callsStoresrc/store/Global state managementTypessrc/types/TypeScript interfacesThemesrc/theme/Colors, spacing, typography
Data Flow
Screen
  → calls Hook
    → Hook calls Service
      → Service calls Firebase / Axios
        → Result stored in Zustand Store
          → Screen re-renders via store selector

📁 Project Structure
taskreactnative/
│
├── App.tsx                          # Entry point
├── index.ts                         # Root component registration
├── app.json                         # Expo config
├── tsconfig.json                    # TypeScript config
├── package.json
│
├── assets/
│   └── images/                      # App icons and splash screen
│
└── src/
    │
    ├── features/
    │   │
    │   ├── auth/                     # Authentication feature
    │   │   ├── screens/
    │   │   │   ├── LoginScreen.tsx   # Login UI
    │   │   │   └── RegisterScreen.tsx# Register UI
    │   │   ├── hooks/
    │   │   │   └── useAuth.ts        # Auth business logic
    │   │   ├── services/
    │   │   │   └── authService.ts    # Firebase auth calls
    │   │   └── components/
    │   │       └── GoogleSignInButton.tsx
    │   │
    │   └── posts/                    # Posts feature
    │       ├── screens/
    │       │   ├── PostListScreen.tsx    # List of all posts
    │       │   └── PostDetailScreen.tsx  # Single post + comments
    │       ├── hooks/
    │       │   ├── usePosts.ts           # Fetch posts list
    │       │   └── usePostDetail.ts      # Single post + like + comment
    │       ├── services/
    │       │   └── postsService.ts       # Axios API calls
    │       └── components/
    │           ├── PostCard.tsx          # Post list item
    │           ├── LikeButton.tsx        # Like toggle button
    │           └── CommentItem.tsx       # Single comment UI
    │
    ├── components/                   # Shared reusable components
    │   ├── Button.tsx                # Generic button
    │   ├── Input.tsx                 # Generic text input
    │   ├── Card.tsx                  # Generic card wrapper
    │   ├── Loader.tsx                # Loading spinner
    │   └── ErrorView.tsx             # Error state with retry
    │
    ├── navigation/                   # App navigation
    │   ├── RootNavigator.tsx         # Auth vs Main decider
    │   ├── AuthStack.tsx             # Login / Register flow
    │   └── MainStack.tsx             # Posts list / detail flow
    │
    ├── services/                     # Global services
    │   ├── firebase.ts               # Firebase initialization
    │   └── api.ts                    # Axios instance + interceptors
    │
    ├── store/                        # Zustand global state
    │   ├── authStore.ts              # User auth state
    │   ├── likesStore.ts             # Liked posts (persisted)
    │   └── commentsStore.ts          # Comments per post (persisted)
    │
    ├── hooks/                        # Shared custom hooks
    │   ├── useFetch.ts               # Generic fetch hook
    │   └── useNetworkState.ts        # Online/offline detection
    │
    ├── types/                        # TypeScript interfaces
    │   ├── Post.ts                   # Post and Comment types
    │   └── User.ts                   # AuthUser type
    │
    └── theme/                        # Design tokens
        ├── colors.ts                 # Color palette
        └── spacing.ts                # Spacing, font sizes, border radius

⚙️ Tech Stack
TechnologyVersionPurposeReact Native0.81.xMobile frameworkExpo~54.0.0Development platformTypeScript~5.xType safetyFirebase^10.xAuthenticationAxios^1.xHTTP clientZustand^5.xState managementReact Query^5.xServer state & cachingAsyncStorage^2.xLocal persistenceReact Navigation^7.xScreen navigationNetInfo^11.xNetwork detectionGesture Handler~2.28.0Touch handlingSafe Area Context~5.6.0Safe area layout

🚀 Setup Instructions
Prerequisites
Make sure you have these installed on your laptop:

Node.js v18 or higher → https://nodejs.org
npm v9 or higher (comes with Node.js)
VS Code → https://code.visualstudio.com
Expo Go app on your phone → Play Store / App Store

Step 1 — Clone or Download the Project
bashgit clone https://github.com/rahmanabdur1/taskreactnative.git
cd taskreactnative
Or if downloaded as ZIP:
bashcd taskreactnative
Step 2 — Install Dependencies
bashnpm install --legacy-peer-deps
Step 3 — Firebase Setup

Go to https://console.firebase.google.com
Create a new project named ReactNativeTask
Go to Authentication → Get Started → Sign-in method
Enable Email/Password
Enable Google
Go to Project Settings → Your Apps → Web App
Copy the config object

Step 4 — Add Firebase Config
Open src/services/firebase.ts and replace with your config:
typescriptconst firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
Step 5 — Run the App
bashnpx expo start --clear
Step 6 — Open on Phone

Open Expo Go app on your phone
Make sure phone and laptop are on same WiFi
Scan the QR code shown in terminal
App will open on your phone

If WiFi does not work:
bashnpx expo start --tunnel

📱 Running on Android Emulator
bashnpx expo start

🧪 Reusable Components
Button
typescript<Button
  label="Sign In"
  onPress={handleLogin}
  variant="primary"  // primary | secondary | outline
  loading={isLoading}
  disabled={false}
/>
Input
typescript<Input
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="your@email.com"
  keyboardType="email-address"
  error={emailError}
  secureTextEntry={false}
/>
Card
typescript<Card onPress={() => navigate()}>
  <Text>Content here</Text>
</Card>
Loader
typescript<Loader size="large" />
ErrorView
typescript<ErrorView
  message="Failed to load posts"
  onRetry={refetch}
/>

🪝 Custom Hooks
useAuth
typescriptconst { user, isLoading, error, login, register, logout } = useAuth();
usePosts
typescriptconst { posts, isLoading, error, refetch } = usePosts();
usePostDetail
typescriptconst { post, liked, toggleLike, comments, addComment } = usePostDetail(postId);
useFetch (Generic)
typescriptconst { data, isLoading, error, refetch } = useFetch<Post[]>(postsService.getAllPosts);
useNetworkState
typescriptconst { isConnected } = useNetworkState();

⚠️ Common Mistakes Avoided
Bad PracticeWhat We Did InsteadAPI calls inside componentsAll API calls in services/ onlyFirebase used directly in UIFirebase only in authService.tsRepeated logic across screensSingle reusable hooks used everywhereMessy single folderFeature-based modular structureNo TypeScript typesFull TypeScript interfaces in types/No error handlingError handled at service, hook, and UI level

🧠 Evaluation Notes
This project was built to demonstrate:



👨‍💻 Developer
Built as a technical assessment demonstrating React Native architecture skills.
