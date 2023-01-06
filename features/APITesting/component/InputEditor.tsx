import dynamic from 'next/dynamic'
import React from 'react'
import { tw } from 'twind/style'

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false
})

const InputSection = ({
  value,
  onChange,
  className
}: {
  onChange: (_value: string) => void
  value: string
  className?: string
}) => {
  return (
    <div className={tw('w-full h-full overflow-hidden', className)}>
      <Editor
        width="100%"
        height="100%"
        language={'json'}
        theme={'vs-dark'}
        loading={'Editor Loading...'}
        value={value}
        onChange={(value) => {
          onChange(value || '')
        }}
        options={{
          formatOnPaste: true,
          formatOnType: true,
          cursorSmoothCaretAnimation: true,
          cursorStyle: 'line',
          quickSuggestions: false,
          wordWrap: 'on',
          fontSize: 13,
          minimap: { enabled: false }
        }}
      />
    </div>
  )
}

export default InputSection
