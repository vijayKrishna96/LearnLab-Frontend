import React from 'react'
import Sidebar from '../../components/Admin/Sidebar'

const AdminDashboard = () => {
    return (
        <div className="flex">
        <Sidebar/>
        <div className="flex-1 p-10 text-gray-800">
          <div className="text-3xl font-bold">Dashboard</div>
          {/* Add your content here */}
        </div>
      </div>
    )  
}

export default AdminDashboard