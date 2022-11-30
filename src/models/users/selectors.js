import { slice } from "./slice";

const sliceName = slice.name;

export const users = (state) => state[sliceName].users;
export const user = (state) => isLoading ? state[sliceName].user : null;
export const isLoading = (state) => !!state[sliceName].isLoading;
export const currentPage = (state) => state[sliceName].currentPage;
export const usersToShow = (state) => state[sliceName].usersToShow;
export const page = (state) => state[sliceName].page;