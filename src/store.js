import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { slice as usersSlice } from './models/users/slice';
import { rootEpic as userRootEpic } from './models/users/epics';

const rootEpic = combineEpics(userRootEpic);
const epicMiddleware = createEpicMiddleware();

export default configureStore({
    reducer: {
      [usersSlice.name]: usersSlice.reducer,
    },
    middleware: [epicMiddleware],
  });

  epicMiddleware.run(rootEpic);