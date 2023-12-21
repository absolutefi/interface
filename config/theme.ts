import { defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react'

export const defaultThemeObject = {
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
  colors: {
    primary: '#BC87FF',
  },
  breakPoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
  },
  styles: {
    global: () => ({
      body: {
        fontFamily: "'DM Sans', sans-serif",
        bg: '#1B1B1B',
        color: '#FFF',
        h: '100dvh',
      },
    }),
  },
  components: {
    Button: defineStyleConfig({
      defaultProps: {
        variant: 'default',
        size: 'md',
      },
      baseStyle: {
        borderRadius: '0',
      },
      variants: {
        default: defineStyle({
          bg: '#292929',
          color: '#FFF',
        }),
        primary: defineStyle({
          bg: 'primary',
          color: '#1B1B1B',
          _hover: {
            bg: '#D4B3FF',
          },
        }),
        ghost: defineStyle({
          color: '#FFF',
          _hover: {
            bg: 'transparent',
          },
          _active: {
            bg: 'transparent',
          },
        }),
      },
      sizes: {
        md: defineStyle({
          fontSize: '12px',
          fontWeight: '500',
        }),
      },
    }),
    Link: defineStyleConfig({
      baseStyle: {
        textDecoration: 'none',
        _hover: {
          textDecoration: 'none',
        },
      },
    }),
    Drawer: defineStyleConfig({
      baseStyle: {
        dialog: {
          bg: '#191919',
        },
      },
    }),
    Modal: defineStyleConfig({
      baseStyle: {
        dialog: {
          bg: '#191919',
        },
      },
    }),
  },
}

export const defaultTheme = extendTheme(defaultThemeObject)
