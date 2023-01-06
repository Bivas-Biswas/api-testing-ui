import { Configuration } from 'twind'
import * as twindColors from 'twind/colors'
import typography from 'twind-typography'

import { aspectRatio } from '@twind/aspect-ratio'
import { withForms } from '@twind/forms'
import { lineClamp } from '@twind/line-clamp'

const twindConfig: Configuration = {
  preflight: withForms(),
  theme: {
    extend: {
      colors: {
        ...twindColors,
        leaderboard: {
          one: '#906F16',
          two: '#4A5059',
          three: '#58392E'
        },
        primary: {
          light: '#A3A3FF',
          DEFAULT: '#8080FF',
          dark: '#5050B1'
        },
        secondary: {
          light: '#9290A2',
          DEFAULT: '#6E6B80',
          dark: '#454356'
        },
        accent: {
          DEFAULT: '#FF5226'
        },
        elevation: {
          1: '#030305',
          2: '#0D0D10',
          3: '#16161A',
          4: '#202026',
          5: '#2B2B32',
          6: '#404048'
        },
        content: {
          DEFAULT: '#FFFFFF',
          medium: '#C7C7D1',
          dark: '#A7A7BE',
          muted: '#6E6B80'
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      boxShadow: {
        shift2xl: '24px 24px 1px 1px rgba(39.0, 39.0, 42.0, 1.0)',
        'outer-1': '0px 0px 24px rgba(0, 0, 0, 0.4)'
      },
      screens: {
        xs: '320px'
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%'
      }
    }
  },
  plugins: {
    ...typography({ className: 'prose' }),
    aspect: aspectRatio,
    'line-clamp': lineClamp
  }
}

export default twindConfig
