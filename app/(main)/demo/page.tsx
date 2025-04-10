/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ITable from '@/components/shared/ITable'
// import { Button } from '@/components/ui/button'
import { Button as AntButton, Col, Form, Row } from 'antd'
import { DefaultMeta } from '@/constants/constants'
import { MetaType } from '@/types/common'
import { TableProps } from 'antd'
import { useEffect, useState } from 'react'
import IModal from '@/components/shared/IModal'
import IForm from '@/components/shared/IForm'
import IInputForm from '@/components/shared/IInputForm'

interface DataType {
  userId: number
  id: number
  title: string
  body: string
}

const DemoPage = () => {
  const [form] = Form.useForm()

  //#region State
  const [meta, setMeta] = useState<MetaType>(DefaultMeta)
  const [dataTable, setDataTable] = useState<DataType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  //#endregion

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80,
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
      width: 100,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Nội dung',
      dataIndex: 'body',
      key: 'body',
      align: 'left',
    },
  ]

  const handleChangePagination = (page: number, pageSize: number) => {
    setMeta((prev) => ({ ...prev, page, pageSize }))
  }

  const handleSubmit = async (values: any) => {
    setIsLoadingSubmit(true)
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ ...values, userId: 1 }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const data = await res.json()
    setDataTable([data, ...dataTable])
    setIsLoadingSubmit(false)
    handleCancel()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${meta?.page}&_limit=${meta?.pageSize}`
      )
      const headers = res.headers
      const total = headers.get('x-total-count')
      const data = await res.json()
      setDataTable(data)
      setMeta((prev) => ({
        ...prev,
        total: Number(total),
      }))
      setIsLoading(false)
    }

    fetchData()
  }, [meta?.page, meta?.pageSize])

  return (
    <>
      <div className="m-5 p-5">
        <ITable
          columns={columns}
          dataSource={dataTable}
          meta={meta}
          title={() => (
            <div className="flex items-center justify-between">
              <h1>Demo Table</h1>
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
      </div>
      <IModal
        title="Thêm mới"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={800}
        confirmLoading={isLoadingSubmit}
      >
        <IForm form={form} onFinish={handleSubmit}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <IInputForm
                name="title"
                label="Tiêu đề"
                placeholder="Nhập tiêu đề"
                required
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <IInputForm.TextArea
                name="body"
                label="Nội dung"
                placeholder="Nhập nội dung"
                required
              />
            </Col>
          </Row>
        </IForm>
      </IModal>
    </>
  )
}

export default DemoPage
