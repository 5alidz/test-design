const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './pages/**/*.tsx',
    './pages/**/*.js',
    './components/**/*.tsx',
    './components/**/*.ts',
    './components/**/*.js',
    './design/**/*.ts',
    './design/**/*.tsx',
    './design/**/*.js',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      borderColor: {
        default: 'var(--border-color)',
        focus: 'var(--focus-border-default)',
      },
      fontSize: {
        h1: 'var(--text-h1)',
        h2: 'var(--text-h2)',
        h3: 'var(--text-h3)',
        h4: 'var(--text-h4)',
        h5: 'var(--text-h5)',
        h6: 'var(--text-h6)',
        body: 'var(--text-body)',
        small: 'var(--text-small)',
      },
      colors: {
        theme: {
          background: 'var(--color-background)',
          foreground: 'var(--color-foreground)',
          surface: 'var(--color-surface)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          success: 'var(--color-success)',
          error: 'var(--color-error)',
        },
      },
      borderRadius: {
        default: 'var(--border-radius-default)',
      },
      boxShadow: {
        rested: 'var(--shadow-rested)',
        elevated: 'var(--shadow-elevated)',
        focus: '0 0 0 3px var(--focus-shadow-default)',
      },
      fontFamily: {
        body: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        title: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        11: 'repeat(11, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'disabled'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
