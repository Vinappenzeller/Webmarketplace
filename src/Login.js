import React, { useState } from 'react';
import { auth } from './firebase'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Login successful!');
    } catch (error) {
      setError(error.message);
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>} {}
    </div>
  );
};

export default Login;
