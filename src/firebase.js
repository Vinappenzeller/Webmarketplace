import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA1H6I-DbKG81gVM_OCRKiuwG4-tftR26Q",
  authDomain: "marketplace-5e490.firebaseapp.com",
  projectId: "marketplace-5e490",
  storageBucket: "marketplace-5e490.appspot.com",
  messagingSenderId: "796334267926",
  appId: "1:796334267926:web:85ec86036ca86eb5a45f37",
  measurementId: "G-FE05QJHDL9"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);