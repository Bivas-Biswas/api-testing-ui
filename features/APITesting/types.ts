import React from 'react'

export type SelectTabType = 'body' | 'headers'
export type ApiCallConfigType = {
  url: string
  method: string
  headers: string
  data: string
}

export type APITestingContextProps = {
  selectTab: SelectTabType
  apiCallConfig: ApiCallConfigType
  setApiCallConfig: React.Dispatch<React.SetStateAction<ApiCallConfigType>>
}
