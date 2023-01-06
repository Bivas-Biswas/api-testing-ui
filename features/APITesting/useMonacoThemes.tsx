import { useEffect } from 'react'

export const Themes = [
  { label: 'VS Dark', id: 'vs-dark' },
  { label: 'Amy', id: 'amy' },
  { label: 'Blackboard', id: 'blackboard' },
  { label: 'Brilliance Dull', id: 'brilliance-dull' },
  { label: 'Clouds Midnight', id: 'clouds-midnight' },
  { label: 'Monokai', id: 'monokai' },
  { label: 'Oceanic Next', id: 'oceanic-next' },
  { label: 'Tomorrow-Night', id: 'tomorrow-night' }
]

const useMonacoThemes = (monaco: any) => {
  useEffect(() => {
    if (!monaco) return
    const loadThemes = async () => {
      for (const theme of Themes) {
        try {
          const tmTheme = await import(
            `monaco-themes/themes/${theme.label}.json`
          )
          monaco.editor.defineTheme(theme.id, tmTheme)
        } catch (e) {}
      }
    }

    loadThemes()
  }, [monaco])
}

export default useMonacoThemes
