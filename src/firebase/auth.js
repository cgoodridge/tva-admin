import firebase from '../firebase/firebaseConfig';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { collection } from 'firebase/firestore';


export const database = firebase.firestore();
export const storage = firebase.storage();


export const nexusEventCollectionRef = collection(database, "events");
export const primeEventCollectionRef = collection(database, "timelineEvents");
// export const locationCollectionRef = collection(database, "locations");