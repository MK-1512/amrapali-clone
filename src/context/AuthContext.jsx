// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

// Helper function to safely get users from localStorage
const getUsersFromStorage = () => {
    try {
        const storedUsersString = localStorage.getItem('users');
        const users = storedUsersString ? JSON.parse(storedUsersString) : {};
        // --- Ensure users object has addresses array ---
        Object.keys(users).forEach(email => {
            if (!users[email].addresses) {
                users[email].addresses = [];
            }
            // Ensure address IDs exist
            users[email].addresses.forEach((addr, index) => {
               if (!addr.id) addr.id = Date.now() + index; // Assign simple unique ID if missing
            });
        });
        return users;
    } catch (error) {
        console.error("AuthContext (getUsersFromStorage): Error parsing 'users' from localStorage:", error);
        return {};
    }
};

// Helper function to safely save users to localStorage
const saveUsersToStorage = (usersObject) => {
    try {
        localStorage.setItem('users', JSON.stringify(usersObject));
    } catch (error) {
        console.error("AuthContext (saveUsersToStorage): Error saving 'users' to localStorage:", error);
    }
};


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load session or initialize state
  useEffect(() => {
    const storedUserSession = localStorage.getItem('currentUser');
    if (storedUserSession) {
      try {
        const userSessionData = JSON.parse(storedUserSession);
        // Load full user data including addresses from 'users' storage
        const allUsers = getUsersFromStorage();
        const userEmailKey = userSessionData.email?.toLowerCase();

        if (userEmailKey && allUsers[userEmailKey]) {
            const fullUserData = allUsers[userEmailKey];
             // Ensure addresses array exists
             if (!fullUserData.addresses) {
                 fullUserData.addresses = [];
             }
            setCurrentUser(fullUserData); // Set full user data including addresses
            setIsLoggedIn(true);
            console.log("AuthContext: Session loaded for:", fullUserData.email);
        } else {
             console.warn("AuthContext: User session data found but user not in main storage, clearing session.");
             localStorage.removeItem('currentUser');
        }
      } catch (error) {
        console.error("AuthContext: Failed to parse user session from localStorage", error);
        localStorage.removeItem('currentUser');
      }
    } else {
        console.log("AuthContext: No active user session found.");
    }
  }, []);

  // Login function
  const login = useCallback((email, password) => {
    const lowerCaseEmail = email.toLowerCase();
    const storedUsers = getUsersFromStorage();

    if (storedUsers.hasOwnProperty(lowerCaseEmail)) {
        const user = storedUsers[lowerCaseEmail];
        if (user.password === password) {
            // Ensure addresses array exists on login
             if (!user.addresses) {
                 user.addresses = [];
             }
            setCurrentUser(user); // Set full user data
            setIsLoggedIn(true);
            // Store only essential info for session check, full data loaded from 'users'
            localStorage.setItem('currentUser', JSON.stringify({ email: user.email, firstName: user.firstName }));
            console.log("AuthContext: User session created for:", lowerCaseEmail);
            return true;
        }
    }
    console.warn("AuthContext: Login failed for email:", lowerCaseEmail);
    return false;
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    console.log("AuthContext: User logged out.");
  }, []);

  // Register function
  const register = useCallback((firstName, lastName, email, password) => {
    const lowerCaseEmail = email.toLowerCase();
    const storedUsers = getUsersFromStorage();

    if (storedUsers.hasOwnProperty(lowerCaseEmail)) {
      console.warn("AuthContext: Registration failed: Email already exists", lowerCaseEmail);
      return { success: false, message: 'Email already exists.' };
    }

    const newUser = {
        firstName,
        lastName,
        email: email, // Store original case email if needed
        password,
        addresses: [] // Initialize with empty addresses array
    };
    storedUsers[lowerCaseEmail] = newUser;
    saveUsersToStorage(storedUsers);
    console.log("AuthContext: Registered new user:", newUser);
    return { success: true };
  }, []);

  // --- NEW ADDRESS MANAGEMENT FUNCTIONS ---

  const updateCurrentUserAddresses = (updatedAddresses) => {
      if (!currentUser || !currentUser.email) return;

      const lowerCaseEmail = currentUser.email.toLowerCase();
      const storedUsers = getUsersFromStorage();

      if (storedUsers[lowerCaseEmail]) {
          // Update addresses in the stored user data
          storedUsers[lowerCaseEmail].addresses = updatedAddresses;
          saveUsersToStorage(storedUsers);

          // Update the currentUser state
          setCurrentUser(prevUser => ({
              ...prevUser,
              addresses: updatedAddresses
          }));
          console.log("AuthContext: Updated addresses for", lowerCaseEmail);
      } else {
           console.error("AuthContext: Cannot update addresses, user not found in storage.");
      }
  };

  const addAddress = useCallback((addressData) => {
    if (!currentUser) return;
    const newAddress = {
      ...addressData,
      id: Date.now() + Math.random(), // Simple unique ID
      isDefault: addressData.isDefault || false, // Ensure isDefault exists
    };

    let updatedAddresses = [...currentUser.addresses];

    if (newAddress.isDefault) {
      // Unset previous default
      updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
    } else if (updatedAddresses.length === 0) {
        // Make the first address default if none exists
        newAddress.isDefault = true;
    }

    updatedAddresses.push(newAddress);
    updateCurrentUserAddresses(updatedAddresses);

  }, [currentUser]);

  const editAddress = useCallback((updatedAddressData) => {
     if (!currentUser || !updatedAddressData.id) return;

      let updatedAddresses = currentUser.addresses.map(addr =>
          addr.id === updatedAddressData.id ? { ...addr, ...updatedAddressData } : addr
      );

      if (updatedAddressData.isDefault) {
          // Unset other defaults if this one is set as default
          updatedAddresses = updatedAddresses.map(addr =>
              addr.id === updatedAddressData.id ? addr : { ...addr, isDefault: false }
          );
      } else {
          // Check if we just unset the only default address
          const defaultExists = updatedAddresses.some(addr => addr.isDefault);
          // If no default exists and there are addresses, make the first one default
          if (!defaultExists && updatedAddresses.length > 0) {
               updatedAddresses[0].isDefault = true;
          }
      }

      updateCurrentUserAddresses(updatedAddresses);

  }, [currentUser]);

  const deleteAddress = useCallback((addressId) => {
     if (!currentUser) return;

      let addressWasDefault = false;
      let updatedAddresses = currentUser.addresses.filter(addr => {
          if (addr.id === addressId) {
              addressWasDefault = addr.isDefault;
              return false; // Exclude this address
          }
          return true;
      });

      // If the deleted address was the default, and there are remaining addresses, set the first one as default
      if (addressWasDefault && updatedAddresses.length > 0) {
           updatedAddresses[0].isDefault = true;
      }

      updateCurrentUserAddresses(updatedAddresses);

  }, [currentUser]);

  const setDefaultAddress = useCallback((addressId) => {
      if (!currentUser) return;

      const updatedAddresses = currentUser.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
      }));

      updateCurrentUserAddresses(updatedAddresses);

  }, [currentUser]);

  // --- END NEW FUNCTIONS ---

  const contextValue = {
    currentUser,
    isLoggedIn,
    login,
    logout,
    register,
    // --- Expose address functions ---
    addAddress,
    editAddress,
    deleteAddress,
    setDefaultAddress,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};