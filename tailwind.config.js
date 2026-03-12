/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070711',
        panel: 'rgba(18,18,30,0.75)',
        panelHover: 'rgba(20,20,35,0.7)',
        border: '#1e293b',
        borderBright: '#1c1c30',
        accent: {
          purple: '#7c3aed',
          purpleLight: '#8b5cf6',
          blue: '#06b6d4',
          blueLight: '#22d3ee',
        },
        alert: {
          red: '#ef4444',
          green: '#22c55e',
          warning: '#f59e0b',
        },
        text: {
          main: '#e2e8f0',
          muted: '#94a3b8',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-purple': '0 0 15px rgba(124,58,237,0.3)',
        'glow-blue': '0 0 15px rgba(6,182,212,0.3)',
        'glow-red': '0 0 15px rgba(239,68,68,0.5)',
        'glow-green': '0 0 15px rgba(34,197,94,0.3)',
        'panel': '0 4px 30px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'grid-scroll': 'gridScroll 20s linear infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        gridScroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        }
      },
    },
  },
  plugins: [],
}
