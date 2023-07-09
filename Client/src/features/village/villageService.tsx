import * as httpRequest from '~/utils/httpRequest';
const API_URL = '/village/';

export const getVillage = (_id: string, accessToken: string) => {
  return httpRequest.get(API_URL + `getVillage/${_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const createVillage = (data: object, accessToken: string) => {
  return httpRequest.post(API_URL + `createVillage`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const getAllVillage = (accessToken: string) => {
  return httpRequest.get(API_URL + `getAllVillage`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const updateProfile = (
  VillageId: string,
  data: object,
  accessToken: string,
) => {
  return httpRequest.post(API_URL + `updateProfile/${VillageId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const deleteVillage = (VillageId: string, accessToken: string) => {
  return httpRequest.deleteOne(API_URL + `deleteVillage/${VillageId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
