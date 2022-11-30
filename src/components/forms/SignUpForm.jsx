import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { checkUserExist } from '../../models/users/actions';

export function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [isButtonActive, setButtonActive] = useState(true);
  const [keepMeLogged, setKeepMeLogged] = useState(false);

  const dispatch = useDispatch();

  const handleSignUp = (e) => {
    e.preventDefault();
    const userToSignUP = {
      username: username,
      password: password,
      fullName: "",
      age: 0,
      role: "",
      isPasswordSafe: true
    };
    dispatch(checkUserExist(userToSignUP));
    localStorage.setItem('keepMeLogged', keepMeLogged ? 'true' : 'false');
  };

  //Enable button if form inputs are filled
  //and password matches confirm passord
  useEffect(() => {
    if (username && password && confPassword) {
      if (
        password.length >= 6 &&
        confPassword === password &&
        username !== 'admin'
      ) {
        setButtonActive(false);
      } else setButtonActive(true);
    }
  }, [username, password, confPassword]);

  return (
    <div className={styles.box}>
      <form className={styles.flexColumn}>
        <div>
          <label htmlFor="SUusername" />
          <input
            type="text"
            id="SUusername"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="SUpassword" />
          <input
            type="password"
            id="SUpassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="SUconfPassword" />
          <input
            type="password"
            id="SUconfPassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>
        <div className={`${styles.inlineBlock} ${styles.keepMeLogged}`}>
          <input onChange={() => setKeepMeLogged(!keepMeLogged)} type="checkbox" id="SUkeepMeLogged" />
          <label htmlFor="SUkeepMeLogged"> Keep me logged in </label>
        </div>
        <div>
          <button disabled={isButtonActive} onClick={(e) => handleSignUp(e)}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
