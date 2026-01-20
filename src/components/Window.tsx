import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, ReactNode, RefObject } from 'react'
import { clamp } from '../utils/clamp'

type WindowProps = {
    title: string
    subtitle?: string
    size: { w: number; h: number }
    minSize: { w: number; h: number }
    maxSize: { w: number; h: number }
    open: boolean
    zIndex: number
    position: { x: number; y: number }
    onClose: () => void
    onFocus: () => void
    onMove: (pos: { x: number; y: number }) => void
    onResize: (size: { w: number; h: number }) => void
    boundsRef: RefObject<HTMLDivElement | null>
    compact: boolean
    children: ReactNode
}

const Window = ({
    title,
    subtitle,
    size,
    minSize,
    maxSize,
    open,
    zIndex,
    position,
    onClose,
    onFocus,
    onMove,
    onResize,
    boundsRef,
    compact,
    children,
}: WindowProps) => {
    const windowRef = useRef<HTMLDivElement>(null)
    const posRef = useRef(position)
    const [localSize, setLocalSize] = useState(size)
    const sizeRef = useRef(size)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [scrollThumb, setScrollThumb] = useState({
        height: 0,
        top: 0,
        trackHeight: 0,
        visible: false,
    })
    const thumbDragRef = useRef<{
        pointerId: number
        startY: number
        startScrollTop: number
    } | null>(null)
    const dragRef = useRef<{
        pointerId: number
        startX: number
        startY: number
        originX: number
        originY: number
    } | null>(null)
    const draggingRef = useRef(false)
    const resizingRef = useRef(false)
    const resizeDragRef = useRef<{
        pointerId: number
        startX: number
        startY: number
        originW: number
        originH: number
    } | null>(null)

    useEffect(() => {
        if (draggingRef.current) return
        posRef.current = position
        const node = windowRef.current
        if (node) {
            node.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
        }
    }, [position.x, position.y])

    useEffect(() => {
        if (resizingRef.current) return
        setLocalSize(size)
    }, [size.h, size.w])

    useEffect(() => {
        sizeRef.current = localSize
    }, [localSize])

    const getSizeBounds = () => {
        const bounds = boundsRef.current
        if (!bounds) {
            return {
                maxW: maxSize.w,
                maxH: maxSize.h,
                minW: minSize.w,
                minH: minSize.h,
            }
        }
        const maxW = Math.min(maxSize.w, bounds.clientWidth - 8)
        const maxH = Math.min(maxSize.h, bounds.clientHeight - 8)
        return {
            maxW: Math.max(220, maxW),
            maxH: Math.max(180, maxH),
            minW: Math.min(minSize.w, maxW),
            minH: Math.min(minSize.h, maxH),
        }
    }

    useEffect(() => {
        if (!open) return
        const adjust = () => {
            const bounds = boundsRef.current
            const node = windowRef.current
            if (!bounds || !node) return
            const maxX = Math.max(0, bounds.clientWidth - node.offsetWidth)
            const maxY = Math.max(0, bounds.clientHeight - node.offsetHeight)
            const next = {
                x: clamp(posRef.current.x, 0, maxX),
                y: clamp(posRef.current.y, 0, maxY),
            }
            if (next.x !== posRef.current.x || next.y !== posRef.current.y) {
                posRef.current = next
                const node = windowRef.current
                if (node) {
                    node.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`
                }
                onMove(next)
            }
        }
        const id = requestAnimationFrame(adjust)
        return () => cancelAnimationFrame(id)
    }, [boundsRef, compact, onMove, open, localSize.h, localSize.w])

    useEffect(() => {
        const node = scrollRef.current
        if (!node) return
        const updateThumb = () => {
            const { scrollHeight, clientHeight, scrollTop } = node
            const trackHeight = Math.max(0, clientHeight - 16)
            if (scrollHeight <= clientHeight + 1) {
                setScrollThumb((prev) => (prev.visible ? { height: 0, top: 0, trackHeight, visible: false } : prev))
                return
            }
            const thumbHeight = Math.max(18, Math.round(clientHeight * (clientHeight / scrollHeight)))
            const maxTop = Math.max(0, trackHeight - thumbHeight)
            const top = maxTop > 0 ? Math.round((scrollTop / (scrollHeight - clientHeight)) * maxTop) : 0
            setScrollThumb({
                height: thumbHeight,
                top: clamp(top, 0, maxTop),
                trackHeight,
                visible: true,
            })
        }

        updateThumb()
        const onScroll = () => updateThumb()
        node.addEventListener('scroll', onScroll, { passive: true })
        const observer = new ResizeObserver(() => updateThumb())
        observer.observe(node)
        if (node.firstElementChild) {
            observer.observe(node.firstElementChild)
        }
        return () => {
            node.removeEventListener('scroll', onScroll)
            observer.disconnect()
        }
    }, [children, open, size.h, size.w])

    const startThumbDrag = (event: PointerEvent<HTMLDivElement>) => {
        const node = scrollRef.current
        if (!node || !scrollThumb.visible) return
        thumbDragRef.current = {
            pointerId: event.pointerId,
            startY: event.clientY,
            startScrollTop: node.scrollTop,
        }
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const moveThumbDrag = (event: PointerEvent<HTMLDivElement>) => {
        const drag = thumbDragRef.current
        const node = scrollRef.current
        if (!drag || drag.pointerId !== event.pointerId || !node) return
        const maxScroll = node.scrollHeight - node.clientHeight
        const maxThumbTravel = Math.max(1, scrollThumb.trackHeight - scrollThumb.height)
        const delta = event.clientY - drag.startY
        const nextScroll = clamp(drag.startScrollTop + (delta / maxThumbTravel) * maxScroll, 0, maxScroll)
        node.scrollTop = nextScroll
    }

    const endThumbDrag = (event: PointerEvent<HTMLDivElement>) => {
        const drag = thumbDragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        thumbDragRef.current = null
        event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const startDrag = (event: PointerEvent<HTMLDivElement>) => {
        const bounds = boundsRef.current
        const node = windowRef.current
        if (!bounds || !node) return
        draggingRef.current = true
        dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: posRef.current.x,
            originY: posRef.current.y,
        }
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        const bounds = boundsRef.current
        const node = windowRef.current
        if (!bounds || !node) return
        const maxX = Math.max(0, bounds.clientWidth - node.offsetWidth)
        const maxY = Math.max(0, bounds.clientHeight - node.offsetHeight)
        const nextX = clamp(drag.originX + (event.clientX - drag.startX), 0, maxX)
        const nextY = clamp(drag.originY + (event.clientY - drag.startY), 0, maxY)
        posRef.current = { x: nextX, y: nextY }
        node.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`
    }

    const endDrag = (event: PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        draggingRef.current = false
        dragRef.current = null
        event.currentTarget.releasePointerCapture(event.pointerId)
        onMove(posRef.current)
    }

    const startResize = (event: PointerEvent<HTMLDivElement>) => {
        if (compact) return
        resizingRef.current = true
        resizeDragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originW: localSize.w,
            originH: localSize.h,
        }
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const moveResize = (event: PointerEvent<HTMLDivElement>) => {
        const drag = resizeDragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        const { maxW, maxH, minW, minH } = getSizeBounds()
        const nextW = clamp(drag.originW + (event.clientX - drag.startX), minW, maxW)
        const nextH = clamp(drag.originH + (event.clientY - drag.startY), minH, maxH)
        setLocalSize({ w: nextW, h: nextH })
    }

    const endResize = (event: PointerEvent<HTMLDivElement>) => {
        const drag = resizeDragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        resizingRef.current = false
        resizeDragRef.current = null
        event.currentTarget.releasePointerCapture(event.pointerId)
        onMove(posRef.current)
        onResize(sizeRef.current)
    }

    if (!open) return null

    const width = compact ? `min(92vw, ${localSize.w}px)` : `${localSize.w}px`
    const height = compact ? `min(72vh, ${localSize.h}px)` : `${localSize.h}px`

    return (
        <div
            ref={windowRef}
            className='absolute bg-mac-paper text-[12px] leading-snug shadow-[2px_2px_0_#111111] border-2 border-mac-ink'
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                zIndex,
                width,
                height,
            }}
            onPointerDown={onFocus}
        >
            <div
                className='mac-titlebar relative flex items-center px-2 touch-none'
                onPointerDown={(event) => {
                    onFocus()
                    startDrag(event)
                }}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
            >
                <button
                    type='button'
                    onClick={onClose}
                    onPointerDown={(event) => event.stopPropagation()}
                    className='mr-2 h-3 w-3 border-2 border-mac-ink bg-white p-0 appearance-none'
                    aria-label={`${title} 닫기`}
                />
                <div className='mx-auto bg-mac-paper px-2 text-[11px] leading-[18px] tracking-wide'>{title}</div>
            </div>
            {subtitle ? (
                <div className='flex items-center justify-between border-b border-mac-ink bg-mac-paper px-2 py-1 text-[11px]'>
                    <span>{subtitle}</span>
                </div>
            ) : null}
            <div className='relative h-[calc(100%-48px)] px-3 py-2'>
                <div className='relative h-full w-full'>
                    <div
                        ref={scrollRef}
                        className='mac-scroll h-full w-full overflow-auto border border-mac-ink bg-white p-2 pr-6'
                    >
                        {children}
                    </div>
                    <div
                        className='mac-scroll-track pointer-events-none absolute right-2 top-2 w-3'
                        style={{ height: `${scrollThumb.trackHeight}px` }}
                    >
                        <div
                            className='mac-scroll-thumb pointer-events-auto'
                            style={{
                                height: `${scrollThumb.height}px`,
                                transform: `translateY(${scrollThumb.top}px)`,
                                opacity: scrollThumb.visible ? 1 : 0,
                            }}
                            onPointerDown={startThumbDrag}
                            onPointerMove={moveThumbDrag}
                            onPointerUp={endThumbDrag}
                            onPointerCancel={endThumbDrag}
                        />
                    </div>
                </div>
            </div>
            {!compact ? (
                <div
                    className='mac-resize-handle absolute bottom-1 right-1 h-4 w-4'
                    onPointerDown={startResize}
                    onPointerMove={moveResize}
                    onPointerUp={endResize}
                    onPointerCancel={endResize}
                />
            ) : null}
        </div>
    )
}

export default Window
