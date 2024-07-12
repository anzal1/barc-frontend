import { ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type HoverTooltipProps = {
  element: ReactElement
  showOnHover: ReactNode
  hoverClassName?: string
}

function HoverTooltip(props: HoverTooltipProps) {
  return (
    <div className="relative group">
      {props.element}
      <div
        className={twMerge('absolute hidden group-hover:inline-block bg-white px-2 py-1 text-black text-base w-max rounded-md shadow-lg top-8 right-4', props.hoverClassName)}
      >
        {props.showOnHover}
      </div>
    </div>
  )
}

export default HoverTooltip
