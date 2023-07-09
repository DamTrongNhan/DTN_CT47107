import * as httpRequest from '~/utils/httpRequest';
const API_URL = '/Workers/';

export const getWorkers = (_id: string, accessToken: string) => {
  return httpRequest.get(API_URL + `getWorkers/${_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const createWorkers = (
  smallHolderId: string,
  data: object,
  accessToken: string,
) => {
  return httpRequest.post(API_URL + `createWorkers/${smallHolderId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getAllWorkers = (_id: string, accessToken: string) => {
  return httpRequest.get(API_URL + `getAllWorkers/${_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateProfile = (
  _id: string,
  data: object,
  accessToken: string,
) => {
  return httpRequest.post(API_URL + `updateProfile/${_id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const deleteWorkers = (_id: string, accessToken: string) => {
  return httpRequest.deleteOne(API_URL + `deleteWorkers/${_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
