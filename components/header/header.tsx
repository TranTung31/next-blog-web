/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'

type HeaderAdminProps = {
  collapsed: boolean
  setCollapsed: any
}

const HeaderAdmin: React.FC<HeaderAdminProps> = (props) => {
  const { collapsed, setCollapsed } = props
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="border-b"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
    </Header>
  )
}

export default HeaderAdmin
