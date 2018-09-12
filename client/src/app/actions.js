import { v4 } from 'uuid';
import UserApi from './api/usersApi';

export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED';
export const FETCH_USERS_REJECTED = ' FETCH_USERS_REJECTED';

export const ADD_USER_PENDING = 'ADD_USER_PENDING';
export const ADD_USER_FULFILLED = 'ADD_USER_FULFILLED';
export const ADD_USER_REJECTED = 'ADD_USER_REJECTED';

export const REMOVE_USER_PENDING = 'REMOVE_USER_PENDING';
export const REMOVE_USER_FULFILLED = 'REMOVE_USER_FULFILLED';
export const REMOVE_USER_REJECTED = 'REMOVE_USER_REJECTED';

export function getUsersPending() {
  return { type: FETCH_USERS_PENDING };
}

export function getUsersRejected(error) {
  return { type: FETCH_USERS_REJECTED, error };
}

export function getUsersFullfilled(users) {
  return { type: FETCH_USERS_FULFILLED, users };
}

export function getUsers() {
  return dispatch => {
    dispatch(getUsersPending());
    UserApi.getUsers()
      .then(sleeper(100))
      .then(users => {
        dispatch(getUsersFullfilled(users));
      })
      .catch(function(response) {
        console.log(response);
      });
  };
}

export function addUserPending() {
  return { type: ADD_USER_PENDING };
}

export function addUserFullfilled(user) {
  return { type: ADD_USER_FULFILLED, id: v4(), user };
}

export function addUser(user) {
  return dispatch => {
    dispatch(addUserPending());
    UserApi.addUser(user)
      .then(sleeper(100))
      .then(user => {
        dispatch(addUserFullfilled(user));
      })
      .catch(function(response) {
        console.log(response);
      });
  };
}

export function removeUser(id) {
  return dispatch => {
    dispatch(removeUserPending());
    UserApi.removeUser(id)
      .then(sleeper(100))
      .then(user => {
        dispatch(removeUserFullfilled(id));
      })
      .catch(function(response) {
        console.log(response);
      });
  };
}

export const removeUserPending = id => {
  return { type: REMOVE_USER_PENDING, id };
};

export const removeUserFullfilled = id => {
  return { type: REMOVE_USER_FULFILLED, id };
};
//utility fn for request delay
function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}
