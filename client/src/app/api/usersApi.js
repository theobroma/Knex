import axios from 'axios';
import mockData from '../helpers/MOCK_DATA.json';

//url fake :)
const url = 'https://jsonplaceholder.typicode.com/posts';
const urlId = 'https://jsonplaceholder.typicode.com/posts/1';

export function getUsers() {
  return axios.get(url).then(response => {
    return mockData;
  });
}

export function addUser(user) {
  return axios.post(url, user).then(response => {
    return user;
  });
}

export function removeUser(user) {
  return axios.delete(urlId, user).then(response => {
    return user;
  });
}

export default {
  getUsers,
  addUser,
  removeUser
};
