import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteUser, updateUser } from '../../models/users/actions';

export function TableBody(props) {
  const [isReadOnly, setReadOnly] = useState(true);
  const [isBeingEdited, setBeingEdited] = useState(false);
  const [password, setPassword] = useState(props.password);
  const [fullName, setfullName] = useState(props.fullName);
  const [age, setAge] = useState(props.age);
  const [role, setRole] = useState(props.role);

  const dispatch = useDispatch();

  const handleSave = () => {
    if (!password || !fullName || !age || !role) {
      alert('Please fill all inputs');
      return;
    }
    setBeingEdited(false);
    setReadOnly(true);
    const userToSave = {
      id: props.id,
      username: props.username,
      password: password,
      fullName: fullName,
      age: Number(age),
      role: role,
      isPasswordSafe: false
    };
    dispatch(updateUser(userToSave));
  };

  return (
    <tr>
      <td className={isBeingEdited ? styles.isBeingEdited : null}>
        <input type="text" value={props.id} readOnly />
      </td>
      <td className={isBeingEdited ? styles.isBeingEdited : null}>
        <input type="text" value={props.username} readOnly />
      </td>
      <td className={isBeingEdited ? styles.isBeingEdited : null}>
        <input
          type="text"
          value={password}
          readOnly={isReadOnly}
          onChange={(e) => setPassword(e.target.value)}
        />
      </td>
      <td className={isBeingEdited ? styles.isBeingEdited : null}>
        <input
          type="text"
          value={fullName}
          readOnly={isReadOnly}
          onChange={(e) => setfullName(e.target.value)}
        />
      </td>
      <td className={isBeingEdited ? styles.isBeingEdited : null}>
        <input
          type="text"
          value={age}
          readOnly={isReadOnly}
          onChange={(e) => setAge(e.target.value)}
        />
      </td>
      <td className={isBeingEdited ? styles.isBeingEdited : null}>
        <input
          type="text"
          value={role}
          readOnly={isReadOnly}
          onChange={(e) => setRole(e.target.value)}
        />
      </td>
      <td>
        <button
          onClick={() => {
            setReadOnly(false);
            setBeingEdited(true);
          }}
        >
          <i className={`fa fa-pencil`} />
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            setBeingEdited(false);
            dispatch(deleteUser(props.id));
          }}
        >
          <i className={`fa fa-close`} />
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            handleSave();
          }}
        >
          <i className={`fa fa-check`} />
        </button>
      </td>
    </tr>
  );
}
