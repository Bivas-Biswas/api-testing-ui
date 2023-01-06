import { HTMLDivProps } from 'interfaces'
import React from 'react'
import { tw } from 'twind'

export type LayoutProps = {
  children?: React.ReactNode | React.ReactNode[]
} & HTMLDivProps

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <div className={tw('font-sans bg-gray-900 text-white')} {...props}>
      <div
        className={tw(
          'flex-1 flex flex-col max-w-7xl w-full mx-auto scrollbar'
        )}>
        {children}
      </div>
    </div>
  )
}

export default Layout
