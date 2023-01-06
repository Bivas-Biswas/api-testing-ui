import type { NextPage } from 'next'
import type { AppProps as NextAppProps } from 'next/app'
import { ReactElement } from 'react'

export type AppPage = NextPage & {
  (): ReactElement
}

export type AppProps = NextAppProps & {
  Component: AppPage
}
