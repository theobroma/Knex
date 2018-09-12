import { combineReducers } from 'redux';

import {
  FETCH_USERS_PENDING,
  FETCH_USERS_FULLFILED,
  FETCH_USERS_REJECTED,
  FETCH_USERS_FULFILLED,
  ADD_USER_PENDING,
  ADD_USER_FULFILLED,
  REMOVE_USER_PENDING,
  REMOVE_USER_FULFILLED
} from './actions';

export const usersInitialState = {
  data: [],
  pending: false,
  errorMessage: ''
};

function users(state = usersInitialState, action) {
  switch (action.type) {
    case FETCH_USERS_PENDING:
    case ADD_USER_PENDING:
    case REMOVE_USER_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_USERS_REJECTED:
      return {
        ...state,
        pending: false,
        errorMessage: action.error
      };
    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        pending: false,
        data: action.users
      };
    case ADD_USER_FULFILLED:
      return {
        ...state,
        pending: false,
        data: [
          {
            id: action.id,
            ...action.user
          },
          ...state.data
        ]
      };
    case REMOVE_USER_FULFILLED:
      return {
        ...state,
        pending: false,
        data: state.data.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

export default combineReducers({ users });
