
import React, { useState } from 'react';
import { auth } from './firebase'; 
const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      console.log('Registration successful!');
    } catch (error) {
      setError(error.message);
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
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
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>} {}
    </div>
  );
};

export default Registration;
