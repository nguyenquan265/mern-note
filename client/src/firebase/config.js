// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDYShJOm1LR7En-vZhOXWhAvKKMhKuVrPg',
  authDomain: 'note-app-90e29.firebaseapp.com',
  projectId: 'note-app-90e29',
  storageBucket: 'note-app-90e29.appspot.com',
  messagingSenderId: '249178603527',
  appId: '1:249178603527:web:3400293568448878e12aa2',
  measurementId: 'G-VQ5SXLCG3Z'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
