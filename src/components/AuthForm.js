import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { signUp, logIn } from '../api/music-beast-api';

const AuthForm = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [signUpMode, setSignUpMode] = useState(false);

  const handleNameOnChange = ({ target }) => setName(target.value);
  const handleEmailOnChange = ({ target }) => setEmail(target.value);
  const handlePasswordOnChange = ({ target }) => setPassword(target.value);
  const handlePasswordConfirmOnChange = ({ target }) => setPasswordConfirm(target.value);
  const handleSwitchToSignUp = () => setSignUpMode(!signUpMode);

  const handleSubmit = event => {
    event.preventDefault();
    const { setLoggedIn } = props;

    if (signUpMode) {
      signUp(name, email, password, passwordConfirm, setLoggedIn);
      return;
    }
    logIn(email, password, setLoggedIn);
  };

  return (
    <form className="track-form">
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
      <button className="track-form-submit" type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {!signUpMode ? (
        <button
          className="track-form-submit"
          type="button"
          onClick={handleSwitchToSignUp}
        >
          Sign Up
        </button>
      ) : (
        <button
          className="track-form-submit"
          type="button"
          onClick={handleSwitchToSignUp}
        >
          Log In
        </button>
      )}
    </form>
  );
};

AuthForm.propTypes = {
  setLoggedIn: PropTypes.func.isRequired
};

export default AuthForm;
