// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';

// import firebase from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  experimentalForceLongPolling: true, // this line
  useFetchStreams: false,
  apiKey: 'AIzaSyA69XcZKbCS7iKpSflPJnoDIrcvZx0SuFQ',
  authDomain: 'tva-app-6ef40.firebaseapp.com',
  projectId: 'tva-app-6ef40',
  storageBucket: 'tva-app-6ef40.appspot.com',
  messagingSenderId: '94917028676',
  measurementId: 'G-K8GN6WJ2HL',
  appId: "1:553317843027:web:89d438c60e5b2184e446a6"
});

console.log(process.env.REACT_APP_API_KEY);
export default firebase;
