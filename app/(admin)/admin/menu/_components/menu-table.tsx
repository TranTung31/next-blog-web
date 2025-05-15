/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ITable from '@/components/shared/ITable'
import { DefaultMeta } from '@/constants/constants'
import { BaseResponseType, MetaType } from '@/types/common'
import { Button as AntButton, Flex, TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { menuServices } from '../_services/services'

interface DataType {
  id: number
  name: string
  path: string
}

const MenuTable = () => {
  //#region State
  const [meta, setMeta] = useState<MetaType>(DefaultMeta)
  const [dataTable, setDataTable] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  //#endregion

  const { data, isLoading } = menuServices.getPagingMenu<BaseResponseType>(meta)

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '8%',
      render: (_: unknown, __: unknown, index: number) => (
        <div>{index + 1}</div>
      ),
    },
    {
      title: 'Tên menu',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: '32%',
    },
    {
      title: 'Đường dẫn menu',
      dataIndex: 'path',
      key: 'path',
      align: 'left',
      width: '45%',
    },
    {
      title: 'Thao tác',
      dataIndex: 'thaoTac',
      key: 'thaoTac',
      align: 'center',
      width: '15%',
      render: () => (
        <Flex gap="middle" justify="center" className="text-xl">
          <EyeOutlined />
          <EditOutlined />
          <DeleteOutlined />
        </Flex>
      ),
    },
  ]

  const handleChangePagination = (page: number, pageSize: number) => {
    setMeta((prev) => ({ ...prev, page, pageSize }))
  }

  useEffect(() => {
    if (data) {
      setDataTable(data?.result?.data)
      setMeta((prev) => ({
        ...prev,
        total: data?.result?.total,
      }))
    }
  }, [data])

  return (
    <>
      <ITable
        columns={columns}
        dataSource={dataTable}
        meta={meta}
        title={() => (
          <div className="flex items-center justify-between">
            <h1>Quản lý menu</h1>
            {/* <Button className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer">
                Thêm mới
              </Button> */}
            <AntButton type="primary" onClick={() => setIsModalOpen(true)}>
              Thêm mới
            </AntButton>
          </div>
        )}
        loading={isLoading}
        handleChangePagination={handleChangePagination}
      />
    </>
  )
}

export default MenuTable
