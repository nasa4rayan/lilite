import * as React from 'react'
import { cn } from '@/lib/utils'

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  viewportRef?: React.RefObject<HTMLDivElement>
  viewportClassName?: string
  onViewportScroll?: React.UIEventHandler<HTMLDivElement>
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, onViewportScroll, viewportClassName, viewportRef, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        <div
          ref={viewportRef}
          onScroll={onViewportScroll}
          className={cn('h-full w-full overflow-y-auto overscroll-contain', viewportClassName)}
        >
          {children}
        </div>
      </div>
    )
  },
)

ScrollArea.displayName = 'ScrollArea'

export { ScrollArea }
