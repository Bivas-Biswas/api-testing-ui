import React from 'react'

import BodySection from './Tabs/BodySection'
import HeaderSection from './Tabs/HeaderSection'

export const Request_options: { [key: string]: { id: string; label: string } } =
  {
    get: { id: 'get', label: 'GET' },
    post: { id: 'post', label: 'POST' },
    put: { id: 'put', label: 'PUT' },
    delete: { id: 'delete', label: 'DELETE' }
  }

export const Tabs: {
  [key: string]: {
    id: string
    label: string
    component(): React.ReactElement
  }
} = {
  header: { id: 'headers', label: 'Headers', component: HeaderSection },
  body: { id: 'body', label: 'Body', component: BodySection }
}

export const BodyRawDataType = [{ id: 'json', label: 'JSON' }]

export const BodyData = [{ id: 'raw', label: 'raw' }]
