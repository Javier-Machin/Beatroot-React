import React from 'react';
import './css/userinfo.css';
import Cookies from 'universal-cookie';
import closeIcon from '../assets/logout.svg';

const UserInfo = props => {
  const { userName = 'Pepega', setLoggedIn, setUserName } = props;

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

export default UserInfo;
