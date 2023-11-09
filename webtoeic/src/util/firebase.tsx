import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB3E-Uj6MVi9TIEQ0dyewWZNwAOoDT7uEs",
    authDomain: "box-chat-ef660.firebaseapp.com",
    projectId: "box-chat-ef660",
    storageBucket: "box-chat-ef660.appspot.com",
    messagingSenderId: "357166870560",
    appId: "1:357166870560:web:cba9fa73be1023ca008c45"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, database, storage };