import axiosInstance from './axios-instance'

class BaseServices {
  path: string

  constructor(controllerEndpoint: string) {
    this.path = controllerEndpoint
  }

  get = async (url: string = '') => {
    const response = await axiosInstance.get(`${this.path}${url}`)
    return response.data
  }
}

export default BaseServices
