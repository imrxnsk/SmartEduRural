/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          pink: '#ec4899',
          purple: '#8b5cf6',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          lime: '#84cc16',
          orange: '#f97316'
        },
        status: {
          success: '#22c55e',
          info: '#0ea5e9',
          warning: '#f59e0b',
          danger: '#ef4444'
        },
        brand: {
          start: '#10b981',
          mid: '#22c55e',
          end: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(16,185,129,0)' }
        }
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
