import React from 'react';

const UserList = ({ users, loginRole, editUser, deleteUser }) => {
  return (
    <>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email}) - {user.role} {user.verified && '(Verified)'}
            {loginRole === 'admin' && (
              <>
                <button className="edit" onClick={() => editUser(user)}>
                  Edit
                </button>
                <button onClick={() => deleteUser(user.id, user.role)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;
