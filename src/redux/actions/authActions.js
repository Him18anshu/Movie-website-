import { LOGIN_SUCCESS, LOGOUT } from './types';

export const loginUser = (userData) => (dispatch) => {
  localStorage.setItem('movieAppUser', JSON.stringify(userData));
  dispatch({
    type: LOGIN_SUCCESS,
    payload: userData,
  });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('movieAppUser');
  dispatch({ type: LOGOUT });
};