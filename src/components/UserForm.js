import React from 'react';

const UserForm = ({ name, email, role, setName, setEmail, setRole, saveUser }) => {
  return (
    <form>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="regular">Regular User</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <button type="button" onClick={saveUser}>
        Save User
      </button>
    </form>
  );
};

export default UserForm;
