// FirebaseContext.js
import { createContext, useContext } from 'react';
import { auth, firestore, storage } from './firebase'; // Include storage here

const FirebaseContext = createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};
