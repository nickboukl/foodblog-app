import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const emailRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, [isSignUp]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation for signup
    if (isSignUp) {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!username || username.length < 3 || username.length > 20)
        return setError("Username must be 3–20 characters");

      if (!name || name.length < 2 || name.length > 20)
        return setError("Name must be 2–20 characters");

      if (!lastname || lastname.length < 2 || lastname.length > 20)
        return setError("Lastname must be 2–20 characters");

      if (!emailRegex.test(email))
        return setError("Invalid email format");

      if (!password || password.length < 4 || password.length > 20)
        return setError("Password must be 4–20 characters");
    }

    const endpoint = isSignUp ? "signUp" : "login";
    const payload = isSignUp
      ? { email, password, username, name, lastname }
      : { email, password };

    try {
      const res = await axios.post(`http://localhost:3000/${endpoint}`, payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsOpen();
    } catch (data) {
      setError(data.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <form className='form' onSubmit={handleOnSubmit}>
        {isSignUp && (
          <>
            <div className='form-control'>
              <label>Username</label>
              <input
                type="text"
                className='input'
                required
                minLength={3}
                maxLength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='form-control'>
              <label>Name</label>
              <input
                type="text"
                className='input'
                required
                minLength={2}
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-control'>
              <label>Lastname</label>
              <input
                type="text"
                className='input'
                required
                minLength={2}
                maxLength={20}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </>
        )}

        <div className='form-control'>
          <label>Email</label>
          <input
            type="email"
            className='input'
            required
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-control'>
          <label>Password</label>
          <input
            type="password"
            className='input'
            required
            minLength={4}
            maxLength={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit'>{isSignUp ? "Sign Up" : "Login"}</button><br />
        {error && <h6 className='error'>{error}</h6>}<br />

        <p onClick={() => setIsSignUp(prev => !prev)}>
          {isSignUp ? "Already have an account" : "Create new account"}
        </p>
      </form>
    </>
  );
}
