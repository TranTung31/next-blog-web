'use client'

import { MetaType } from '@/types/common'
import { Table as AntTable, Pagination, TableProps } from 'antd'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ITableProps<T> extends TableProps<T> {
  className?: string
  meta: MetaType
  handleChangePagination: (page: number, pageSize: number) => void
}

const ITable = <T extends object>({
  className,
  meta,
  handleChangePagination,
  ...props
}: ITableProps<T>) => {
  return (
    <div>
      <AntTable
        rowKey="id"
        className={twMerge(
          'custom-table',
          // Thêm các class mặc định cho table
          // 'rounded-lg overflow-hidden',
          // Custom style cho header
          // '[&_.ant-table-thead_.ant-table-cell]:bg-gray-50',
          // '[&_.ant-table-thead_.ant-table-cell]:text-gray-700',
          // '[&_.ant-table-thead_.ant-table-cell]:font-semibold',
          // Custom style cho rows
          // '[&_.ant-table-tbody_.ant-table-cell]:border-gray-200',
          // '[&_.ant-table-tbody_.ant-table-row:hover]:bg-gray-50',
          // Custom style cho pagination
          // '[&_.ant-pagination-item]:border-gray-300',
          // '[&_.ant-pagination-item-active]:border-blue-500',
          // '[&_.ant-pagination-item-active]:bg-blue-50',
          className
        )}
        pagination={false}
        bordered
        {...props}
      />
      <Pagination
        current={meta?.page}
        pageSize={meta?.pageSize}
        total={meta?.total}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Tổng số ${total} bản ghi`}
        className="!mt-5 !flex !justify-end"
        onChange={(page, pageSize) => handleChangePagination(page, pageSize)}
        locale={{
          items_per_page: '/ trang',
          jump_to: 'Đến',
          page: 'Trang',
        }}
      />
    </div>
  )
}

export default ITable
