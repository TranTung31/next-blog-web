'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

/**
 *
 * @description types is string[] like. ['create','view','edit']
 * @returns type, value, handleSetModal, handleClose
 */

export default function useModal<T extends string>(types: readonly string[]) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  //#region State
  const [modalChange, setModalChange] = useState<{
    type: T[] | undefined
    value: Record<T, string | null> | undefined
  }>({
    type: undefined,
    value: undefined,
  })
  //#endregion

  const handleSetModal = useCallback(
    (type: (typeof types)[number], value: string = 'true') => {
      const _searchParams = new URLSearchParams(searchParams)
      types.forEach((item) => {
        _searchParams.delete(item)
      })
      _searchParams.set(type, value)
      setModalChange({
        type: [type as T],
        value: { [type]: value } as Record<T, string>,
      })
      router.replace(`?${_searchParams.toString()}`)
    },
    [searchParams, router, types]
  )

  //#region Hàm xóa tất cả query trên url
  const handleClose = useCallback(() => {
    setModalChange({ type: undefined, value: undefined })
    router.push(`${pathName}`)
  }, [pathName, router])
  //#endregion

  useEffect(() => {
    if (!types) return

    const activeTypes: T[] = []
    const values: Record<T, string | null> = {} as Record<T, string | null>

    // Lấy tất cả các query tương ứng trên url
    types.forEach((type) => {
      const _params = searchParams.get(type)
      if (_params) {
        activeTypes.push(type as T)
        values[type as T] = _params
      }
    })

    if (activeTypes.length > 0) {
      setModalChange({
        type: activeTypes,
        value: values,
      })
    } else {
      setModalChange({
        type: undefined,
        value: undefined,
      })
    }
  }, [types, searchParams])

  return {
    type: modalChange.type,
    value: modalChange.value,
    handleClose,
    handleSetModal,
  }
}
