import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'online-meet-and-greets.firebaseapp.com',
  databaseURL: 'https://online-meet-and-greets.firebaseio.com',
  projectId: 'online-meet-and-greets',
  storageBucket: 'online-meet-and-greets.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();

// To ensure ensure firestore timestamp objects supported in future
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export { auth, db, storage };
