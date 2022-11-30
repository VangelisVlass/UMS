import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '../../models/users/actions';
import { user as _user } from '../../models/users/selectors';
import { isLinkVisible } from '../../permissions';

export function Header() {
  const user = useSelector(_user);

  const dispatch = useDispatch();

  const handlePageChange = (selectedPage) => {
    dispatch(navigate(selectedPage));
  };

  return (
    <>
      <nav>
        <div>
          <img src="ums.png" alt="umsLogo"></img>
        </div>

        {
          isLinkVisible(user, '/') ? (
            <div className={styles.navBtn} onClick={() => handlePageChange('/')}>
              <Link to="/">Home</Link>
            </div>
          ) : null
        }

        {
          isLinkVisible(user, '/all-users') ? (
            <div
              className={styles.navBtn}
              onClick={() => handlePageChange('/all-users')}
            >
              <Link to="/all-users">Users</Link>
            </div>
          ) : null
        }
      </nav>
    </>
  );
}
