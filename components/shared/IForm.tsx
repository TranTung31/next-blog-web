/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Form as AntForm, FormInstance, FormProps } from 'antd'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IFormProps extends FormProps {
  form: FormInstance<any> | undefined
  className?: string
  children?: React.ReactNode
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelCol?: { span: number }
  wrapperCol?: { span: number }
  onFinish?: (values: any) => void
  onFinishFailed?: (errorInfo: any) => void
}

const IForm = ({
  form,
  className,
  children,
  layout = 'vertical',
  labelCol,
  wrapperCol,
  onFinish,
  onFinishFailed,
  ...props
}: IFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (values: any) => {}

  return (
    <AntForm
      form={form}
      layout={layout}
      className={twMerge('custom-form', className)}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      autoComplete="off"
      {...props}
    >
      {children}
    </AntForm>
  )
}

export default IForm
