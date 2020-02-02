import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './css/authform.css';
import { signUp, logIn } from '../api/music-beast-api';

const AuthForm = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signUpMode, setSignUpMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameOnChange = ({ target }) => setName(target.value);
  const handleEmailOnChange = ({ target }) => setEmail(target.value);
  const handlePasswordOnChange = ({ target }) => setPassword(target.value);
  const handlePasswordConfirmOnChange = ({ target }) =>
    setPasswordConfirm(target.value);
  const handleSwitchForm = () => {
    setSignUpMode(!signUpMode);
    setErrorMessage('');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { setLoggedIn } = props;

    if (signUpMode) {
      const signUpResponse = await signUp(
        name,
        email,
        password,
        passwordConfirm,
      );
      if (signUpResponse.error) {
        const { response = {} } = signUpResponse.error;
        const { data = {} } = response;
        const { message = 'Account creation failed' } = data;
        setErrorMessage(message);
        return;
      }
      if (signUpResponse) {
        setLoggedIn(signUpResponse);
      }
      return;
    }
    const logInResponse = await logIn(email, password, setLoggedIn);
    if (logInResponse.error) {
      const { response = {} } = logInResponse.error;
      const { data = {} } = response;
      const { message = 'Invalid credentials' } = data;
      setErrorMessage(message);
      return;
    }

    if (logInResponse) {
      setLoggedIn(logInResponse);
    }
  };

  return (
    <form className="auth-form" autoComplete="off">
      <h2 className="auth-form-title">Music Beast Manager</h2>
      {errorMessage && <div className="auth-error-msg">{errorMessage}</div>}
      {!signUpMode ? (
        <>
          <h4 className="auth-form-info">LOG IN</h4>
          <h4 className="auth-form-info">
            Tap Sign up if you don&apos;t have an account
          </h4>
          <input
            type="text"
            data-testid="title-input"
            className="text-input title-input"
            name="email"
            onChange={handleEmailOnChange}
            value={email}
            placeholder="Email"
            autoComplete="email"
            required
          />
          <input
            type="password"
            className="text-input artist-input"
            name="password"
            onChange={handlePasswordOnChange}
            value={password}
            placeholder="Password"
            autoComplete="password"
            required
          />
        </>
      ) : (
        <>
          <h4 className="auth-form-info">SIGN UP</h4>
          <h4 className="auth-form-info">You can use a fake email</h4>
          {/* next 2 inputs prevent annoying browser 
              behaviour with saved input values */}
          <input
            id="username"
            style={{ display: 'none' }}
            type="text"
            name="fakeusernameremembered"
          />
          <input
            id="password"
            style={{ display: 'none' }}
            type="password"
            name="fakepasswordremembered"
          />
          <input
            type="text"
            data-testid="title-input"
            className="text-input title-input"
            name="name"
            onChange={handleNameOnChange}
            value={name}
            placeholder="Name"
            autoComplete="name"
            required
          />
          <input
            type="text"
            data-testid="title-input"
            className="text-input title-input"
            name="email"
            onChange={handleEmailOnChange}
            value={email}
            placeholder="Email"
            autoComplete="email"
            required
          />
          <input
            type="password"
            className="text-input artist-input"
            name="password"
            onChange={handlePasswordOnChange}
            value={password}
            placeholder="Password"
            autoComplete="password"
            required
          />
          <input
            type="password"
            className="text-input artist-input"
            name="passwordConfirm"
            onChange={handlePasswordConfirmOnChange}
            value={passwordConfirm}
            placeholder="Repeat Password"
            autoComplete="passwordConfirm"
            required
          />
        </>
      )}

      <button className="auth-form-btn" type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {!signUpMode ? (
        <button
          className="auth-form-btn"
          type="button"
          onClick={handleSwitchForm}
        >
          Sign Up
        </button>
      ) : (
        <button
          className="auth-form-btn"
          type="button"
          onClick={handleSwitchForm}
        >
          Log In
        </button>
      )}
    </form>
  );
};

AuthForm.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
};

export default AuthForm;
