import axios, { AxiosRequestConfig, Method } from 'axios'
import { Button, Input } from 'components'
import React, { useEffect, useState } from 'react'
import { tw } from 'twind'

import SelectInput from '../../components/SelectInput'

import InputSection from './component/InputEditor'
import { APITestingContext } from './APITestingContext'
import { Request_options, Tabs } from './data'
import {
  ApiCallConfigType,
  APITestingContextProps,
  SelectTabType
} from './types'

const APITesting = () => {
  const [apiCallConfig, setApiCallConfig] = useState<ApiCallConfigType>({
    url: '',
    method: 'get',
    headers: `{
  "Content-Type": "application/json",
  "Accept": "*/*",
  "Access-Control-Allow-Origin": "*"
}`,
    data: `{
    
    
}`
  })

  const [selectTab, setSelectTab] = useState<SelectTabType>('headers')
  const [code, setCode] = useState('')
  const [response, setResponse] = useState<{
    data: any
    status: any
    error: any
  }>({
    data: {},
    status: '',
    error: ''
  })

  useEffect(() => {
    const _getInputSectionValue = (selectTab: SelectTabType) => {
      switch (selectTab) {
        case 'body':
          return apiCallConfig.data
        case 'headers':
          return apiCallConfig.headers
        default:
          return ''
      }
    }
    setCode(_getInputSectionValue(selectTab))
  }, [apiCallConfig.data, apiCallConfig.headers, selectTab])

  const handleTabOnClick = (tab: string) => {
    const newTab = tab as SelectTabType
    setSelectTab(newTab)
  }

  const handleSend = async () => {
    const config = apiCallConfig
    const headers = JSON.parse(config.headers)
    const data = JSON.parse(config.data)
    const method = config.method as Method

    let newConfig: AxiosRequestConfig = {
      headers,
      url: config.url,
      method
    }

    if (config.method !== 'get') {
      newConfig = {
        ...newConfig,
        data
      }
    }

    try {
      const response = await axios({
        ...newConfig,
        withCredentials: false,
        proxy: false
      })
      const { data, status } = response
      setResponse((prev) => ({ ...prev, data, status }))
    } catch (e) {
      console.log(e)
    }
  }

  const _getValue = (): APITestingContextProps => {
    return {
      selectTab,
      apiCallConfig,
      setApiCallConfig
    }
  }

  const handleOnChangeUrl = (value: string) => {
    setApiCallConfig((prev) => ({ ...prev, url: value }))
  }

  const _getInputURL = () => {
    return apiCallConfig.url
  }

  const handleEditorInput = (value: string) => {
    switch (selectTab) {
      case 'body':
        setApiCallConfig((prev) => ({ ...prev, data: value }))
        break
      case 'headers':
        setApiCallConfig((prev) => ({ ...prev, headers: value }))
        break
      default:
    }
    setCode(value)
  }

  return (
    <div className="w-full max-w-lg mx-auto py-4 h-[100vh]">
      <APITestingContext.Provider value={_getValue()}>
        <div className="w-full p-3 flex flex-col gap-2 h-full bg-[#202327]">
          {/* send section */}
          <div className="flex flex-col h-[40%]">
            <div className="flex flex-row h-max gap-3 w-full">
              <div className="flex flex-row w-full">
                <div className="w-40">
                  <SelectInput
                    className="rounded-none"
                    label={'Request'}
                    hideLabel
                    text={Request_options[apiCallConfig.method].label}
                    selected={[apiCallConfig.method]}
                    options={Object.keys(Request_options).map(
                      (key) => Request_options[key]
                    )}
                    onChangeValue={([selected]) => {
                      setApiCallConfig((prev) => ({
                        ...prev,
                        method: selected
                      }))
                    }}
                  />
                </div>
                <div className="w-full">
                  <Input
                    label={'URL'}
                    id={'url'}
                    onChangeValue={handleOnChangeUrl}
                    value={_getInputURL()}
                    placeholder={'Enter request URL'}
                    hideLabel
                    className="rounded-none h-full pr-3"
                  />
                </div>
              </div>
              <div className="h-max w-28">
                <Button
                  onClick={handleSend}
                  variant={'primary'}
                  rounded={'none'}
                  className={'p-0 h-full w-full justify-center rounded-sm'}>
                  Send
                </Button>
              </div>
            </div>

            {/* body section */}
            <div className="flex h-full flex-col gap-2">
              <div className="flex flex-row">
                {Object.keys(Tabs).map((key) => {
                  const tab = Tabs[key]
                  return (
                    <div
                      key={tab.id}
                      className={tw(
                        'px-2.5 cursor-pointer transition-all ease-in-out duration-300',
                        selectTab === tab.id ? '' : ''
                      )}
                      onClick={() => handleTabOnClick(tab.id)}>
                      <p
                        className={tw(
                          selectTab === tab.id
                            ? 'border-b-2 border-primary'
                            : 'py-1'
                        )}>
                        {tab.label}
                      </p>
                    </div>
                  )
                })}
              </div>
              <InputSection
                value={code}
                onChange={(_value) => handleEditorInput(_value)}
              />
            </div>
          </div>

          {/* response */}
          <div className="h-[60%] flex flex-col gap-2">
            <div className="flex flex-row">
              <p>Response</p>
            </div>
            <div className="w-full h-full">
              <InputSection
                className={'max-h-full'}
                value={JSON.stringify(response.data, null, '\t')}
                onChange={(_value) => {}}
              />
            </div>
          </div>
        </div>
      </APITestingContext.Provider>
    </div>
  )
}

export default APITesting
