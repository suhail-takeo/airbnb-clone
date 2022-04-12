import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmuD2ryBiSnTszLpydv1_yow9xvwa6Xj4',
  authDomain: 'airbnb-clone-c2ed7.firebaseapp.com',
  projectId: 'airbnb-clone-c2ed7',
  storageBucket: 'airbnb-clone-c2ed7.appspot.com',
  messagingSenderId: '350814005314',
  appId: '1:350814005314:web:5889c6c9866848adc2e5db',
  measurementId: 'G-BJQPDMG5MR',
};

const app = initializeApp(firebaseConfig); // connects code to firebase
export const firestore = getFirestore(app); // getting firestore data and storing in the `firestore` variable
