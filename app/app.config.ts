export default defineAppConfig({
  ui: {
    colors: {
      primary: 'muniprim',
      secondary: 'munisec',
      warning: 'muniverde',
      info: 'muniblanco',
    },

    carousel: {
      slots: {
        dots: 'absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-3',
        dot: [
          'cursor-pointer size-3 bg-accented bg-white dark:bg-zinc-900 rounded-full border-1 border-primary-500',
          'transition'
        ]
      },
      variants: {
        active: {
          true: {
            dot: 'data-[state=active]:border-green-500 data-[state=active]:bg-white'
          }
        }
      }
    },
  }
});