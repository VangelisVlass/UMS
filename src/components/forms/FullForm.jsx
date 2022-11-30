import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { user as _user } from '../../models/users/selectors';
import { updateUser, userLogout } from '../../models/users/actions';

export function FullForm() {
  const user = useSelector(_user);

  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState(user?.password || '');
  const [confPassword, setConfPassword] = useState('');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [age, setAge] = useState(user?.age || '');
  const [role, setRole] = useState(user?.role || '');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isSaveDisabled, setSaveDisabled] = useState(true);
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setConfPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const clearInputs = () => {
    setUsername(user?.username || '');
    setPassword(user?.password || '');
    setFullName(user?.fullName || '');
    setAge(user?.age || '');
    setRole(user?.role || '');
  };

  useEffect(() => {
    setUsername(user?.username || '');
    setPassword(user?.password || '');
    setFullName(user?.fullName || '');
    setAge(user?.age || '');
    setRole(user?.role || '');
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    setInputDisabled(true);
    setButtonDisabled(true);
    const userToSave = {
      id: user?.id,
      username: username,
      password: password,
      fullName: fullName,
      age: Number(age),
      role: role,
      isPasswordSafe: true
    };
    dispatch(updateUser(userToSave));
  };

  //   Enable button if form inputs are filled
  //   and password matches confirm passord
  useEffect(() => {
    if (password.length >= 6 && confPassword === password) {
      setSaveDisabled(false);
    } else setSaveDisabled(true);
  }, [password, confPassword]);

  return (
    <div className={styles.box}>
      <form className={styles.flexColumn}>
        <div>
          <label htmlFor="username" />
          <input
            type="text"
            id="username"
            value={username}
            disabled={true}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" />
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            disabled={isInputDisabled}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setPasswordVisible((prev) => !prev);
            }}
          >
            <i
              className={`fa ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </button>
        </div>
        <div className={`${isInputDisabled ? styles.displayNone : null}`}>
          <label htmlFor="confPassword" />
          <input
            type={isConfPasswordVisible ? 'text' : 'password'}
            id="confPassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setConfPasswordVisible((prev) => !prev);
            }}
          >
            <i
              className={`fa ${
                isConfPasswordVisible ? 'fa-eye-slash' : 'fa-eye'
              }`}
            />
          </button>
        </div>
        <div>
          <label htmlFor="fullName" />
          <input
            type="text"
            id="fullName"
            value={fullName}
            disabled={isInputDisabled}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age" />
          <input
            type="text"
            id="age"
            value={age}
            disabled={isInputDisabled}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role" />
          <input
            type="text"
            id="role"
            value={role}
            disabled={true}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className={`${styles.inlineBlock} ${styles.keepMeLogged}`}>
          <input type="checkbox" id="keepMeLogged" />
          <label htmlFor="keepMeLogged"> Keep me logged in </label>
        </div>
        <div>
          <button
            disabled={isButtonDisabled || isSaveDisabled}
            onClick={(e) => handleSave(e)}
          >
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setInputDisabled(false);
              setButtonDisabled(false);
            }}
          >
            Edit
          </button>
          <button
            disabled={isButtonDisabled}
            onClick={(e) => {
              e.preventDefault();
              setInputDisabled(true);
              clearInputs();
              setButtonDisabled(true);
            }}
          >
            Cancel
          </button>
          <button
            disabled={!user.username}
            onClick={() => {
              dispatch(userLogout());
            }}
          >
            Log out
          </button>
        </div>
      </form>
    </div>
  );
}
