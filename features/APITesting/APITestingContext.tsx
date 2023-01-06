import React from 'react'

import { APITestingContextProps } from './types'

const APITestingContext = React.createContext<APITestingContextProps | null>(
  null
)

const useAPITesting = () => {
  const apiTesting = React.useContext(APITestingContext)

  if (apiTesting === null) {
    throw new Error(
      `[api-testing-preview]: "useAPITesting" must be wrapped by a "APITestingContext.Provider"`
    )
  }

  return { ...apiTesting }
}

export { APITestingContext, useAPITesting }
