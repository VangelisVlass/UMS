import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  user: {},
  isLoading: 0,
  currentPage: '/',
  pageAfterSucceededAuth: '',
  usersToShow: 3,
  page: 1
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    increaseLoading: (state) => {
      state.isLoading += 1;
    },
    decreaseLoading: (state) => {
      state.isLoading -= 1;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setPageAfterSucceededAuth: (state, { payload }) => {
      state.pageAfterSucceededAuth = payload;
    },
    setUsersToShow: (state, { payload }) => {
      state.usersToShow = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    increasePage: (state) => {
      state.page += 1;
    },
    decreasePage: (state) => {
      state.page -= 1;
    }
  }
});
