'use client'

import { Modal as AntModal, ModalProps } from 'antd'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IModalProps extends ModalProps {
  title: string
  open: boolean
  hideOkButton?: boolean
  hideCancelButton?: boolean
  hideFooter?: boolean
  className?: string
  okText?: string
  cancelText?: string
  onOk?: () => void
  onCancel: () => void
}

const IModal = ({
  className,
  onOk,
  onCancel,
  title,
  open,
  hideOkButton = false,
  hideCancelButton = false,
  hideFooter = false,
  okText = 'Lưu',
  cancelText = 'Đóng',
  ...props
}: IModalProps) => {
  return (
    <AntModal
      className={twMerge('custom-modal', className)}
      title={title}
      open={open}
      okButtonProps={{
        style: { display: hideOkButton ? 'none' : 'inline-flex' },
      }}
      cancelButtonProps={{
        style: { display: hideCancelButton ? 'none' : 'inline-flex' },
      }}
      footer={hideFooter ? null : undefined}
      okText={okText}
      cancelText={cancelText}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
    />
  )
}

export default IModal
