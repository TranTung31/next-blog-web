/* eslint-disable @typescript-eslint/no-explicit-any */
export type MetaType = {
  page: number
  pageSize: number
  total?: number
  filter?: {
    filterText?: string
    sortColumn?: string
    sortDirection?: number
  }
}

export type BaseResponseType = {
  status: boolean
  message: string
  result: any
}
