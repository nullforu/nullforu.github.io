import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import DesktopIcon from './components/DesktopIcon'
import MenuBar from './components/MenuBar'
import Window from './components/Window'
import {
    AboutContent,
    ContactContent,
    CurriculumContent,
    JoinContent,
    ProjectsContent,
    SystemDiskContent,
    WINDOW_MAX_SIZE,
} from './components/WindowContents'
import { DESKTOP_ICONS, WINDOW_DEFINITIONS } from './data/windows'
import type { WindowId, WindowState } from './types/window'

function App() {
    const desktopRef = useRef<HTMLDivElement>(null)
    const [compact, setCompact] = useState(false)
    const [viewport, setViewport] = useState({ w: 0, h: 0 })
    const scale = compact ? 1 : 1.5

    useEffect(() => {
        const handleResize = () => {
            setCompact(window.innerWidth < 768)
            setViewport({ w: window.innerWidth, h: window.innerHeight })
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const applyTabIndex = () => {
            document.querySelectorAll<HTMLElement>('*').forEach((node) => {
                node.setAttribute('tabindex', '-1')
            })
        }
        applyTabIndex()
        const observer = new MutationObserver(() => applyTabIndex())
        observer.observe(document.body, { childList: true, subtree: true })
        return () => observer.disconnect()
    }, [])

    const [windowState, setWindowState] = useState<Record<WindowId, WindowState>>(() =>
        WINDOW_DEFINITIONS.reduce(
            (acc, def, index) => {
                acc[def.id] = {
                    open: def.id === 'system',
                    z: 10 + index,
                    pos: def.defaultPos,
                    size: def.size,
                }
                return acc
            },
            {} as Record<WindowId, WindowState>,
        ),
    )

    const bringToFront = (id: WindowId) => {
        setWindowState((prev) => {
            const maxZ = Math.max(...Object.values(prev).map((state) => state.z))
            return {
                ...prev,
                [id]: {
                    ...prev[id],
                    open: true,
                    z: maxZ + 1,
                },
            }
        })
    }

    const closeAllWindows = () => {
        setWindowState((prev) => {
            const next = { ...prev }
            Object.keys(next).forEach((key) => {
                const windowId = key as WindowId
                next[windowId] = { ...next[windowId], open: false }
            })
            return next
        })
    }

    const resetWindows = () => {
        setWindowState((prev) => {
            const next = { ...prev }
            WINDOW_DEFINITIONS.forEach((def) => {
                next[def.id] = {
                    ...next[def.id],
                    pos: def.defaultPos,
                    size: def.size,
                }
            })
            return next
        })
    }

    const getCenteredPos = (id: WindowId) => {
        const bounds = desktopRef.current
        const def = WINDOW_DEFINITIONS.find((item) => item.id === id)
        if (!bounds || !def) return null
        const maxWidth = Math.min(bounds.clientWidth * 0.92, def.size.w)
        const maxHeight = Math.min(bounds.clientHeight * 0.72, def.size.h)
        const nextX = Math.max(0, (bounds.clientWidth - maxWidth) / 2)
        const nextY = Math.max(0, (bounds.clientHeight - maxHeight) / 2)
        return { x: nextX, y: nextY }
    }

    const openWindow = (id: WindowId) => {
        if (!compact) {
            bringToFront(id)
            return
        }
        const centered = getCenteredPos(id)
        setWindowState((prev) => {
            const maxZ = Math.max(...Object.values(prev).map((state) => state.z))
            const nextState = { ...prev }
            Object.keys(nextState).forEach((key) => {
                const windowId = key as WindowId
                nextState[windowId] = {
                    ...nextState[windowId],
                    open: windowId === id,
                }
            })
            return {
                ...nextState,
                [id]: {
                    ...nextState[id],
                    open: true,
                    z: maxZ + 1,
                    pos: centered ?? prev[id].pos,
                },
            }
        })
    }

    const closeWindow = (id: WindowId) => {
        setWindowState((prev) => ({
            ...prev,
            [id]: { ...prev[id], open: false },
        }))
    }

    const updatePosition = (id: WindowId, pos: { x: number; y: number }) => {
        setWindowState((prev) => ({
            ...prev,
            [id]: { ...prev[id], pos },
        }))
    }

    const updateSize = (id: WindowId, size: { w: number; h: number }) => {
        setWindowState((prev) => ({
            ...prev,
            [id]: { ...prev[id], size },
        }))
    }

    const windowContent: Record<WindowId, ReactNode> = {
        system: <SystemDiskContent onOpen={(id) => openWindow(id)} />,
        about: <AboutContent />,
        curriculum: <CurriculumContent />,
        projects: <ProjectsContent />,
        join: <JoinContent />,
        contact: <ContactContent />,
    }

    useEffect(() => {
        if (!compact) return
        const bounds = desktopRef.current
        if (!bounds) return
        setWindowState((prev) => {
            const keepId = prev.system.open
                ? 'system'
                : (Object.keys(prev).find((key) => prev[key as WindowId].open) as WindowId | undefined)
            const next = { ...prev }
            WINDOW_DEFINITIONS.forEach((def) => {
                const centered = getCenteredPos(def.id)
                next[def.id] = {
                    ...next[def.id],
                    open: def.id === (keepId ?? 'system'),
                    pos: centered ?? next[def.id].pos,
                }
            })
            return next
        })
    }, [compact])

    useEffect(() => {
        if (!viewport.w || !viewport.h) return
        const bounds = desktopRef.current
        if (!bounds) return
        setWindowState((prev) => {
            const next = { ...prev }
            WINDOW_DEFINITIONS.forEach((def) => {
                const maxSize = WINDOW_MAX_SIZE[def.id] ?? def.size
                const boundMaxW = Math.max(220, bounds.clientWidth - 8)
                const boundMaxH = Math.max(180, bounds.clientHeight - 8)
                const maxW = Math.min(maxSize.w, boundMaxW)
                const maxH = Math.min(maxSize.h, boundMaxH)
                const minW = Math.min(def.size.w, maxW)
                const minH = Math.min(def.size.h, maxH)
                next[def.id] = {
                    ...next[def.id],
                    size: {
                        w: Math.max(minW, Math.min(next[def.id].size.w, maxW)),
                        h: Math.max(minH, Math.min(next[def.id].size.h, maxH)),
                    },
                }
            })
            return next
        })
    }, [viewport.h, viewport.w])

    return (
        <div className='h-screen w-full select-none overflow-hidden text-mac-ink'>
            <div
                className='h-full w-full origin-top-left'
                style={{
                    transform: `scale(${scale})`,
                    width: `calc(100% / ${scale})`,
                    height: `calc(100% / ${scale})`,
                }}
            >
                <MenuBar
                    compact={compact}
                    onOpenWindow={openWindow}
                    onCloseAll={closeAllWindows}
                    onResetWindows={resetWindows}
                />
                <div ref={desktopRef} className='desktop-pattern relative h-[calc(100vh-32px)] overflow-hidden'>
                    <div className='absolute left-6 top-8 grid w-24 gap-6'>
                        {DESKTOP_ICONS.map((icon) => (
                            <DesktopIcon
                                key={icon.id}
                                label={icon.label}
                                icon={icon.icon}
                                onOpen={() => openWindow(icon.id)}
                            />
                        ))}
                    </div>

                    {WINDOW_DEFINITIONS.map((def) => {
                        const state = windowState[def.id]
                        if (!state?.open) return null
                        return (
                            <Window
                                key={def.id}
                                title={def.title}
                                subtitle={def.subtitle}
                                size={state.size}
                                minSize={def.size}
                                maxSize={WINDOW_MAX_SIZE[def.id] ?? def.size}
                                scale={scale}
                                open={state.open}
                                zIndex={state.z}
                                position={state.pos}
                                onClose={() => closeWindow(def.id)}
                                onFocus={() => bringToFront(def.id)}
                                onMove={(pos) => updatePosition(def.id, pos)}
                                onResize={(size) => updateSize(def.id, size)}
                                boundsRef={desktopRef}
                                compact={compact}
                            >
                                {windowContent[def.id]}
                            </Window>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default App
