import { combineEpics, ofType } from 'redux-observable';
import {
  map,
  mergeMap,
  catchError,
  of,
  EMPTY,
  tap,
  filter,
  withLatestFrom
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  fetchAllUsers,
  fetchUser,
  postUser,
  updateUser,
  deleteUser,
  setUsers,
  setUser,
  increaseLoading,
  decreaseLoading,
  startAuth,
  navigate,
  userLogout,
  setPageAfterSucceededAuth,
  checkUserExist,
  setCurrentPage
} from './actions';
import { slice } from './slice';
import { navigateWithRules } from '../../permissions';
import { users, user } from './selectors';

const navigateEpic = (action$, state$) => {
  return action$.pipe(
    ofType(navigate.type),
    withLatestFrom(state$),
    map(([{ payload }, state]) => {
      return setCurrentPage(navigateWithRules(user(state), payload));
    })
  );
};

const startEpic = () => of(startAuth());

const startAuthEpic = (action$) => {
  return action$.pipe(
    ofType(startAuth.type),
    mergeMap(() => {
      const savedUsername = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('password');

      const actionsForReturn = [];
      actionsForReturn.push(
        setPageAfterSucceededAuth(
          window.location.pathname !== '/auth' && window.location.pathname !== '/change-password' ? window.location.pathname : '/'
        )
      );

      if (savedUsername && savedPassword) {
        actionsForReturn.push(
          fetchUser({
            username: savedUsername,
            password: savedPassword
          })
        );
      } else {
        actionsForReturn.push(navigate('/auth'));
      }

      return actionsForReturn;
    })
  );
};

const fetchAllUsersEpic = (action$) => {
  return action$.pipe(
    ofType(fetchAllUsers.type),
    mergeMap(() => {
      return ajax({
        url: `https://apis.stackprint.io/mycmsapi/user`,
        method: 'GET',
        crossDomain: true
      }).pipe(
        map((data) => {
          const users = data.response;
          if (users?.length > 0) {
            return fetchAllUsers.succeeded(users);
          }
          return fetchAllUsers.failed('No User in the Database');
        }),
        catchError(() => of(fetchAllUsers.failed('Something went wrong')))
      );
    })
  );
};

const fetchUserEpic = (action$) => {
  return action$.pipe(
    ofType(fetchUser.type),
    mergeMap(({ payload }) => {
      return ajax({
        url: `https://apis.stackprint.io/mycmsapi/user?username=${payload.username}&password=${payload.password}`,
        method: 'GET',
        crossDomain: true
      }).pipe(
        map((data) => {
          const user = data.response;
          console.log(user[0]);
          if (user?.length > 0) {
            return fetchUser.succeeded(user[0]);
          }

          return fetchUser.failed('No such user in the Database');
        }),
        catchError(() => of(fetchUser.failed('Something went wrong')))
      );
    })
  );
};

const fetchUserFailedEpic = (action$) => {
  return action$.pipe(
    ofType(fetchUser.failed.type),
    tap(() => {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }),
    map(() => {
      return navigate('/auth');
    })
  );
};

const userLogoutEpic = (action$) => {
  return action$.pipe(
    ofType(userLogout.type),
    tap(() => {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }),
    mergeMap(() => {
      const actionsForReturn = [];
      actionsForReturn.push(setUser({}));
      actionsForReturn.push(navigate('/auth'));
      return actionsForReturn;
    })
  );
};

const checkUserExistEpic = (action$) => {
  return action$.pipe(
    ofType(checkUserExist.type),
    mergeMap(({ payload }) => {
      return ajax({
        url: `https://apis.stackprint.io/mycmsapi/user?username=${payload.username}`,
        method: 'GET',
        crossDomain: true
      }).pipe(
        mergeMap((data) => {
          const user = data.response;
          console.log(user[0]);
          if (user?.length > 0) {
            return [postUser.failed('User already in the Database')];
          }

          return [decreaseLoading(), postUser(payload)];
        }),
        catchError(() => of(fetchUser.failed('Something went wrong')))
      );
    })
  );
};

const postUserEpic = (action$) => {
  return action$.pipe(
    ofType(postUser.type),
    mergeMap(({ payload }) => {
      console.log(payload);
      return ajax({
        url: `https://apis.stackprint.io/mycmsapi/user`,
        method: 'POST',
        crossDomain: true,
        body: JSON.stringify(payload)
      }).pipe(
        map((data) => {
          const user = data.response;
          console.log(user);
          if (user) {
            return postUser.succeeded(user);
          }

          return postUser.failed('No such user in the Database');
        }),
        catchError(() => of(postUser.failed('Something went wrong')))
      );
    })
  );
};

const updateUserEpic = (action$) => {
  return action$.pipe(
    ofType(updateUser.type),
    mergeMap(({ payload }) => {
      console.log(payload);
      console.log(payload.id);
      return ajax({
        url: `https://apis.stackprint.io/mycmsapi/user/${payload.id}`,
        method: 'PUT',
        crossDomain: true,
        body: JSON.stringify(payload)
      }).pipe(
        map((data) => {
          const user = data.response;
          console.log(user);
          if (user) {
            return updateUser.succeeded(user);
          }

          return updateUser.failed('No such user in the Database');
        }),
        catchError(() => of(updateUser.failed('Something went wrong')))
      );
    })
  );
};

const deleteUserEpic = (action$) => {
  return action$.pipe(
    ofType(deleteUser.type),
    mergeMap(({ payload }) => {
      console.log(payload);
      return ajax({
        url: `https://apis.stackprint.io/mycmsapi/user/${payload}`,
        method: 'DELETE',
        crossDomain: true
      }).pipe(
        map((data) => {
          if (data.status === 204) {
            return deleteUser.succeeded(payload);
          }

          return deleteUser.failed('No such user in the Database');
        }),
        catchError(() => of(deleteUser.failed('Something went wrong')))
      );
    })
  );
};

const deleteUserSuccededEpic = (action$, state$) => {
  return action$.pipe(
    ofType(deleteUser.succeeded.type),
    withLatestFrom(state$),
    map(([{ payload }, state]) => {
      return setUsers(users(state).filter(u => u.id !== payload));
    })
  );
};

const fetchAllUsersSuccededEpic = (action$) => {
  return action$.pipe(
    ofType(fetchAllUsers.succeeded.type),
    map(({ payload }) => {
      return setUsers(payload);
    })
  );
};

const fetchUserSuccededEpic = (action$, state$) => {
  return action$.pipe(
    ofType(fetchUser.succeeded.type, postUser.succeeded.type),
    withLatestFrom(state$),
    mergeMap(([{ payload }, state]) => {
      const actionsForReturn = [];

      // Na elegxei apo to state an prepei na ta apo8hkeusei sto localStorage
      if (localStorage.getItem('keepMeLogged') === 'true') {
        localStorage.setItem('username', payload.username);
        localStorage.setItem('password', payload.password);
      }

      actionsForReturn.push(setUser(payload));
      if (payload.isPasswordSafe) {
        actionsForReturn.push(
          navigate(state[slice.name].pageAfterSucceededAuth || '/')
        );
      } else {
        actionsForReturn.push(navigate('/change-password'));
      }

      return actionsForReturn;
    })
  );
};

const updateUserSucceededEpic = (action$) => {
  return action$.pipe(
    ofType(updateUser.succeeded.type),
    mergeMap(({ payload }) => {
      const actionsForReturn = [];
      const loggedUser = localStorage.getItem('username');
      if (payload.username === loggedUser) {
        actionsForReturn.push(setUser(payload));
        actionsForReturn.push(navigate('/'));
      }
      return actionsForReturn;
    })
  );
};

const failedActionsEpic = (action$) => {
  return action$.pipe(
    filter((action) => action.type.endsWith('_failed')),
    tap(({ payload }) => alert(payload)),
    mergeMap(() => {
      return EMPTY;
    })
  );
};

const increaseLoadingEpic = (action$) => {
  return action$.pipe(
    ofType(
      fetchAllUsers.type,
      fetchUser.type,
      checkUserExist.type,
      postUser.type,
      updateUser.type,
      deleteUser.type
    ),
    map(() => {
      return increaseLoading();
    })
  );
};

const decreaseLoadingEpic = (action$) => {
  return action$.pipe(
    filter(
      (action) =>
        action.type.endsWith('_succeeded') || action.type.endsWith('_failed')
    ),
    map(() => {
      return decreaseLoading();
    })
  );
};

const rootEpic = combineEpics(
  deleteUserSuccededEpic,
  navigateEpic,
  startEpic,
  startAuthEpic,
  fetchUserFailedEpic,
  fetchAllUsersEpic,
  fetchAllUsersSuccededEpic,
  fetchUserEpic,
  fetchUserSuccededEpic,
  checkUserExistEpic,
  postUserEpic,
  userLogoutEpic,
  updateUserEpic,
  updateUserSucceededEpic,
  deleteUserEpic,
  failedActionsEpic,
  increaseLoadingEpic,
  decreaseLoadingEpic
);

export { rootEpic };
