// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

// Helper function to safely get users from localStorage
const getUsersFromStorage = () => {
    try {
        const storedUsersString = localStorage.getItem('users');
        console.log("AuthContext (getUsersFromStorage): Raw string from localStorage:", storedUsersString); // Log raw string
        // If nothing is stored or the string is empty/invalid JSON, return an empty object
        const users = storedUsersString ? JSON.parse(storedUsersString) : {};
        console.log("AuthContext (getUsersFromStorage): Parsed users object:", users); // Log parsed object
        return users;
    } catch (error) {
        console.error("AuthContext (getUsersFromStorage): Error parsing 'users' from localStorage:", error);
        // If parsing fails, return an empty object to prevent further errors
        return {};
    }
};

// Helper function to safely save users to localStorage
const saveUsersToStorage = (usersObject) => {
    try {
        const stringToSave = JSON.stringify(usersObject);
        console.log("AuthContext (saveUsersToStorage): Object being saved:", usersObject); // Log object before stringify
        localStorage.setItem('users', stringToSave);
        console.log("AuthContext (saveUsersToStorage): Successfully called localStorage.setItem.");
        // Optional: Verify immediately after saving
        // const verificationRead = localStorage.getItem('users');
        // console.log("AuthContext (saveUsersToStorage): Verification read after save:", verificationRead);
    } catch (error) {
        console.error("AuthContext (saveUsersToStorage): Error saving 'users' to localStorage:", error);
    }
};


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on initial load for existing session
  useEffect(() => {
    const storedUserSession = localStorage.getItem('currentUser');
    if (storedUserSession) {
      try {
        const user = JSON.parse(storedUserSession);
        // Basic validation: ensure user object has expected properties
        if (user && user.email && user.firstName) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            console.log("AuthContext: Session loaded for:", user.email);
        } else {
             console.warn("AuthContext: Invalid user session data found in localStorage.");
             localStorage.removeItem('currentUser'); // Clear invalid data
        }
      } catch (error) {
        console.error("AuthContext: Failed to parse user session from localStorage", error);
        localStorage.removeItem('currentUser'); // Clear corrupted data
      }
    } else {
        console.log("AuthContext: No active user session found in localStorage.");
    }
  }, []); // Run only once on initial mount

  // Login function - Refined with lowercase email
  const login = useCallback((email, password) => {
    const lowerCaseEmail = email.toLowerCase(); // Convert email to lowercase
    console.log("AuthContext: Login attempt for email (lowercase):", lowerCaseEmail);
    const storedUsers = getUsersFromStorage(); // Use helper to get users safely

    // Check if the user object exists for the given lowercase email key
    if (storedUsers.hasOwnProperty(lowerCaseEmail)) {
        const user = storedUsers[lowerCaseEmail];
        console.log("AuthContext: User data found for login:", user);

        // Verify the password matches
        if (user.password === password) { // Direct password comparison (UNSAFE)
            console.log("AuthContext: Password match successful for:", lowerCaseEmail);
            // Prepare user data for the session state (exclude password)
            const userDataForSession = { email: user.email, firstName: user.firstName }; // Use original case email for session if desired, or lowerCaseEmail
            setCurrentUser(userDataForSession); // Update state
            setIsLoggedIn(true); // Update state
            // Store the session data (without password) in localStorage
            localStorage.setItem('currentUser', JSON.stringify(userDataForSession));
            console.log("AuthContext: User session created for:", lowerCaseEmail);
            return true; // Login successful
        } else {
            console.warn("AuthContext: Login failed: Password mismatch for email:", lowerCaseEmail);
            return false; // Password incorrect
        }
    } else {
        console.warn("AuthContext: Login failed: User email not found in stored data:", lowerCaseEmail);
        return false; // User email not found
    }
  }, []); // Empty dependency array: function is stable

  // Logout function - Remains the same
  const logout = useCallback(() => {
    setCurrentUser(null); // Clear user state
    setIsLoggedIn(false); // Update login status
    localStorage.removeItem('currentUser'); // Clear session from localStorage
    console.log("AuthContext: User logged out and session cleared.");
  }, []); // Empty dependency array

  // Register function - Refined with lowercase email
  const register = useCallback((firstName, lastName, email, password) => {
    const lowerCaseEmail = email.toLowerCase(); // Convert email to lowercase
    console.log("AuthContext: Registration attempt for email (lowercase):", lowerCaseEmail);
    const storedUsers = getUsersFromStorage(); // Use helper to get users safely

    // Check if lowercase email already exists as a key using hasOwnProperty
    if (storedUsers.hasOwnProperty(lowerCaseEmail)) {
      console.warn("AuthContext: Registration failed: Email already exists", lowerCaseEmail);
      return { success: false, message: 'Email already exists.' };
    }

    // Add new user data using lowercase email as the key (UNSAFE: Storing password directly)
    // Store the original case email within the user object if needed, but use lowercase for the key
    const newUser = { firstName, lastName, email: email, password };
    storedUsers[lowerCaseEmail] = newUser;

    // Save the updated users object back to localStorage using helper
    saveUsersToStorage(storedUsers);
    console.log("AuthContext: Registered new user:", newUser);

    return { success: true }; // Registration successful

  }, []); // Empty dependency array

  // Value provided by the context
  const contextValue = {
    currentUser,
    isLoggedIn,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

