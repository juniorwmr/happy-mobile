import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://happy-acre-backend.herokuapp.com/',
});
