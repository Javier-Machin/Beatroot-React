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
  const handleSwitchForm = () => setSignUpMode(!signUpMode);

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
    <form className="auth-form">
      {errorMessage && <div className="auth-error-msg">{errorMessage}</div>}
      {signUpMode && (
        <input
          type="text"
          data-testid="title-input"
          className="text-input title-input"
          name="name"
          onChange={handleNameOnChange}
          value={name}
          placeholder="Name"
          required
        />
      )}
      <input
        type="text"
        data-testid="title-input"
        className="text-input title-input"
        name="email"
        onChange={handleEmailOnChange}
        value={email}
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="text-input artist-input"
        name="password"
        onChange={handlePasswordOnChange}
        value={password}
        placeholder="Password"
        required
      />
      {signUpMode && (
        <input
          type="password"
          className="text-input artist-input"
          name="passwordConfirm"
          onChange={handlePasswordConfirmOnChange}
          value={passwordConfirm}
          placeholder="Repeat Password"
          required
        />
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
