import firebase from 'firebase';

require('firebase/firestore');

const config = {
  apiKey: 'AIzaSyDhdaMR1VQI3NnKdsMIaPnwSyeANeo8o6A',
  authDomain: 'online-meet-and-greets.firebaseapp.com',
  databaseURL: 'https://online-meet-and-greets.firebaseio.com',
  projectId: 'online-meet-and-greets',
  storageBucket: 'online-meet-and-greets.appspot.com',
  messagingSenderId: '309382713009'
};

firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
