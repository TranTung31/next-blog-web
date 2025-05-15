/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MetaType } from '@/types/common'
import axiosInstance from '@/utils/axios-instance'
import BaseServices from '@/utils/base-services'
import useSWR from 'swr'

class services extends BaseServices {
  getMenuTree = <T>() => {
    type MenuTreeType = {
      isLoading: boolean
      data: T
      error: any
    }

    const { isLoading, data, error } = useSWR<T>(
      'menu/tree',
      async () => {
        return (await axiosInstance.get('menu/tree')) as T
      },
      {
        revalidateOnFocus: false,
      }
    )

    return { isLoading, data, error } as MenuTreeType
  }

  getPagingMenu = <T>(meta: MetaType) => {
    const textSearch = meta.filter?.filterText
    const { data, isLoading, error, mutate } = useSWR<T>(
      `menu?page=${meta.page}&pageSize=${meta.pageSize}&filterText=${meta.filter?.filterText}`,
      async () => {
        return (await axiosInstance.get(
          `menu?page=${meta.page}&pageSize=${meta.pageSize}${
            textSearch ? `&filterText=${textSearch}` : ''
          }`
        )) as T
      },
      { revalidateOnFocus: false }
    )

    return {
      data,
      isLoading,
      error,
      mutate,
    }
  }
}

const menuServices = new services('menu')

export { menuServices }
