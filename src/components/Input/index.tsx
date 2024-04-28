import React from 'react'
import { twMerge } from 'tailwind-merge'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const TextInput = (props: InputProps) => {
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
        className={twMerge(
          'w-full h-12 border bg-[#e8e8e8] border-none rounded-lg p-4 shadow-md shadow-[#00000061]',
          props.className
        )}
      />
    </div>
  )
}

export default TextInput
