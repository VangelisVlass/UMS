import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Pagination } from '../components/tables/Pagination';
import { TableHead } from '../components/tables/TableHead';
import { TableBody } from '../components/tables/TableBody';
import { fetchAllUsers } from '../models/users/actions';
import {
  users as _users,
  usersToShow as _usersToShow,
  page as _page
} from '../models/users/selectors';

export function AllUsers() {
  const users = useSelector(_users);
  const usersToShow = useSelector(_usersToShow);
  const page = useSelector(_page);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.container}>
        <Pagination />
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <TableHead />
          </thead>
          <tbody>
            {users ? (
              users
                .slice(usersToShow * (page - 1), usersToShow * page)
                .map((user) => <TableBody key={user.id} {...user} />)
            ) : (
              <tr>
                <td>loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
