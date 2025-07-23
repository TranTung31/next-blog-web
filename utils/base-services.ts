/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axios-instance";

class BaseServices {
  path: string;

  constructor(controllerEndpoint: string) {
    this.path = controllerEndpoint;
  }

  get = async (url: string = "") => {
    const response = await axiosInstance.get(`${this.path}${url}`);
    return response.data;
  };

  getById = async (id: string | number) => {
    return (await axiosInstance.get(`${this.path}/${id}`)) as any;
  };

  create = async (payload: any) => {
    return await axiosInstance.post(`${this.path}`, payload);
  };

  update = async (id: string | number, payload: any) => {
    return await axiosInstance.put(`${this.path}/${id}`, payload);
  };

  delete = async (id: string | number) => {
    return await axiosInstance.delete(`${this.path}/${id}`);
  };
}

export default BaseServices;
