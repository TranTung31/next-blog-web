'use client'

import { Layout, theme } from 'antd'
import React, { useState } from 'react'
import SideBar from '../sidebar/sidebar'
import HeaderAdmin from '../header/header'

const { Content } = Layout

type LayoutAdminProps = {
  children: React.ReactNode
}

const LayoutAdmin: React.FC<LayoutAdminProps> = (props) => {
  const { children } = props

  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout className="!min-h-screen">
      <SideBar collapsed={collapsed} />
      <Layout>
        <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
