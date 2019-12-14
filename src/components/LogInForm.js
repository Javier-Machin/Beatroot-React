import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { logIn } from '../api/music-beast-api';

const LogInForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailOnChange = ({ target }) => setEmail(target.value);
  const handlePasswordOnChange = ({ target }) => setPassword(target.value);

  const handleSubmit = event => {
    event.preventDefault();
    const { setLoggedIn } = props;
    logIn(email, password, setLoggedIn);
  };

  return (
    <form className="track-form">
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
      <button className="track-form-submit" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

LogInForm.propTypes = {
  setLoggedIn: PropTypes.func.isRequired
};

export default LogInForm;
