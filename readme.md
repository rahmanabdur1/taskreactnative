# 📱 ReactNative Task App

A modern mobile application built with **React Native (Expo)** demonstrating clean architecture, reusable components, Firebase authentication, and REST API integration.

---

## 🚀 Features

* 🔐 Email & Password Authentication (Firebase)
* 🔑 Google Sign-In (Firebase)
* 💾 Persistent Login Session (Local Storage)
* 📰 Posts List from JSONPlaceholder API
* 📄 Post Detail Screen
* ❤️ Like / Unlike Posts (stored locally)
* 💬 Comment on Posts (stored locally)
* 📡 Offline-aware UI
* 🔄 Pull to Refresh
* ⚠️ Error Handling & Loading States

---

## 🧠 Architecture

This project follows a **Feature-Based Modular Architecture** with strict separation of concerns.

### 📌 Layer Responsibilities

| Layer      | Location               | Responsibility                  |
| ---------- | ---------------------- | ------------------------------- |
| UI         | `features/*/screens/`  | Render only (no business logic) |
| Components | `src/components/`      | Reusable UI                     |
| Hooks      | `features/*/hooks/`    | Business logic                  |
| Services   | `features/*/services/` | API & Firebase calls            |
| Store      | `src/store/`           | Global state (Zustand)          |
| Types      | `src/types/`           | TypeScript interfaces           |
| Theme      | `src/theme/`           | Design system                   |

---

## 🔄 Data Flow

```
Screen → Hook → Service → API/Firebase → Store → UI Re-render
```

---

## 📁 Project Structure

```
taskreactnative/
│
├── App.tsx
├── index.ts
├── app.json
├── tsconfig.json
├── package.json
│
├── assets/
│   └── images/
│
└── src/
    ├── features/
    │   ├── auth/
    │   │   ├── screens/
    │   │   ├── hooks/
    │   │   ├── services/
    │   │   └── components/
    │   │
    │   └── posts/
    │       ├── screens/
    │       ├── hooks/
    │       ├── services/
    │       └── components/
    │
    ├── components/
    ├── navigation/
    ├── services/
    ├── store/
    ├── hooks/
    ├── types/
    └── theme/
```

---

## ⚙️ Tech Stack

| Technology       | Version | Purpose              |
| ---------------- | ------- | -------------------- |
| React Native     | 0.81.x  | Mobile framework     |
| Expo             | 54      | Development platform |
| TypeScript       | 5.x     | Type safety          |
| Firebase         | ^10.x   | Authentication       |
| Axios            | ^1.x    | API calls            |
| Zustand          | ^5.x    | State management     |
| React Query      | ^5.x    | Server state         |
| AsyncStorage     | ^2.x    | Local storage        |
| React Navigation | ^7.x    | Navigation           |
| NetInfo          | ^11.x   | Network detection    |

---

## 🛠 Setup Instructions

### ✅ Prerequisites

* Node.js (v18+)
* npm (v9+)
* VS Code
* Expo Go (Mobile App)

---

### 📥 Step 1 — Clone Project

```bash
git clone https://github.com/rahmanabdur1/taskreactnative.git
cd taskreactnative
```

---

### 📦 Step 2 — Install Dependencies

```bash
npm install --legacy-peer-deps
```

---

### 🔥 Step 3 — Firebase Setup

1. Go to Firebase Console
2. Create project
3. Enable:

   * Email/Password
   * Google Sign-In
4. Copy config

---

### ⚙️ Step 4 — Add Firebase Config

Update:

```
src/services/firebase.ts
```

```ts
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
```

---

### ▶️ Step 5 — Run App

```bash
npx expo start --clear
```

---

### 📱 Step 6 — Open on Device

* Open **Expo Go**
* Scan QR Code

👉 If network issue:

```bash
npx expo start --tunnel
```

---

## 📱 Emulator

```bash
npx expo start
```

---

## 🧩 Reusable Components

### Button

```tsx
<Button label="Sign In" onPress={handleLogin} />
```

### Card

```tsx
<Card>Content</Card>
```

---

## 🪝 Custom Hooks

### useAuth

```ts
const { user, login, register, logout } = useAuth();
```

### usePosts

```ts
const { posts, refetch } = usePosts();
```

---

## ⚠️ Best Practices Used

| Bad Practice ❌ | Solution ✅      |
| -------------- | --------------- |
| API in UI      | Service layer   |
| Firebase in UI | authService     |
| Repeated logic | Reusable hooks  |
| No structure   | Feature-based   |
| No types       | Full TypeScript |

---

## 🧠 Evaluation Notes

This project demonstrates:

* Clean architecture
* Scalable folder structure
* Separation of concerns
* Reusable components & hooks
* Offline-first thinking

---

## 👨‍💻 Author

**Abdur Rahman**


