'use client'

import { Form, Input, InputProps } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IInputFormProps extends InputProps {
  name: string
  label: string
  required?: boolean
  className?: string
  inputClassName?: string
}

const IInputForm = ({
  name,
  className,
  inputClassName,
  label,
  required = false,
  ...props
}: IInputFormProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      className={className}
    >
      <Input className={twMerge('w-full', inputClassName)} {...props} />
    </Form.Item>
  )
}

export default IInputForm

interface ITextAreaFormProps extends TextAreaProps {
  name: string
  label: string
  required?: boolean
  className?: string
  inputClassName?: string
}

// eslint-disable-next-line react/display-name
IInputForm.TextArea = ({
  name,
  className,
  inputClassName,
  label,
  required = false,
  ...props
}: ITextAreaFormProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      className={className}
    >
      <Input.TextArea className={inputClassName} {...props} />
    </Form.Item>
  )
}
