import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../models/users/actions';

export function LogInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonActive, setButtonActive] = useState(true);
  const [keepMeLogged, setKeepMeLogged] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(fetchUser({username, password}));
    localStorage.setItem('keepMeLogged', keepMeLogged ? 'true' : 'false');
  };

  //Enable button if form inputs are filled
  useEffect(() => {
    if (username && password) {
      setButtonActive(false);
    } else setButtonActive(true);
  }, [username, password]);

  return (
    <div className={styles.box}>
      <form className={styles.flexColumn}>
        <div>
          <label htmlFor="username" />
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={`${styles.inlineBlock} ${styles.keepMeLogged}`}>
          <input
            type="checkbox"
            id="keepMeLogged"
            onChange={() => setKeepMeLogged(!keepMeLogged)}
          />
          <label htmlFor="keepMeLogged"> Keep me logged in </label>
        </div>
        <div>
          <button disabled={isButtonActive} onClick={(e) => handleLogin(e)}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
