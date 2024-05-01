import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const TextInput = (props: InputProps) => {
  const [error, setError] = useState('')
  useEffect(() => {
    if (props.required && props.value === '') {
      setError(`${props.label} is required`)
    }
  }, [error])

  return (
    <div className="flex flex-col gap-1 items-start justify-start">
      {props.label ? (
        <label htmlFor={props.id || props.name}>
          {props.label}
          {props.required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}

      <input
        id={props.id || props.name}
        {...props}
        onInvalid={(e) => {
          setError(`${props.label} is required`)
          ;(e.target as any).setCustomValidity(`${props.label} is required`)
        }}
        onBeforeInput={(e) => {
          setError('')
          ;(e.target as any).setCustomValidity('')
        }}
        className={twMerge(
          'w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]',
          error ? 'ring-1 ring-red-500' : '',
          props.className
        )}
      />
    </div>
  )
}

export default TextInput
