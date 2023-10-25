import { useState } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from './GlobalContext';

function GlobalState({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [menuComment, setMenuComment] = useState(false);

  const data = {
    showMenu,
    setShowMenu,
    nickname,
    setNickname,
    email,
    setEmail,
    password,
    setPassword,
    userId,
    setUserId,
    userRole,
    setUserRole,
    menuComment,
    setMenuComment,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
}

GlobalState.propTypes = {
  children: PropTypes.node, 
};

export default GlobalState;