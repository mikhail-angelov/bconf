import axios from "axios";

const TOKEN_ID = "settings-auth"; //todo temp solution, move token to http cookies

const getToken = () => {
  const token = localStorage.getItem(TOKEN_ID);
  return token;
};
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_ID, token);
};

export const get = (url: string, params?: any) => axios.get(url, params);
export const post = (url: string, data?: any) => axios.post(url, data);

export const getWithAuth = (url: string, params?: any) =>
  axios.get(url, {
    params,
    headers: {
      authorization: `bearer ${getToken()}`
    }
  });
export const postWithAuth = (url: string, body?: any) =>
  axios.post(url, body, {
    headers: {
      authorization: `bearer ${getToken()}`
    }
  });
export const putWithAuth = (url: string, body?: any) =>
  axios.put(url, body, {
    headers: {
      authorization: `bearer ${getToken()}`
    }
  });
export const deleteWithAuth = (url: string, params?: any) =>
  axios.delete(url, {
    params,
    headers: {
      authorization: `bearer ${getToken()}`
    }
  });
