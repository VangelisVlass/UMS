import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUsersToShow,
  setPage,
  decreasePage,
  increasePage
} from '../../models/users/actions';
import {
  usersToShow as _usersToShow,
  page as _page,
  users as _users
} from '../../models/users/selectors';

export function Pagination() {
  const usersToShow = useSelector(_usersToShow);
  const users = useSelector(_users);
  const page = useSelector(_page);

  let lastPage = Math.ceil(users.length / usersToShow);
  console.log(lastPage)

  const dispatch = useDispatch();

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => dispatch(setPage(1))}>
        <i className={`fa fa-angle-double-left`} />
      </button>
      <button disabled={page === 1} onClick={() => dispatch(decreasePage())}>
        <i className={`fa fa-angle-left`} />
      </button>
      <select
        name="page"
        className={styles.selector}
        value={usersToShow}
        onChange={(e) => dispatch(setUsersToShow(Number(e.target.value)))}
      >
        <option>3</option>
        <option>10</option>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
      <input
        type="text"
        className={styles.smallInput}
        onChange={(e) => dispatch(setPage(e.target.value))}
        placeholder={`Page ${page}`}
      />
      <button
        disabled={lastPage === page}
        onClick={() => dispatch(increasePage())}
      >
        <i className={`fa fa-angle-right`} />
      </button>
      <button
        disabled={lastPage === page}
        onClick={() => dispatch(setPage(lastPage))}
      >
        <i className={`fa fa-angle-double-right`} />
      </button>
    </div>
  );
}
