import React from 'react';

const Login = ({ handleLogin }) => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => handleLogin('regular')}>Login as Regular User</button>
      <button onClick={() => handleLogin('admin')}>Login as Admin</button>
    </div>
  );
};

export default Login;
