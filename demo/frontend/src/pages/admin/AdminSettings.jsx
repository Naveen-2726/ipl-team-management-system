import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Save, Database, Shield, Bell, Users, Globe, Palette } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminSettings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('adminSettings')
    return saved ? JSON.parse(saved) : {
      siteName: 'IPL Team Management System',
      siteDescription: 'The ultimate platform for managing IPL teams',
      adminEmail: 'admin@ipltms.com',
      maxTeams: 10,
      maxPlayersPerTeam: 25,
      seasonYear: 2024,
      enableNotifications: true,
      enablePublicRegistration: false,
      maintenanceMode: false,
      backupFrequency: 'daily',
      theme: 'light'
    }
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    }
    setSettings(newSettings)
    // Auto-save to localStorage
    localStorage.setItem('adminSettings', JSON.stringify(newSettings))
    toast.success(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} updated`)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage
      localStorage.setItem('adminSettings', JSON.stringify(settings))
      
      // Apply theme changes
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      toast.success('All settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings = {
        siteName: 'IPL Team Management System',
        siteDescription: 'The ultimate platform for managing IPL teams',
        adminEmail: 'admin@ipltms.com',
        maxTeams: 10,
        maxPlayersPerTeam: 25,
        seasonYear: 2024,
        enableNotifications: true,
        enablePublicRegistration: false,
        maintenanceMode: false,
        backupFrequency: 'daily',
        theme: 'light'
      }
      setSettings(defaultSettings)
      localStorage.setItem('adminSettings', JSON.stringify(defaultSettings))
      toast.success('Settings reset to default values')
    }
  }
  
  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ipl-settings-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Settings exported successfully')
  }
  
  const handleImportSettings = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result)
          setSettings(importedSettings)
          localStorage.setItem('adminSettings', JSON.stringify(importedSettings))
          toast.success('Settings imported successfully')
        } catch (error) {
          toast.error('Invalid settings file')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="w-8 h-8 text-gray-600" />
            <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          </div>
          <p className="text-gray-600">Configure system parameters and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* General Settings */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">General</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleChange('adminEmail', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Season
                </label>
                <input
                  type="number"
                  value={settings.seasonYear}
                  onChange={(e) => handleChange('seasonYear', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Team & Player Settings */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Teams & Players</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Teams
                </label>
                <input
                  type="number"
                  value={settings.maxTeams}
                  onChange={(e) => handleChange('maxTeams', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Players per Team
                </label>
                <input
                  type="number"
                  value={settings.maxPlayersPerTeam}
                  onChange={(e) => handleChange('maxPlayersPerTeam', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Enable Public Registration
                </label>
                <button
                  onClick={() => handleChange('enablePublicRegistration', !settings.enablePublicRegistration)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enablePublicRegistration ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enablePublicRegistration ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Maintenance Mode
                </label>
                <button
                  onClick={() => handleChange('maintenanceMode', !settings.maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* System Settings */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">System</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Frequency
                </label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => handleChange('backupFrequency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Enable Notifications
                </label>
                <button
                  onClick={() => handleChange('enableNotifications', !settings.enableNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enableNotifications ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enableNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save All Settings'}</span>
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleReset}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleExportSettings}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Export
                  </button>
                </div>
                
                <div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportSettings}
                    className="hidden"
                    id="import-settings"
                  />
                  <label
                    htmlFor="import-settings"
                    className="w-full block text-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer text-sm"
                  >
                    Import Settings
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">System Status</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">2.1GB</div>
              <div className="text-sm text-gray-600">Database Size</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">1,247</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">Active</div>
              <div className="text-sm text-gray-600">System Status</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminSettings