import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, Users, Trophy, Calendar, BarChart3, Settings,
  Plus, Edit, Trash2, Eye, TrendingUp, AlertCircle,
  CheckCircle, Clock, Database, Activity, UserCheck
} from 'lucide-react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      label: 'Total Teams',
      value: '10',
      icon: Trophy,
      color: 'from-blue-500 to-blue-600',
      change: '+0%',
      trend: 'stable'
    },
    {
      label: 'Total Players',
      value: '250',
      icon: Users,
      color: 'from-green-500 to-green-600',
      change: '+15%',
      trend: 'up'
    },
    {
      label: 'Active Matches',
      value: '8',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      change: '+25%',
      trend: 'up'
    },
    {
      label: 'System Health',
      value: '99.9%',
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
      change: '+0.1%',
      trend: 'up'
    }
  ]

  const quickActions = [
    {
      title: 'Add New Team',
      description: 'Create a new IPL franchise',
      icon: Trophy,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/teams/add'
    },
    {
      title: 'Add Player',
      description: 'Register a new player',
      icon: Users,
      color: 'from-green-500 to-green-600',
      link: '/admin/players/add'
    },
    {
      title: 'Schedule Match',
      description: 'Create new match fixture',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/matches/add'
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: Settings,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/settings'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'New player added',
      details: 'Virat Kohli registered to RCB',
      user: 'Admin',
      time: '2 minutes ago',
      type: 'create',
      icon: Users
    },
    {
      id: 2,
      action: 'Match scheduled',
      details: 'CSK vs MI - Tomorrow 7:30 PM',
      user: 'Admin',
      time: '15 minutes ago',
      type: 'create',
      icon: Calendar
    },
    {
      id: 3,
      action: 'Team updated',
      details: 'Mumbai Indians roster modified',
      user: 'Admin',
      time: '1 hour ago',
      type: 'update',
      icon: Trophy
    },
    {
      id: 4,
      action: 'Player transferred',
      details: 'Player moved from DC to PBKS',
      user: 'Admin',
      time: '2 hours ago',
      type: 'update',
      icon: Users
    }
  ]

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Database Backup',
      message: 'Scheduled backup will run tonight at 2 AM',
      time: '1 hour ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'System Update',
      message: 'New features will be deployed this weekend',
      time: '3 hours ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Performance Report',
      message: 'System performance is optimal',
      time: '6 hours ago'
    }
  ]

  const managementSections = [
    {
      title: 'Team Management',
      description: 'Manage all IPL franchises',
      icon: Trophy,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/teams',
      count: '10 Teams'
    },
    {
      title: 'Player Management',
      description: 'Manage player database',
      icon: Users,
      color: 'from-green-500 to-green-600',
      link: '/admin/players',
      count: '250 Players'
    },
    {
      title: 'Match Management',
      description: 'Schedule and manage matches',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/matches',
      count: '74 Matches'
    },
    {
      title: 'Analytics & Reports',
      description: 'View detailed analytics',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/analytics',
      count: 'Live Data'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-8 h-8 text-yellow-400" />
                  <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                </div>
                <p className="text-xl text-blue-100">
                  Complete system administration and management
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <Database className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={action.title}
                    to={action.link}
                    className="group"
                  >
                    <motion.div
                      className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Management Sections */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Management Sections</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {managementSections.map((section, index) => (
                  <Link
                    key={section.title}
                    to={section.link}
                    className="group"
                  >
                    <motion.div
                      className="p-6 rounded-xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {section.count}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* System Alerts */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                System Alerts
              </h3>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-yellow-500' :
                        alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-500" />
                Recent Activities
              </h3>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/admin/activities"
                className="block mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All Activities →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard