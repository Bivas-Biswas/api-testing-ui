import classNames from 'classnames'
import { HTMLDivProps } from 'interfaces/html'
import React, { useRef, useState } from 'react'
import { style, tw } from 'twind/style'
import { useOnClickOutside } from 'usehooks-ts'

import { Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

export const selectInputStyle = style({
  base: `flex px-3 py-2 w-full focus:outline-none text-gray-100 placeholder-gray-400 bg-gray-900 disabled:opacity-80`,
  variants: {
    state: {
      default: 'border-gray-900',
      success: 'border-green-400',
      error: 'border-red-400'
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

export type SelectInputStyleProps = Parameters<typeof selectInputStyle>[0]

type Option = { id: string; label: string; disabled?: boolean }

export type SelectInputCustomProps = {
  /**
   * Label for this input
   */
  label?: string
  /**
   * The text to be shown in the select
   */
  text: string
  wrapperClassName?: string
  info?: string
  hideLabel?: boolean
  message?: string
  messageState?: 'default' | 'error' | 'status'
  /**
   * Array of options that should be shown
   */
  options: Option[]
  /**
   * An array of ids of selected items
   */
  selected: Option['id'][]
  /**
   * When the value changes this function is called.
   * If not a multi select it returns array with 1 id which is the selected item
   * If it is a multi select it returns array with ids of all selected items
   */
  onChangeValue?: (_option: Option['id'][]) => void
  /**
   * If user can select multiple items or not
   */
  multi?: boolean
  /**
   * If this should open above the button or below
   */
  position?: 'above' | 'below'
  /**
   * className for label
   */
  labelClassName?: string
  /**
   * disable the select component
   */
  disabled?: boolean
}

export type SelectInputProps = HTMLDivProps &
  SelectInputStyleProps &
  SelectInputCustomProps

const SelectInput = React.forwardRef<HTMLDivElement, SelectInputProps>(
  (props: SelectInputProps, ref) => {
    const {
      label = '',
      info,
      text,
      textSize = 'regular',
      roundness = 'default',
      hideLabel,
      message,
      state = 'default',
      wrapperClassName,
      className,
      selected,
      options,
      onChangeValue,
      multi,
      position = 'below',
      labelClassName,
      disabled = false
    } = props

    const messageState = props.messageState || state
    const btnWrapperRef = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)

    const handleClickOutside = () => {
      setOpen(false)
    }

    useOnClickOutside(btnWrapperRef, handleClickOutside)

    const handleChange = (value: Option, isSelected: boolean) => {
      if (!onChangeValue) return

      if (multi) {
        if (isSelected) onChangeValue(selected.filter((id) => id !== value.id))
        else onChangeValue([...selected, value.id])
      } else {
        onChangeValue([value.id])
        setOpen(false)
      }
    }

    return (
      <div ref={ref} className={tw('flex flex-col', wrapperClassName)}>
        <div className="flex justify-between">
          <label
            className={classNames(
              hideLabel
                ? 'sr-only'
                : 'mx-1 block text-sm font-medium text-gray-100 mb-1',
              labelClassName
            )}>
            {label}
          </label>

          {info && <span className="text-sm text-gray-400">{info}</span>}
        </div>

        <div ref={btnWrapperRef} className="relative">
          <button
            onClick={() => !disabled && setOpen(!open)}
            className={tw(
              selectInputStyle({ textSize, state, roundness }),
              className,
              disabled && 'cursor-no-drop opacity-20 bg-gray-600'
            )}>
            <span className="block text-left font-medium truncate flex-1">
              {text}
            </span>

            <span className="flex items-center ml-1 pointer-events-none">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </button>

          <Transition
            unmount={false}
            show={open}
            as={'div'}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={classNames(
              'absolute z-20 mt-1 w-full rounded-md bg-gray-800 shadow-lg scrollbar',
              position === 'above' && 'bottom-0'
            )}>
            <div className="max-h-60 rounded-md py-1 text-base leading-6 shadow-sm overflow-auto focus:outline-none sm:text-sm sm:leading-5">
              {options.length > 0 ? (
                options.map((option) => {
                  const isSelected = !!selected.find((id) => id === option.id)

                  return (
                    <div
                      key={option.id}
                      onClick={() =>
                        !option.disabled && handleChange(option, isSelected)
                      }
                      className={classNames(
                        'flex items-center cursor-pointer group transition-colors select-none relative py-2 px-2 text-gray-100 bg-gray-800 hover:text-white hover:bg-gray-700',
                        option.disabled && 'opacity-50'
                      )}>
                      <span className="text-indigo-400 group-hover:text-white transition-colors pr-4 h-5 w-5 mr-1">
                        {isSelected && (
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>

                      <span
                        className={classNames(
                          isSelected ? 'font-medium' : 'font-normal',
                          'block truncate'
                        )}>
                        {option.label}
                      </span>
                    </div>
                  )
                })
              ) : (
                <div
                  className={
                    'flex items-center py-2 px-2 text-gray-100 bg-gray-800'
                  }>
                  No options available!
                </div>
              )}
            </div>
          </Transition>
        </div>

        {message && (
          <p
            className={`pt-2 text-sm ${
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

SelectInput.displayName = 'SelectInput'

export default SelectInput

/**
 * Example usage:

    // example data
    const [people, setPeople] = useState([
      'Wade Cooper',
      'Arlene Mccoy',
      'Devon Webb',
      'Tom Cook',
      'Tanya Fox',
      'Hellen Schmidt',
      'Caroline Schultz',
      'Mason Heaney',
    ])


    // for single select
    const [selected, setSelected] = useState('Wade Cooper')
    // for multi select
    const [multiSelect, setMultiSelected] = useState(['Wade Cooper'])

    // A single select
    <SelectInput
      label="Text here"
      text={selected}
      selected={[selected]}
      options={people.map((id) => ({
        id,
        label: id
      }))}
      onChangeValue={([selected]) => {
        setSelected(selected)
      }}
    />

    // A multi select
    <SelectInput
      multi
      label="Text here"
      text={`${multiSelect.length} selected`}
      selected={multiSelect}
      options={people.map((id) => ({
        id,
        label: id
      }))}
      onChangeValue={(multiSelect) => {
        setMultiSelected(multiSelect)
      }}
    />
 */
