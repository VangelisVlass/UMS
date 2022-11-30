import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user as _user } from '../../models/users/selectors';
import { updateUser } from '../../models/users/actions';

export function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [isButtonDisabed, setButtonDisabled] = useState(true);
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setConfPasswordVisible] = useState(false);

  const user = useSelector(_user);

  const dispatch = useDispatch();

  const handleSave = (e) => {
    e.preventDefault();
    const userToSave = {
      id: user.id,
      username: user.username,
      password: password,
      fullName: user.fullName,
      age: Number(user.age),
      role: user.role,
      isPasswordSafe: true
    };
    dispatch(updateUser(userToSave));
  };

  //Enable button if form inputs are filled
  //and password matches confirm passord

  useEffect(() => {
    if (oldPassword && password && confPassword) {
      if (user.password === oldPassword) {
        if (password.length >= 6 && confPassword === password) {
          setButtonDisabled(false);
        } else setButtonDisabled(true);
      } else setButtonDisabled(true);
    } else setButtonDisabled(true);
  }, [oldPassword, password, confPassword, user.password]);

  return (
    <div className={styles.box}>
      <form className={styles.flexColumn}>
        <div>
          <label htmlFor="oldPassword" />
          <input
            type={isOldPasswordVisible ? 'text' : 'password'}
            id="oldPassword"
            placeholder="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setOldPasswordVisible((prev) => !prev);
            }}
          >
            <i
              className={`fa ${
                isOldPasswordVisible ? 'fa-eye-slash' : 'fa-eye'
              }`}
            />
          </button>
        </div>
        <div>
          <label htmlFor="newPassword" />
          <input
            type={isNewPasswordVisible ? 'text' : 'password'}
            id="newPassword"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setNewPasswordVisible((prev) => !prev);
            }}
          >
            <i
              className={`fa ${
                isNewPasswordVisible ? 'fa-eye-slash' : 'fa-eye'
              }`}
            />
          </button>
        </div>
        <div>
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
          <button disabled={isButtonDisabed} onClick={(e) => handleSave(e)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
