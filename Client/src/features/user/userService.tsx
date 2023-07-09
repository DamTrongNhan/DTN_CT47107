import * as httpRequest from '~/utils/httpRequest';
const API_URL = '/user/';

export const createUser = (data: object, accessToken: string) => {
  return httpRequest.post(API_URL + `createUser`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getUser = (_id: string, accessToken: string) => {
  return httpRequest.get(API_URL + `getUser/${_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getUserBySmallHolder = (_id: string, accessToken: string) => {
  return httpRequest.get(API_URL + `getUserBySmallHolder/${_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const deleteUser = (_id: string, accessToken: string) => {
  return httpRequest.deleteOne(API_URL + `deleteAccount/${_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getAllUser = (accessToken: string) => {
  return httpRequest.get(API_URL + `getAllUser/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const updateProfile = (data: any, accessToken: string) => {
  return httpRequest.post(API_URL + 'updateProfile', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
