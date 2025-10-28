import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import EnhancedErrorBoundary from './components/EnhancedErrorBoundary'
import EnhancedLoadingScreen from './components/EnhancedLoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { AppProvider, useApp } from './utils/appContext.jsx'
import EnhancedNotificationToast from './components/EnhancedNotificationToast'

// Pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Teams from './pages/Teams'
import TeamDetail from './pages/TeamDetail'
import Players from './pages/Players'
import PlayerDetail from './pages/PlayerDetail'
import Matches from './pages/Matches'
import MatchDetail from './pages/MatchDetail'
import PointsTable from './pages/PointsTable'
import Analytics from './pages/Analytics'
import Squads from './pages/Squads'
import Evaluations from './pages/Evaluations'
import EvaluationDetail from './pages/EvaluationDetail'
import Videos from './pages/Videos'
import AuditLogs from './pages/AuditLogs'
import AdminDashboard from './pages/AdminDashboard'
import AdminTeams from './pages/admin/AdminTeams'
import AdminPlayers from './pages/admin/AdminPlayers'
import AdminMatches from './pages/admin/AdminMatches'
import AdminTeamForm from './pages/admin/AdminTeamForm'
import AdminPlayerForm from './pages/admin/AdminPlayerForm'
import AdminMatchForm from './pages/admin/AdminMatchForm'
import AdminEvaluationForm from './pages/admin/AdminEvaluationForm'
import AdminSettings from './pages/admin/AdminSettings'
import AdminLogin from './pages/AdminLogin'
import MainLayout from './components/Layout/MainLayout'
import NotFound from './pages/NotFound'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  
  if (loading) return <EnhancedLoadingScreen message="Authenticating..." />
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (adminOnly && user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function AppContent() {
  const { notifications, removeNotification } = useApp()
  
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Suspense fallback={<EnhancedLoadingScreen message="Loading page..." />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/teams" element={<Teams />} />
              <Route path="/teams/:id" element={<TeamDetail />} />
              <Route path="/players" element={<Players />} />
              <Route path="/players/:id" element={<PlayerDetail />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/matches/:id" element={<MatchDetail />} />
              <Route path="/points-table" element={<PointsTable />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/squads" element={<Squads />} />
              <Route path="/evaluations" element={<Evaluations />} />
              <Route path="/evaluations/:id" element={<EvaluationDetail />} />
              <Route path="/audit-logs" element={
                <ProtectedRoute adminOnly>
                  <AuditLogs />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminDashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/teams" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminTeams />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/players" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminPlayers />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/matches" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminMatches />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/teams/add" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminTeamForm />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/players/add" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminPlayerForm />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/matches/add" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminMatchForm />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/evaluations/add" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminEvaluationForm />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute adminOnly>
                  <MainLayout>
                    <AdminSettings />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e40af',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #3b82f6'
            }
          }}
        />
      </div>
      <EnhancedNotificationToast 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </>
  )
}

export default function App() {
  return (
    <EnhancedErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </EnhancedErrorBoundary>
  )
}