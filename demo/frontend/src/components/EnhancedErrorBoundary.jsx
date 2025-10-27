import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

class EnhancedErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <motion.div
            className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Error Icon */}
            <motion.div
              className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </motion.div>

            {/* Error Message */}
            <motion.h1
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Oops! Something went wrong
            </motion.h1>

            <motion.p
              className="text-gray-600 mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We're sorry for the inconvenience. The IPL management system encountered an unexpected error.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </button>
            </motion.div>

            {/* Error Details (Development Mode) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                className="mt-8 text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <summary className="cursor-pointer text-gray-700 font-semibold mb-4 flex items-center">
                  <Bug className="w-4 h-4 mr-2" />
                  Error Details (Development)
                </summary>
                <div className="bg-gray-100 rounded-xl p-4 text-sm font-mono text-gray-800 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="whitespace-pre-wrap text-xs mt-1">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </motion.details>
            )}
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default EnhancedErrorBoundary