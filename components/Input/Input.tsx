import { HTMLInputProps } from 'interfaces/html'
import React from 'react'
import { style, tw } from 'twind/style'

import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

export const inputStyle = style({
  base: `block w-full pr-10 focus:outline-none text-gray-100 placeholder-gray-400 bg-gray-900 disabled:opacity-80`,
  variants: {
    state: {
      default: 'border-gray-900 focus:border-indigo-500 focus:ring-indigo-500',
      success: 'border-green-400 focus:border-green-500 focus:ring-green-500',
      error: 'border-red-400 focus:border-red-500 focus:ring-red-500'
    },
    textSize: {
      small: 'text-xs',
      regular: 'text-sm',
      large: 'text-base'
    },
    roundness: {
      default: 'rounded-md',
      none: 'rounded-none',
      full: 'rounded-full'
    }
  },
  defaults: {
    textSize: 'regular',
    roundness: 'default',
    state: 'default'
  }
})

export type InputStyleProps = Parameters<typeof inputStyle>[0]

export type InputCustomProps = {
  id: string
  label: string
  wrapperClassName?: string
  info?: string
  placeholder?: string
  hideLabel?: boolean
  message?: string
  messageState?: 'default' | 'error' | 'status'
  showStatusIcon?: boolean
  icon?: React.FC
  labelClassName?: string
  onChangeValue?: (_value: string) => void
}

export type InputProps = HTMLInputProps & InputStyleProps & InputCustomProps

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {
      id,
      label,
      info,
      icon,
      roundness = 'default',
      hideLabel,
      showStatusIcon = true,
      message,
      type = 'text',
      textSize = 'regular',
      state = 'default',
      wrapperClassName,
      className,
      labelClassName,
      onChangeValue,
      onChange,
      ...rest
    } = props

    const messageState = props.messageState || message

    return (
      <div className={wrapperClassName}>
        <div className="flex justify-between">
          <label
            htmlFor={id}
            className={tw(
              hideLabel
                ? 'sr-only'
                : 'block text-sm font-medium text-gray-100 mx-1 mb-1',
              labelClassName
            )}>
            {label}
          </label>

          {info && <span className="text-sm text-gray-400">{info}</span>}
        </div>

        <div className="relative rounded-md shadow-sm">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon({})}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            id={id}
            name={id}
            className={tw(
              inputStyle({ textSize, state, roundness }),
              className
            )}
            onChange={(e) => {
              if (onChange) onChange(e)
              if (onChangeValue) onChangeValue(e.target.value)
            }}
            {...rest}
          />

          {showStatusIcon && state !== 'default' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {state === 'error' ? (
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              ) : state === 'success' ? (
                <CheckCircleIcon
                  className="h-5 w-5 text-green-500"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          )}
        </div>

        {message && (
          <p
            className={`mt-2 text-sm ${
              messageState === 'error'
                ? 'text-red-500'
                : messageState === 'success'
                ? 'text-green-500'
                : 'text-white'
            }`}>
            {message}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
