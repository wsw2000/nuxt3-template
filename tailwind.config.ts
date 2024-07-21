import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const green = {
  50: '#eafbf8',
  100: '#dffaf5',
  200: '#bcf4ea',
  400: '#28cbad',
  500: '#24c5a8',
  600: '#20af96',
  700: '#1ea48c',
  800: '#188370',
  900: '#126354',
  950: '#0e4d41',
}

export default {
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#f3f5f7',
          frame: '#ffffff',
        },
        primary: {
          DEFAULT: green[400],
          ...green,
        },
      },
      textColor: {
        elementary: '#2a2c2f',
        secondary: '#6b6b6c',
        tertiary: '#989999',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '9.5': '2.375rem',
      },
      zIndex: {
        1: '1',
      },
      boxShadow: {
        'b-0.5': '0 0.125rem 0 0 var(--tw-shadow-colored)',
        'b-1': '0 0.25rem 0 0 var(--tw-shadow-colored)',
      },
      animation: {
        shake: 'shake 0.2s ease-in-out 0s 2',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(0.5rem)' },
          '75%': { transform: 'translateX(-0.5rem)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    plugin(({ matchVariant }) => {
      matchVariant('nest', value => `& ${value.replace('_', ' ')}`, {
        values: {
          h2: 'h2',
          a: 'a',
        },
      })
    }),
    plugin(({ matchUtilities }) => {
      matchUtilities(
        {
          'flex-span': width => ({
            maxWidth: width,
            flex: `0 0 ${width}`,
          }),
        },
        {
          values: {
            '1/2': '50%',
            '1/3': '33.33333333333333%',
            '1/4': '25%',
          },
        }
      )
    }),
    plugin(({ addComponents }) => {
      const buttonCommonCSS = {
        '@apply inline-flex items-center justify-center': '',
        '@apply cursor-pointer select-none': '',
        '@apply rounded-full border-2 transition-all active:shadow-none': '',
      }

      addComponents({
        '.page-frame': {
          '@apply mx-auto max-w-[78.875rem]': '',
        },
        '.button-default': {
          ...buttonCommonCSS,
          '@apply bg-white border-gray-800 text-elementary': '',
          '@apply shadow-b-1 shadow-primary active:translate-y-1': '',
        },
        '.button-default-sm': {
          ...buttonCommonCSS,
          '@apply bg-white border-gray-800 text-elementary': '',
          '@apply shadow-b-0.5 shadow-primary active:translate-y-0.5': '',
        },
        '.button-primary': {
          ...buttonCommonCSS,
          '@apply bg-primary border-primary text-white': '',
          '@apply shadow-b-1 shadow-gray-800 active:translate-y-1': '',
        },
        '.button-primary-sm': {
          ...buttonCommonCSS,
          '@apply bg-primary border-primary text-white': '',
          '@apply shadow-b-0.5 shadow-gray-800 active:translate-y-0.5': '',
        },
        '.button-dark': {
          ...buttonCommonCSS,
          '@apply bg-gray-800 border-gray-800 text-white': '',
          '@apply shadow-b-1 shadow-primary active:translate-y-1': '',
        },
        '.button-dark-sm': {
          ...buttonCommonCSS,
          '@apply bg-gray-800 border-gray-800 text-white': '',
          '@apply shadow-b-0.5 shadow-primary active:translate-y-0.5': '',
        },
      })
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hidden': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    }),
  ],
} satisfies Partial<Config>
