import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Твои секретные ключи из консоли Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBME_BCxOvcfWXCswRSKQnqWHQAQsLNyjw",
  authDomain: "pretty-shtor.firebaseapp.com",
  projectId: "pretty-shtor",
  storageBucket: "pretty-shtor.appspot.com",
  messagingSenderId: "243836630102",
  appId: "1:243836630102:web:73c9a9111949d9fb2b77f7"
};

// Запуск приложения
const app = initializeApp(firebaseConfig);

// Создаем "ручки" для работы с базой и картинками
export const db = getFirestore(app);
export const storage = getStorage(app);