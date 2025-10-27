import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, Shield, User, Calendar, Filter, Search, 
  Eye, Download, RefreshCw, AlertCircle, CheckCircle,
  XCircle, Clock, Database, Settings, Trash2, Edit
} from 'lucide-react'
import apiService from '../services/apiService'

const AuditLogs = () => {
  const [logs, setLogs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState('all')
  const [filterUser, setFilterUser] = useState('all')
  const [dateRange, setDateRange] = useState('today')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const logsPerPage = 10

  useEffect(() => {
    fetchAuditLogs()
  }, [filterAction, filterUser, dateRange])

  const fetchAuditLogs = async () => {
    try {
      const data = await apiService.getAuditLogs()
      setLogs(data.content || [])
    } catch (error) {
      console.error('Error fetching audit logs:', error)
      // Fallback data
      setLogs([
        {
          id: 1,
          action: 'CREATE',
          entity: 'Player',
          entityId: 15,
          description: 'New player "Virat Kohli" added to RCB team',
          userId: 1,
          username: 'admin',
          userRole: 'ADMIN',
          timestamp: '2024-01-15T10:30:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'SUCCESS',
          details: { teamId: 3, playerName: 'Virat Kohli', role: 'Batsman' }
        },
        {
          id: 2,
          action: 'UPDATE',
          entity: 'Team',
          entityId: 1,
          description: 'Team "Chennai Super Kings" information updated',
          userId: 1,
          username: 'admin',
          userRole: 'ADMIN',
          timestamp: '2024-01-15T09:15:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'SUCCESS',
          details: { logoUrl: 'updated', teamName: 'Chennai Super Kings' }
        },
        {
          id: 3,
          action: 'DELETE',
          entity: 'Match',
          entityId: 8,
          description: 'Match between CSK vs MI deleted',
          userId: 1,
          username: 'admin',
          userRole: 'ADMIN',
          timestamp: '2024-01-15T08:45:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'SUCCESS',
          details: { team1: 'CSK', team2: 'MI', matchDate: '2024-01-20' }
        },
        {
          id: 4,
          action: 'LOGIN',
          entity: 'User',
          entityId: 2,
          description: 'User login attempt',
          userId: 2,
          username: 'user',
          userRole: 'USER',
          timestamp: '2024-01-15T08:00:00Z',
          ipAddress: '192.168.1.105',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'SUCCESS',
          details: { loginMethod: 'username_password' }
        },
        {
          id: 5,
          action: 'LOGIN',
          entity: 'User',
          entityId: null,
          description: 'Failed login attempt for username: wronguser',
          userId: null,
          username: 'wronguser',
          userRole: null,
          timestamp: '2024-01-15T07:30:00Z',
          ipAddress: '192.168.1.200',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          status: 'FAILED',
          details: { reason: 'Invalid credentials' }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // Export functionality
  const handleExport = () => {
    console.log('Audit Logs Export button clicked!')
    alert('Export function called!')
    
    try {
      // Filter logs based on current filters
      const filteredLogs = logs.filter(log => {
        const matchesSearch = searchTerm === '' || 
          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.entity.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesAction = filterAction === 'all' || log.action === filterAction
        const matchesUser = filterUser === 'all' || log.username === filterUser
        
        return matchesSearch && matchesAction && matchesUser
      })

      // Create CSV headers
      const headers = ['ID', 'Action', 'Entity', 'Description', 'User', 'Role', 'Timestamp', 'Status', 'IP Address']
      
      // Create CSV data
      const csvData = [
        headers,
        ...filteredLogs.map(log => [
          log.id,
          log.action,
          log.entity,
          log.description,
          log.username || 'Unknown',
          log.userRole || 'Unknown',
          new Date(log.timestamp).toLocaleString(),
          log.status,
          log.ipAddress || ''
        ])
      ]

      // Convert to CSV string
      const csvString = csvData.map(row => 
        row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
      ).join('\n')

      // Create and download file
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `IPL_Audit_Logs_${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      console.log(`Exported ${filteredLogs.length} audit log records`)
    } catch (error) {
      console.error('Export error:', error)
      alert('Export failed: ' + error.message)
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'CREATE': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'UPDATE': return <Edit className="w-4 h-4 text-blue-600" />
      case 'DELETE': return <Trash2 className="w-4 h-4 text-red-600" />
      case 'LOGIN': return <User className="w-4 h-4 text-purple-600" />
      case 'LOGOUT': return <User className="w-4 h-4 text-gray-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      case 'WARNING': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entity.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = filterAction === 'all' || log.action === filterAction
    const matchesUser = filterUser === 'all' || log.username === filterUser
    return matchesSearch && matchesAction && matchesUser
  })

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)
  const startIndex = (currentPage - 1) * logsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage)

  const uniqueUsers = [...new Set(logs.map(log => log.username))]
  const uniqueActions = [...new Set(logs.map(log => log.action))]

  const stats = {
    total: logs.length,
    success: logs.filter(log => log.status === 'SUCCESS').length,
    failed: logs.filter(log => log.status === 'FAILED').length,
    today: logs.filter(log => {
      const today = new Date().toDateString()
      return new Date(log.timestamp).toDateString() === today
    }).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading audit logs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-8 h-8 text-yellow-400" />
                  <h1 className="text-4xl font-bold">Audit Logs</h1>
                </div>
                <p className="text-xl text-blue-100">System activity monitoring and security audit trail</p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <Database className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-gray-600 font-medium">Total Logs</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.success}</div>
            <div className="text-gray-600 font-medium">Successful</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.failed}</div>
            <div className="text-gray-600 font-medium">Failed</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.today}</div>
            <div className="text-gray-600 font-medium">Today</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Actions</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
              
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Users</option>
                {uniqueUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={fetchAuditLogs}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button 
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Logs Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
          </div>
          
          {paginatedLogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Timestamp</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedLogs.map((log, index) => (
                    <motion.tr
                      key={log.id}
                      className="hover:bg-gray-50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getActionIcon(log.action)}
                          <span className="font-medium text-gray-900">{log.action}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900">{log.description}</p>
                          <p className="text-sm text-gray-500">{log.entity} ID: {log.entityId || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{log.username}</p>
                          <p className="text-sm text-gray-500">{log.userRole}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900">{formatTimestamp(log.timestamp)}</p>
                        <p className="text-sm text-gray-500">{log.ipAddress}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Logs Found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'No logs match your search criteria.' : 'No audit logs available.'}
              </p>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AuditLogs