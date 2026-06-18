/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
    },
    extend: {
      colors: {
        cinema: {
          gold: {
            50: '#FBF4E4',
            100: '#F5E7C3',
            200: '#EDD59A',
            300: '#E5C370',
            400: '#DCB053',
            500: '#D4A24C',
            600: '#C08C3E',
            700: '#A87232',
            800: '#8E5A27',
            900: '#6B421C',
          },
          charcoal: {
            50: '#F5F5F5',
            100: '#E0E0E0',
            200: '#B8B8B8',
            300: '#8A8A8A',
            400: '#5A5A5A',
            500: '#3A3A3A',
            600: '#2A2A2A',
            700: '#1E1E1E',
            800: '#161616',
            900: '#121212',
            950: '#0A0A0A',
          },
          curtain: '#8B2635',
          cream: '#F5F0E8',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'curtain-open': 'curtainOpen 0.8s ease-out forwards',
        'curtain-close': 'curtainClose 0.5s ease-in forwards',
        'draw-ring': 'drawRing 1.5s ease-out forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatMedium 4s ease-in-out infinite',
        'float-fast': 'floatFast 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        curtainOpen: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
        curtainClose: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        drawRing: {
          '0%': { strokeDashoffset: '377' },
          '100%': { strokeDashoffset: 'var(--ring-offset)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 162, 76, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 162, 76, 0.6)' },
        },
      },
      backgroundImage: {
        'film-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'gold-gradient': 'linear-gradient(135deg, #D4A24C 0%, #EDD59A 50%, #D4A24C 100%)',
        'hero-gradient': 'linear-gradient(180deg, transparent 0%, rgba(18,18,18,0.7) 50%, rgba(18,18,18,0.95) 100%)',
      },
      boxShadow: {
        'film': '0 4px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        'gold-glow': '0 0 30px rgba(212, 162, 76, 0.4)',
        'card-hover': '0 20px 50px rgba(0,0,0,0.8), 0 0 0 2px rgba(212, 162, 76, 0.5)',
      },
    },
  },
  plugins: [],
};
