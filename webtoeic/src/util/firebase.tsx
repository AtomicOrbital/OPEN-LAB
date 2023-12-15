import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getApps, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3E-Uj6MVi9TIEQ0dyewWZNwAOoDT7uEs",
  authDomain: "box-chat-ef660.firebaseapp.com",
  projectId: "box-chat-ef660",
  storageBucket: "box-chat-ef660.appspot.com",
  messagingSenderId: "357166870560",
  appId: "1:357166870560:web:cba9fa73be1023ca008c45"
};

const firebaseSensorConfig = {
  apiKey: "AIzaSyB5gDUOrxdpdgARJnvCglsaa00V4jdzLEQ",
  authDomain: "sensor-iot-2293b.firebaseapp.com",
  databaseURL: "https://sensor-iot-2293b-default-rtdb.firebaseio.com",
  projectId: "sensor-iot-2293b",
  storageBucket: "sensor-iot-2293b.appspot.com",
  messagingSenderId: "490322895741",
  appId: "1:490322895741:web:04c923a91e1a33b6ce2214",
  measurementId: "G-QHTF1NZ1Q4"
};



let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

// Khởi tạo Firebase thứ hai
let firebaseSensorApp;
if (getApps().some(app => app.name === 'SensorApp')) {
  firebaseSensorApp = getApps().find(app => app.name === 'SensorApp');
} else {
  firebaseSensorApp = initializeApp(firebaseSensorConfig, 'SensorApp');
}
const authSecond = getAuth(firebaseSensorApp);
const databaseSecond = getDatabase(firebaseSensorApp);
const storageSecond = getStorage(firebaseSensorApp);

export { auth, database, storage, authSecond, databaseSecond, storageSecond };