import { create } from "apisauce";

const backendApi = create({
  baseURL: process.env.apiBase,
  withCredentials: true,
});

export const setTokenHeader = ({ token }) =>
  backendApi.setHeader("Authorization", token);
export const get = ({ url, params, config }) =>
  backendApi.get(url, params, config);
export const post = ({ url, body, config }) =>
  backendApi.post(url, body, config);
export const del = ({ url, params, config }) =>
  backendApi.delete(url, params, config);
