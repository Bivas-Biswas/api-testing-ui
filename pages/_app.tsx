import HeadManager from 'components/HeadManager'
import Layout from 'components/Layout'
import { AppProps } from 'interfaces'
import React from 'react'

import withTwindApp from '@twind/next/shim/app'
import twindConfig from 'config/twind.config'

// import 'styles/index.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <HeadManager />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default withTwindApp(twindConfig, App)
