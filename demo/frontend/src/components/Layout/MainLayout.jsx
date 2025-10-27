import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout