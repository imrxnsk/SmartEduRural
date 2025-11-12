import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load (with safe parse)
    const storedUser = localStorage.getItem('smartedurural_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        // If stored value is corrupted, clear it so app can recover
        localStorage.removeItem('smartedurural_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    try {
      // Check for registered users in localStorage first
      const registeredUsers = JSON.parse(localStorage.getItem('smartedurural_registered_users') || '[]');
      const registeredUser = registeredUsers.find(user => 
        user.email === email && user.type === userType
      );

      if (registeredUser) {
        // For registered users, we'll accept any password for demo purposes
        // In a real app, you'd verify the password hash
        setUser(registeredUser);
        localStorage.setItem('smartedurural_user', JSON.stringify(registeredUser));
        return { success: true, user: registeredUser };
      }

      // Fallback to mock users for demo purposes
      const mockUsers = {
        student: {
          id: 1,
          email: 'student@example.com',
          name: 'Rahul Kumar',
          type: 'student',
          grade: '10th',
          school: 'Rural High School',
          avatar: null
        },
        parent: {
          id: 2,
          email: 'parent@example.com',
          name: 'Suresh Kumar',
          type: 'parent',
          children: [1],
          phone: '+91-9876543210',
          avatar: null
        },
        teacher: {
          id: 3,
          email: 'teacher@example.com',
          name: 'Priya Sharma',
          type: 'teacher',
          subject: 'Mathematics',
          experience: '5 years',
          avatar: null
        }
      };

      // Simple mock authentication for demo users
      if (email === `${userType}@example.com` && password === 'password') {
        const userData = mockUsers[userType];
        setUser(userData);
        localStorage.setItem('smartedurural_user', JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call for registration
      const newUser = {
        id: Date.now(),
        ...userData,
        avatar: null,
        createdAt: new Date().toISOString()
      };
      
      // Store registered users in a separate localStorage key
      const existingUsers = JSON.parse(localStorage.getItem('smartedurural_registered_users') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('smartedurural_registered_users', JSON.stringify(existingUsers));
      
      setUser(newUser);
      localStorage.setItem('smartedurural_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartedurural_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
