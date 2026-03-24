
import { initializeApp, getApps, getApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  getAuth, 
  initializeAuth, 
  // @ts-ignore: getReactNativePersistence exists in the RN bundle but is often missing from types
  getReactNativePersistence 
} from 'firebase/auth';
const firebaseConfig = {
 apiKey: "AIzaSyDpN_t9CpnzOhchFfCMBjsqoF4SgYr2RLc",
  authDomain: "reactnativetaskmobile.firebaseapp.com",
  projectId: "reactnativetaskmobile",
  storageBucket: "reactnativetaskmobile.firebasestorage.app",
  messagingSenderId: "567269402226",
  appId: "1:567269402226:web:a17a516659d6669e3fc4eb",
  measurementId: "G-FPPP9MGVHL",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {

  auth = getAuth(app);
}

export { auth };
export default app;