import { LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const savedUser = JSON.parse(localStorage.getItem('movieAppUser'));

const initialState = {
  isAuthenticated: Boolean(savedUser),
  user: savedUser || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;