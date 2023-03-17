import axios, { CanceledError } from 'axios';
import Constants from 'expo-constants';

const apiUrl: string = Constants.expoConfig?.extra?.apiUrl;

export const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!(error instanceof CanceledError)) {
      console.error(error.message);
      console.error(error.response?.data);
    }

    return error;
  },
);
