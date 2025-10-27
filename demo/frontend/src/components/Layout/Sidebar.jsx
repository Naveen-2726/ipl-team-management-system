import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Users, 
  Trophy, 
  Calendar, 
  BarChart3, 
  Settings,
  Shield,
  Plus,
  FileText,
  UserCheck,
  ClipboardList
} from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { user } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Teams', href: '/teams', icon: Trophy },
    { name: 'Players', href: '/players', icon: Users },
    { name: 'Squads', href: '/squads', icon: UserCheck },
    { name: 'Matches', href: '/matches', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Evaluations', href: '/evaluations', icon: ClipboardList },
  ]

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin', icon: Shield },
    { name: 'Add Player', href: '/admin/players/add', icon: Plus },
    { name: 'Add Team', href: '/admin/teams/add', icon: Plus },
    { name: 'Schedule Match', href: '/admin/matches/add', icon: Plus },
    { name: 'Audit Logs', href: '/audit-logs', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-large transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logos/ipl logo.png" alt="IPL" className="w-10 h-10 rounded-xl" />
              <span className="text-xl font-bold text-gray-900">IPL</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-primary-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              ))}
            </div>

            {user?.role === 'ADMIN' && (
              <div className="pt-6 mt-6 border-t border-gray-200">
                <div className="px-4 mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Administration
                  </h3>
                </div>
                <div className="space-y-1">
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                        ${isActive(item.href)
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-primary-600' : 'text-gray-400'}`} />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {user && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-700">
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar