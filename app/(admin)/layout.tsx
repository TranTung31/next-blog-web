import LayoutAdmin from '@/components/layout/layout-admin'
import React from 'react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen">
      <LayoutAdmin>{children}</LayoutAdmin>
    </div>
  )
}

export default AdminLayout
