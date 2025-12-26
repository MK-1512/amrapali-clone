import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

const getUsersFromStorage = () => {
    try {
        const storedUsersString = localStorage.getItem('users');
        const users = storedUsersString ? JSON.parse(storedUsersString) : {};
        Object.keys(users).forEach(email => {
            if (!users[email].addresses) {
                users[email].addresses = [];
            }
            users[email].addresses.forEach((addr, index) => {
               if (!addr.id) addr.id = Date.now() + index;
            });
        });
        return users;
    } catch (error) {
        console.error("AuthContext (getUsersFromStorage): Error parsing 'users' from localStorage:", error);
        return {};
    }
};

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

  useEffect(() => {
    const storedUserSession = localStorage.getItem('currentUser');
    if (storedUserSession) {
      try {
        const userSessionData = JSON.parse(storedUserSession);
        const allUsers = getUsersFromStorage();
        const userEmailKey = userSessionData.email?.toLowerCase();

        if (userEmailKey && allUsers[userEmailKey]) {
            const fullUserData = allUsers[userEmailKey];
             if (!fullUserData.addresses) {
                 fullUserData.addresses = [];
             }
            setCurrentUser(fullUserData);
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

  const login = useCallback((email, password) => {
    const lowerCaseEmail = email.toLowerCase();
    const storedUsers = getUsersFromStorage();

    if (storedUsers.hasOwnProperty(lowerCaseEmail)) {
        const user = storedUsers[lowerCaseEmail];
        if (user.password === password) {
             if (!user.addresses) {
                 user.addresses = [];
             }
            setCurrentUser(user);
            setIsLoggedIn(true);
            localStorage.setItem('currentUser', JSON.stringify({ email: user.email, firstName: user.firstName }));
            console.log("AuthContext: User session created for:", lowerCaseEmail);
            return true;
        }
    }
    console.warn("AuthContext: Login failed for email:", lowerCaseEmail);
    return false;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
    console.log("AuthContext: User logged out.");
  }, []);

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
        email: email,
        password,
        addresses: []
    };
    storedUsers[lowerCaseEmail] = newUser;
    saveUsersToStorage(storedUsers);
    console.log("AuthContext: Registered new user:", newUser);
    return { success: true };
  }, []);


  const updateCurrentUserAddresses = (updatedAddresses) => {
      if (!currentUser || !currentUser.email) return;

      const lowerCaseEmail = currentUser.email.toLowerCase();
      const storedUsers = getUsersFromStorage();

      if (storedUsers[lowerCaseEmail]) {
          storedUsers[lowerCaseEmail].addresses = updatedAddresses;
          saveUsersToStorage(storedUsers);

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
      id: Date.now() + Math.random(),
      isDefault: addressData.isDefault || false,
    };

    let updatedAddresses = [...currentUser.addresses];

    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
    } else if (updatedAddresses.length === 0) {
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
          updatedAddresses = updatedAddresses.map(addr =>
              addr.id === updatedAddressData.id ? addr : { ...addr, isDefault: false }
          );
      } else {
          const defaultExists = updatedAddresses.some(addr => addr.isDefault);
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
              return false;
          }
          return true;
      });

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


  const contextValue = {
    currentUser,
    isLoggedIn,
    login,
    logout,
    register,
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