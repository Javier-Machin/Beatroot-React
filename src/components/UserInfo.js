import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './css/userinfo.css';
import Cookies from 'universal-cookie';
import closeIcon from '../assets/logout.svg';

const UserInfo = props => {
  const [userName, setUserName] = useState('');
  const { setLoggedIn } = props;

  useEffect(() => {
    const cookies = new Cookies();
    const userNameTemp = cookies.get('userName');
    if (userNameTemp !== userName) setUserName(userNameTemp);
  }, [userName]);

  const logOut = () => {
    const cookies = new Cookies();
    cookies.remove('auth');
    setLoggedIn(false);
    setUserName('');
  };

  return (
    <div className="userinfo-container">
      <span>Logged in as: {userName}</span>
      <button
        title="Log out"
        type="button"
        className="logout-btn"
        onClick={logOut}
      >
        <img
          className="icon icon-logout"
          alt="close modal icon"
          src={closeIcon}
        />
      </button>
    </div>
  );
};

UserInfo.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
};

export default UserInfo;
