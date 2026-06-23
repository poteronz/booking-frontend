/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-fg': '#a5b4fc',
        'primary-dark': '#4f46e5',
        surface: '#0a0812',
        'surface-2': '#1a1726',
        'surface-3': '#232030',
        border: '#2d2b40',
        muted: '#6b7280',
        destructive: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
        accent: '#8b5cf6',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
