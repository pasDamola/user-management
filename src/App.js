import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Login from './components/Login';
import './App.css';

const UserManagementSystem = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('regular');
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginRole, setLoginRole] = useState('regular');

  useEffect(() => {
    loadUsers();
  }, [isLoggedIn]);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  };

  const generateUserId = () => {
    return  '_' + Math.random().toString(36).substr(2, 9);
  }

  const saveUser = () => {
    if (!isEmailUnique(email)) {
      alert('Email address must be unique.');
      return;
    }

    if (!name.trim() || !email.trim()) {
      alert('Name and Email cannot be empty.');
      return;
    }

    const verified = role === 'admin' && isLoggedIn; // Admins are automatically verified if logged in
    const user = { id: userId || generateUserId(), name, email, role, verified };
    const updatedUsers = userId
      ? users.map((u) => (u.id === userId ? user : u))
      : [...users, user];

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    clearForm();
    loadUsers();
  };

  const isEmailUnique = (email) => {
    return !users.some((user) => user.email === email && user.id !== userId);
  };

  const editUser = (user) => {
    if (isLoggedIn && loginRole === 'admin') {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setUserId(user.id);
    } else {
      alert('You do not have permission to edit this user.');
    }
  };

  const deleteUser = (userId, userRole) => {
    if (isLoggedIn && loginRole === 'admin') {
      const updatedUsers = users.filter((user) => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      loadUsers();
    } else {
      alert('You do not have permission to delete this user.');
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setRole('regular');
    setUserId(null);
  };

  const handleLogin = (role) => {
    setLoginRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginRole('regular');
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <h1>User Management System</h1>
          {loginRole === 'admin' && (
            <UserForm
              name={name}
              email={email}
              role={role}
              setName={setName}
              setEmail={setEmail}
              setRole={setRole}
              saveUser={saveUser}
            />
          )}
          <UserList users={users} loginRole={loginRole} editUser={editUser} deleteUser={deleteUser} />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}


export default UserManagementSystem;


