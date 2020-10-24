const plugin = require('tailwindcss/plugin');
module.exports = {
  plugins: [
    //--------------------------------------------------------------------------
    // Tailwind custom Peak plugins
    //--------------------------------------------------------------------------
    //
    // Here we define base styles used by Peak. You may overwrite those to
    // reflect your sites brand or add more.
    //
    plugin(function({ addBase, theme }) {
      addBase({
        ':root': {
          // Fluid typography from 1 rem to 1.15 rem with fallback to 16px. 
          fontSize: '16px',
          'font-size': 'clamp(1rem, 1.6vw, 1.2rem)',
          // Safari resize fix. 
          minHeight: '0vw',
        },
        // Used to hide alpine elements before being rendered.
        '[x-cloak]': { 
          display: 'none !important'
        },
        // Default color transition on links.
        'a': {
          transition: 'color .2s ease-in-out',
        },
        'html': {
          fontDisplay: 'swap',
          color: theme('colors.neutral.800'),
          //--------------------------------------------------------------------------
          // Set sans, serif or mono stack with optional custom font as default.
          //--------------------------------------------------------------------------
          // fontFamily: theme('fontFamily.mono').join(', '),
          fontFamily: theme('fontFamily.sans').join(', '),
          // fontFamily: theme('fontFamily.serif').join(', '),
        },
        '::selection': {
          backgroundColor: theme('colors.primary.600'),
          color: theme('colors.white'),
        },
        '::-moz-selection': {
          backgroundColor: theme('colors.primary.600'),
          color: theme('colors.white'),
        },
        //--------------------------------------------------------------------------
        // Display screen breakpoints in debug environment.
        //--------------------------------------------------------------------------
        'body.debug::before': {
          display: 'block',
          position: 'fixed',
          zIndex: '99',
          top: theme('spacing.1'),
          right: theme('spacing.1'),
          padding: theme('spacing.1'),
          border: '1px',
          borderStyle: 'solid',
          borderColor: theme('colors.notice.300'),
          borderRadius: theme('borderRadius.full'),
          backgroundColor: theme('colors.notice.200'),
          fontSize: '.5rem',
          color: theme('colors.notice.900'),
          textTransform: 'uppercase',
          fontWeight: theme('fontWeight.bold'),
          content: '"-"',
          pointerEvents: 'none',
        },
      })
    }),

    plugin(function({ addBase, theme}) {
      const breakpoints = _.map(theme('screens'), (value, key) => {
        return {
          [`@media (min-width: ${value})`]: {
            'body.debug::before': {
              content: `"${key}"`,
            }
          }
        }
      })
      addBase(breakpoints)
    }),

    //--------------------------------------------------------------------------
    // Tailwind custom components
    //--------------------------------------------------------------------------
    //
    // Here we define custom components used by Peak.
    //
    plugin(function({ addComponents, theme }) {
      const components = {
        // The main wrapper for all sections on our website. Has a max width and is centered. 
        '.fluid-container': {
          width: '100%',
          maxWidth: theme('screens.2xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          // Use safe-area-inset together with default padding for Apple devices with a notch.
          paddingLeft: 'calc(env(safe-area-inset-left, 0rem) + ' + theme('padding.8') + ')',
          paddingRight: 'calc(env(safe-area-inset-right, 0rem) + ' + theme('padding.8') + ')',
        },
        // Disable scroll e.g. when a modal is open. Should be used on the <body>
        '.no-scroll': {
          height: '100%',
          overflow: 'hidden',
        },
        // The outer grid where all our blocks are a child of. Spreads out all blocks vertically
        // with a uniform space between them.
        '.outer-grid': {
          width: '100%',
          display: 'grid',
          rowGap: theme('spacing.12'),
          paddingTop: theme('spacing.12'),
          paddingBottom: theme('spacing.12'),
          // If the last child of the outer grid is full width (e.g. when it has a full width 
          // colored background), give it negative margin bottom to get it flush to your 
          // sites footer.
          '& > *:last-child:has(.w-full)': {
            marginBottom: theme('spacing.12') * -1,
          },
        },
        [`@media (min-width: ${theme('screens.md')})`]: {
          // Larger vertical spacing between blocks on larger screens.
          '.outer-grid': {
            rowGap: theme('spacing.16'),
            paddingTop: theme('spacing.16'),
            paddingBottom: theme('spacing.16'),
            '& > *:last-child:has(.w-full)': {
              marginBottom: theme('spacing.16') * -1,
            },
          },
        },
        [`@media (min-width: ${theme('screens.lg')})`]: {
          // Larger horizontal padding on larger screens.
          '.fluid-container': {
            // Use safe-area-inset together with default padding for Apple devices with a notch.
            paddingLeft: 'calc(env(safe-area-inset-left, 0rem) + ' + theme('padding.12') + ')',
            paddingRight: 'calc(env(safe-area-inset-right, 0rem) + ' + theme('padding.12') + ')',
          },
          // Larger vertical spacing between blocks on larger screens.
          '.outer-grid': {
            rowGap: theme('spacing.24'),
            paddingTop: theme('spacing.24'),
            paddingBottom: theme('spacing.24'),
            '& > *:last-child:has(.w-full)': {
              marginBottom: theme('spacing.24') * -1,
            },
          },
        },
      }
      addComponents(components)
    }),

    //--------------------------------------------------------------------------
    // Tailwind custom utilities
    //--------------------------------------------------------------------------
    //
    // Here we define custom utilities not provided by Tailwind.
    //
    plugin(function({ addUtilities, theme, variants }) {
      const newUtilities = {
        // Break words only when needed.
        '.break-decent': {
          wordBreak: 'break-word',
        },
        // Sizing utilities for sets in our bard (long form content).
        // On small devices they're full width.
        '.size-sm, .size-md, .size-lg, .size-xl': {
          gridColumn: 'span 12 / span 12',
        },
        [`@media (min-width: ${theme('screens.md')})`]: {
          // Sizing utilities for sets in our bard (long form content).
          // On larger devices they go from small to extra large.
          // (E.g. an image wider then text in an article.)
          '.size-sm': {
            gridColumn: 'span 4 / span 4',
            gridColumnStart: '3',
          },
          '.size-md': {
            gridColumn: 'span 8 / span 8',
            gridColumnStart: '3',
          },
          '.size-lg': {
            gridColumn: 'span 8 / span 8',
            gridColumnStart: '3',
          }, 
          '.size-xl': {
            gridColumn: 'span 10 / span 10',
            gridColumnStart: '2',
          },
        },
        [`@media (min-width: ${theme('screens.lg')})`]: {
          // Sizing utilities for sets in our bard (long form content).
          // On larger devices they go from small to extra large.
          '.size-sm': {
            gridColumn: 'span 4 / span 4',
            gridColumnStart: '4',
          },
          '.size-md': {
            gridColumn: 'span 6 / span 6',
            gridColumnStart: '4',
          },
          '.size-lg': {
            gridColumn: 'span 8 / span 8',
            gridColumnStart: '3',
          }, 
          '.size-xl': {
            gridColumn: 'span 10 / span 10',
            gridColumnStart: '2',
          },
        },
      }
      addUtilities(newUtilities)
    }),
  ]
}
