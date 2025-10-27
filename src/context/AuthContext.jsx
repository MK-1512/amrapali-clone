// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

// Helper function to safely get users from localStorage
const getUsersFromStorage = () => {
    try {
        const storedUsersString = localStorage.getItem('users');
        console.log("AuthContext (getUsersFromStorage): Raw string from localStorage:", storedUsersString);
        const users = storedUsersString ? JSON.parse(storedUsersString) : {};
        console.log("AuthContext (getUsersFromStorage): Parsed users object:", users);
        // --- Ensure addresses is an array for each user ---
        Object.values(users).forEach(user => {
            if (!Array.isArray(user.addresses)) {
                user.addresses = []; // Initialize as empty array if missing or not an array
            }
        });
        // --- End Ensure ---
        return users;
    } catch (error) {
        console.error("AuthContext (getUsersFromStorage): Error parsing 'users' from localStorage:", error);
        return {};
    }
};

// Helper function to safely save users to localStorage
const saveUsersToStorage = (usersObject) => {
    try {
        const stringToSave = JSON.stringify(usersObject);
        console.log("AuthContext (saveUsersToStorage): Object being saved:", usersObject);
        localStorage.setItem('users', stringToSave);
        console.log("AuthContext (saveUsersToStorage): Successfully called localStorage.setItem.");
    } catch (error) {
        console.error("AuthContext (saveUsersToStorage): Error saving 'users' to localStorage:", error);
    }
};


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]); // <-- NEW: State for addresses
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // <-- NEW: Loading state

  // Check localStorage on initial load
  useEffect(() => {
    setIsLoadingAuth(true); // Start loading
    const storedUserSession = localStorage.getItem('currentUser');
    if (storedUserSession) {
      try {
        const user = JSON.parse(storedUserSession);
        if (user && user.email && user.firstName) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            // --- Load addresses for the logged-in user ---
            const storedUsers = getUsersFromStorage();
            const lowerCaseEmail = user.email.toLowerCase();
            if (storedUsers[lowerCaseEmail] && Array.isArray(storedUsers[lowerCaseEmail].addresses)) {
                setUserAddresses(storedUsers[lowerCaseEmail].addresses);
                console.log("AuthContext: Addresses loaded for:", user.email, storedUsers[lowerCaseEmail].addresses);
            } else {
                setUserAddresses([]); // Ensure it's an empty array if none found
                console.log("AuthContext: No addresses found in storage for:", user.email);
            }
            // --- End Load addresses ---
            console.log("AuthContext: Session loaded for:", user.email);
        } else {
             console.warn("AuthContext: Invalid user session data found.");
             localStorage.removeItem('currentUser');
             setUserAddresses([]); // Clear addresses if session is invalid
        }
      } catch (error) {
        console.error("AuthContext: Failed to parse user session", error);
        localStorage.removeItem('currentUser');
        setUserAddresses([]); // Clear addresses on error
      }
    } else {
        console.log("AuthContext: No active user session found.");
        setUserAddresses([]); // Clear addresses if no session
    }
    setIsLoadingAuth(false); // Finish loading
  }, []); // Run only once on initial mount

  // --- Helper to update addresses in both state and localStorage ---
 const updateStoredUserAddresses = useCallback((email, addresses) => {
   if (!email) return;
   const lowerCaseEmail = email.toLowerCase();
   const storedUsers = getUsersFromStorage();
   if (storedUsers[lowerCaseEmail]) {
     storedUsers[lowerCaseEmail].addresses = addresses;
     saveUsersToStorage(storedUsers);
     console.log("AuthContext: Updated addresses in localStorage for", email);
   } else {
     console.error("AuthContext: Could not find user to update addresses in localStorage:", email);
   }
 }, []);

  // Login function
  const login = useCallback((email, password) => {
    setIsLoadingAuth(true); // Start loading
    const lowerCaseEmail = email.toLowerCase();
    console.log("AuthContext: Login attempt for email (lowercase):", lowerCaseEmail);
    const storedUsers = getUsersFromStorage();

    if (storedUsers.hasOwnProperty(lowerCaseEmail)) {
        const user = storedUsers[lowerCaseEmail];
        console.log("AuthContext: User data found for login:", user);

        if (user.password === password) { // Direct password comparison (UNSAFE for production)
            console.log("AuthContext: Password match successful for:", lowerCaseEmail);
            const userDataForSession = { email: user.email, firstName: user.firstName };
            setCurrentUser(userDataForSession);
            setIsLoggedIn(true);
           // Load addresses on login
           const addresses = Array.isArray(user.addresses) ? user.addresses : [];
           setUserAddresses(addresses);
            localStorage.setItem('currentUser', JSON.stringify(userDataForSession));
            console.log("AuthContext: User session created for:", lowerCaseEmail);
            setIsLoadingAuth(false); // Finish loading
            return true;
        } else {
            console.warn("AuthContext: Login failed: Password mismatch for email:", lowerCaseEmail);
            setIsLoadingAuth(false); // Finish loading
            return false;
        }
    } else {
        console.warn("AuthContext: Login failed: User email not found:", lowerCaseEmail);
        setIsLoadingAuth(false); // Finish loading
        return false;
    }
  }, []); // Empty dependency array: function is stable

  // Logout function
  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsLoggedIn(false);
   setUserAddresses([]); // <-- Clear addresses on logout
    localStorage.removeItem('currentUser');
    console.log("AuthContext: User logged out.");
  }, []); // Empty dependency array

  // Register function
  const register = useCallback((firstName, lastName, email, password) => {
    const lowerCaseEmail = email.toLowerCase();
    console.log("AuthContext: Registration attempt for email (lowercase):", lowerCaseEmail);
    const storedUsers = getUsersFromStorage();

    if (storedUsers.hasOwnProperty(lowerCaseEmail)) {
      console.warn("AuthContext: Registration failed: Email already exists", lowerCaseEmail);
      return { success: false, message: 'Email already exists.' };
    }

    // Initialize addresses as an empty array for new user
    // UNSAFE: Storing password directly
    const newUser = { firstName, lastName, email: email, password, addresses: [] };
    storedUsers[lowerCaseEmail] = newUser;

    saveUsersToStorage(storedUsers);
    console.log("AuthContext: Registered new user:", newUser);

    return { success: true };

  }, []); // Empty dependency array

 // --- NEW Address Management Functions ---
 const addAddress = useCallback((newAddress) => {
   if (!currentUser || !currentUser.email) return; // Need logged-in user
   // Ensure new address has an ID
   const addressWithId = { ...newAddress, id: newAddress.id || Date.now().toString() };
   let updatedAddresses = [...userAddresses, addressWithId];

   // Handle 'isDefault' logic
   if (addressWithId.isDefault) {
       // If new address is default, make all others not default
       updatedAddresses = updatedAddresses.map(addr =>
           addr.id === addressWithId.id ? addr : { ...addr, isDefault: false }
       );
   } else if (updatedAddresses.length === 1) {
       // If this is the *only* address, make it default automatically
       updatedAddresses[0].isDefault = true;
   }

   setUserAddresses(updatedAddresses);
   updateStoredUserAddresses(currentUser.email, updatedAddresses);
 }, [currentUser, userAddresses, updateStoredUserAddresses]);

 const updateAddress = useCallback((addressId, updatedAddressData) => {
    if (!currentUser || !currentUser.email) return;
    let updatedAddresses = userAddresses.map(addr =>
        addr.id === addressId ? { ...addr, ...updatedAddressData, id: addr.id } : addr
    );

    // Handle 'isDefault' logic
    if (updatedAddressData.isDefault) {
        // If updated address is set to default, make all others not default
        updatedAddresses = updatedAddresses.map(addr =>
            addr.id === addressId ? addr : { ...addr, isDefault: false }
        );
    } else {
        // If updated address was default but is no longer, check if any default remains
        const anyDefaultLeft = updatedAddresses.some(addr => addr.isDefault);
        if (!anyDefaultLeft && updatedAddresses.length > 0) {
            // If no default left, make the first address default
            updatedAddresses[0].isDefault = true;
        }
    }

    setUserAddresses(updatedAddresses);
    updateStoredUserAddresses(currentUser.email, updatedAddresses);
 }, [currentUser, userAddresses, updateStoredUserAddresses]);

 const deleteAddress = useCallback((addressId) => {
    if (!currentUser || !currentUser.email) return;
    const remainingAddresses = userAddresses.filter(addr => addr.id !== addressId);
    
    // Check if the deleted address was the default
    const deletedAddressWasDefault = userAddresses.find(addr => addr.id === addressId)?.isDefault;
    
    // If it was default and there are addresses left, make the first one default
    if (deletedAddressWasDefault && remainingAddresses.length > 0) {
        remainingAddresses[0].isDefault = true;
    }

    setUserAddresses(remainingAddresses);
    updateStoredUserAddresses(currentUser.email, remainingAddresses);
 }, [currentUser, userAddresses, updateStoredUserAddresses]);

 const setDefaultAddress = useCallback((addressId) => {
    if (!currentUser || !currentUser.email) return;
    const updatedAddresses = userAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
    }));
    setUserAddresses(updatedAddresses);
    updateStoredUserAddresses(currentUser.email, updatedAddresses);
 }, [currentUser, userAddresses, updateStoredUserAddresses]);
 // --- END Address Management Functions ---


  // Value provided by the context
  const contextValue = {
    currentUser,
    isLoggedIn,
    isLoadingAuth, // <-- Expose loading state
    login,
    logout,
    register,
   // --- Expose address state and functions ---
   userAddresses,
   addAddress,
   updateAddress,
   deleteAddress,
   setDefaultAddress,
   // --- End Expose ---
  };

  // Render children only after checking auth state
  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoadingAuth && children}
    </AuthContext.Provider>
  );
};