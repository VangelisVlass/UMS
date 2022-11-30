import { slice } from './slice';
import { actionFactory } from '../../components/utils/actionFactory';

export const fetchAllUsers = actionFactory(slice.name, 'fetchAllUsers');
fetchAllUsers.succeeded = actionFactory(slice.name, 'fetchAllUsers_succeeded');
fetchAllUsers.failed = actionFactory(slice.name, 'fetchAllUsers_failed');

export const fetchUser = actionFactory(slice.name, 'fetchUser');
fetchUser.succeeded = actionFactory(slice.name, 'fetchUser_succeeded');
fetchUser.failed = actionFactory(slice.name, 'fetchUser_failed');

export const checkUserExist = actionFactory(slice.name, 'checkUserExist');
checkUserExist.succeeded = actionFactory(
  slice.name,
  'checkUserExist_succeeded'
);
checkUserExist.failed = actionFactory(slice.name, 'checkUserExist_failed');

export const postUser = actionFactory(slice.name, 'postUser');
postUser.succeeded = actionFactory(slice.name, 'postUser_succeeded');
postUser.failed = actionFactory(slice.name, 'postUser_failed');

export const updateUser = actionFactory(slice.name, 'updateUser');
updateUser.succeeded = actionFactory(slice.name, 'updateUser_succeeded');
updateUser.failed = actionFactory(slice.name, 'updateUser_failed');

export const deleteUser = actionFactory(slice.name, 'deleteUser');
deleteUser.succeeded = actionFactory(slice.name, 'deleteUser_succeeded');
deleteUser.failed = actionFactory(slice.name, 'deleteUser_failed');

export const startAuth = actionFactory(slice.name, 'startAuth');
export const userLogout = actionFactory(slice.name, 'userLogout');

export const navigate = actionFactory(slice.name, 'navigate');

export const {
  setUsers,
  setUser,
  increaseLoading,
  decreaseLoading,
  setCurrentPage,
  setPageAfterSucceededAuth,
  setUsersToShow,
  setPage,
  increasePage,
  decreasePage
} = slice.actions;
