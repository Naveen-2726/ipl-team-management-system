import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
  notifications: [],
  loading: false,
  error: null,
  filters: {
    teams: 'all',
    players: 'all',
    matches: 'all'
  },
  preferences: {
    theme: 'light',
    itemsPerPage: 10,
    language: 'en'
  }
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }]
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.type]: action.payload.value }
      }
    case 'SET_PREFERENCE':
      return {
        ...state,
        preferences: { ...state.preferences, [action.payload.key]: action.payload.value }
      }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const setLoading = (loading) => dispatch({ type: 'SET_LOADING', payload: loading })
  const setError = (error) => dispatch({ type: 'SET_ERROR', payload: error })
  
  const addNotification = (notification) => {
    const notificationWithId = { ...notification, id: Date.now() }
    dispatch({ type: 'ADD_NOTIFICATION', payload: notificationWithId })
    setTimeout(() => {
      removeNotification(notificationWithId.id)
    }, 5000)
    return notificationWithId.id
  }

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  const setFilter = (type, value) => dispatch({ type: 'SET_FILTER', payload: { type, value } })
  const setPreference = (key, value) => dispatch({ type: 'SET_PREFERENCE', payload: { key, value } })

  return (
    <AppContext.Provider value={{
      ...state,
      setLoading,
      setError,
      addNotification,
      removeNotification,
      setFilter,
      setPreference
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}