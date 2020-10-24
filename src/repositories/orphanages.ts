import { api } from '../services/api';

export const URL_USERS = `/orphanages`;

export interface IOrphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: [{}];
}

export default {
  async create(data: FormData) {
    try {
      return await api.post<IOrphanage>(`${URL_USERS}`, data);
    } catch (err) {
      console.error(`Your request (POST) to ${URL_USERS} FAILED. \n\n` + err);
    }
  },
};
