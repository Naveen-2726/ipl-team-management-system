/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IPL Official Brand Colors
        ipl: {
          primary: '#1e3a8a',    // IPL Blue
          secondary: '#f97316',  // IPL Orange
          gold: '#fbbf24',       // IPL Gold
          purple: '#7c3aed',     // IPL Purple
          dark: '#0f172a',       // Dark Blue
          light: '#f8fafc',      // Light Gray
        },
        // Standard colors for components
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e3a8a',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Team Colors (Official IPL Teams)
        teams: {
          csk: {
            primary: '#fbbf24',   // Yellow
            secondary: '#1e40af', // Blue
            accent: '#f59e0b'
          },
          mi: {
            primary: '#1e40af',   // Blue
            secondary: '#fbbf24', // Gold
            accent: '#3b82f6'
          },
          rcb: {
            primary: '#dc2626',   // Red
            secondary: '#fbbf24', // Gold
            accent: '#ef4444'
          },
          kkr: {
            primary: '#7c2d12',   // Purple/Gold
            secondary: '#fbbf24', // Gold
            accent: '#a16207'
          },
          dc: {
            primary: '#1e40af',   // Blue
            secondary: '#ef4444', // Red
            accent: '#3b82f6'
          },
          pbks: {
            primary: '#dc2626',   // Red
            secondary: '#c0c0c0', // Silver
            accent: '#ef4444'
          },
          rr: {
            primary: '#ec4899',   // Pink
            secondary: '#1e40af', // Blue
            accent: '#f472b6'
          },
          srh: {
            primary: '#ea580c',   // Orange
            secondary: '#000000', // Black
            accent: '#fb923c'
          },
          gt: {
            primary: '#1e3a8a',   // Dark Blue
            secondary: '#fbbf24', // Gold
            accent: '#3b82f6'
          },
          lsg: {
            primary: '#0ea5e9',   // Light Blue
            secondary: '#dc2626', // Red
            accent: '#38bdf8'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'ipl-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #f97316 100%)',
        'hero-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23f97316\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'cricket-field': 'radial-gradient(ellipse at center, #16a34a 0%, #15803d 100%)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'ipl': '0 10px 40px rgba(30, 58, 138, 0.3)',
        'orange': '0 10px 40px rgba(249, 115, 22, 0.3)',
        'team': '0 8px 32px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}