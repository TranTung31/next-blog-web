/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { menuServices } from '@/app/(admin)/admin/menu/_services/services'
import { BaseResponseType } from '@/types/common'
import { Menu, MenuProps, Skeleton } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

type SideBarProps = {
  collapsed: boolean
}

type MenuItem = Required<MenuProps>['items'][number]

const SideBar: React.FC<SideBarProps> = (props) => {
  const { collapsed } = props
  const router = useRouter()

  //#region State
  const [menuData, setMenuData] = useState<MenuItem[]>([])
  //#endregion

  const { data, isLoading } = menuServices.getMenuTree<BaseResponseType>()

  const handleClickMenuItem = ({ item }: any) => {
    router.push(item?.props?.path)
  }

  const convertMenuData = useCallback((dataRaw: any[]): MenuItem[] => {
    return dataRaw?.map((item: any) => {
      return {
        key: item?.id,
        label: item?.name,
        path: item?.path,
        children:
          item?.childrens?.length > 0
            ? convertMenuData(item?.childrens)
            : undefined,
      }
    })
  }, [])

  useEffect(() => {
    if (data) {
      setMenuData(convertMenuData(data?.result))
    }
  }, [convertMenuData, data])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
      width={250}
    >
      <div className="flex items-center justify-center h-[64px] border-r border-b">
        Logo
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Menu
          theme="light"
          mode="inline"
          items={menuData}
          onClick={handleClickMenuItem}
        />
      )}
    </Sider>
  )
}

export default SideBar
