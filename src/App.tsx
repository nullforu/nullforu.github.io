import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import DesktopIcon from './components/DesktopIcon'
import MenuBar from './components/MenuBar'
import Window from './components/Window'
import {
    AboutContent,
    AnonymousBoardContent,
    BonobonoContent,
    ContactContent,
    CurriculumContent,
    HelpContent,
    JoinContent,
    ProjectsContent,
    SystemDiskContent,
    TerminalContent,
} from './windows'
import { DESKTOP_ICONS, WINDOW_DEFINITIONS } from './data/windows'
import type { WindowId, WindowState } from './types/window'

function App() {
    const desktopRef = useRef<HTMLDivElement>(null)
    const clickSoundRef = useRef<HTMLAudioElement | null>(null)
    const [compact, setCompact] = useState(false)
    const [viewport, setViewport] = useState({ w: 0, h: 0 })
    const [soundEnabled, setSoundEnabled] = useState(() => {
        const saved = localStorage.getItem('soundEnabled')
        const isMobile = window.innerWidth < 768
        return saved !== null ? saved === 'true' : !isMobile
    })
    const scale = compact ? 1 : 1.5
    const didInitialLayout = useRef(false)

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
        clickSoundRef.current = new Audio('/sounds/click.mp3')
        clickSoundRef.current.preload = 'auto'
        const handleClickSound = (event: PointerEvent) => {
            if (!soundEnabled) return
            const target = event.target as HTMLElement | null
            if (!target) return
            const clickable = target.closest('button, [role="button"], a')
            if (!clickable) return
            const audio = clickSoundRef.current
            if (!audio) return
            audio.currentTime = 0
            void audio.play().catch(() => undefined)
        }
        document.addEventListener('pointerdown', handleClickSound, true)
        return () => {
            document.removeEventListener('pointerdown', handleClickSound, true)
        }
    }, [soundEnabled])

    useEffect(() => {
        localStorage.setItem('soundEnabled', String(soundEnabled))
    }, [soundEnabled])

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
                    pos: { x: 0, y: 0 },
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
                const pos = def.centerOnOpen ? (getCenteredPos(def.id) ?? { x: 0, y: 0 }) : getDynamicPos(def.id, next)
                next[def.id] = {
                    ...next[def.id],
                    pos,
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
        const maxHeight = Math.min(bounds.clientHeight * 0.92, def.size.h)
        const nextX = Math.max(0, (bounds.clientWidth - maxWidth) / 2)
        const nextY = Math.max(0, (bounds.clientHeight - maxHeight) / 2)
        return { x: nextX, y: nextY }
    }

    const getDynamicPos = (id: WindowId, state: Record<WindowId, WindowState>) => {
        const bounds = desktopRef.current
        const def = WINDOW_DEFINITIONS.find((item) => item.id === id)
        if (!bounds || !def) return state[id].pos
        const size = state[id].size
        const maxX = Math.max(0, bounds.clientWidth - size.w - 8)
        const maxY = Math.max(0, bounds.clientHeight * 0.8 - size.h - 8)
        const minX = 24
        const minY = 40
        const x = minX + Math.random() * Math.max(0, maxX - minX)
        const y = minY + Math.random() * Math.max(0, maxY - minY)
        return { x, y }
    }

    const openWindow = (id: WindowId) => {
        setWindowState((prev) => {
            if (prev[id].open) {
                const maxZ = Math.max(...Object.values(prev).map((state) => state.z))
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        open: true,
                        z: maxZ + 1,
                    },
                }
            }
            const def = WINDOW_DEFINITIONS.find((d) => d.id === id)
            const shouldCenter = def?.centerOnOpen ?? compact
            const position = shouldCenter ? getCenteredPos(id) : getDynamicPos(id, prev)
            const maxZ = Math.max(...Object.values(prev).map((state) => state.z))
            const nextState = { ...prev }
            if (compact) {
                Object.keys(nextState).forEach((key) => {
                    const windowId = key as WindowId
                    nextState[windowId] = {
                        ...nextState[windowId],
                        open: windowId === id,
                    }
                })
            }
            return {
                ...nextState,
                [id]: {
                    ...nextState[id],
                    open: true,
                    z: maxZ + 1,
                    pos: position ?? prev[id].pos,
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

    const windowContent: Record<WindowId, ReactNode> = useMemo(
        () => ({
            system: <SystemDiskContent onOpen={(id) => openWindow(id)} />,
            help: <HelpContent />,
            about: <AboutContent />,
            curriculum: <CurriculumContent />,
            projects: <ProjectsContent />,
            join: <JoinContent />,
            contact: <ContactContent />,
            bonobono: <BonobonoContent />,
            board: <AnonymousBoardContent />,
            terminal: <TerminalContent />,
        }),
        [],
    )

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
        if (didInitialLayout.current) return
        const bounds = desktopRef.current
        if (!bounds) return
        setWindowState((prev) => {
            const next = { ...prev }
            WINDOW_DEFINITIONS.forEach((def) => {
                if (!next[def.id].open) return
                const shouldCenter = def.centerOnOpen ?? compact
                const position = shouldCenter ? getCenteredPos(def.id) : getDynamicPos(def.id, next)
                if (position) {
                    next[def.id] = { ...next[def.id], pos: position }
                }
            })
            return next
        })
        didInitialLayout.current = true
    }, [compact, viewport.h, viewport.w])

    useEffect(() => {
        if (!viewport.w || !viewport.h) return
        const bounds = desktopRef.current
        if (!bounds) return
        setWindowState((prev) => {
            const next = { ...prev }
            WINDOW_DEFINITIONS.forEach((def) => {
                const maxSize = def.maxSize ?? def.size
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
                    soundEnabled={soundEnabled}
                    onOpenWindow={openWindow}
                    onCloseAll={closeAllWindows}
                    onResetWindows={resetWindows}
                    onToggleSound={() => setSoundEnabled((prev) => !prev)}
                />
                <div ref={desktopRef} className='desktop-pattern relative' style={{ height: 'calc(100% - 32px)' }}>
                    <div className='absolute inset-0 pl-6 pt-8 overflow-hidden pointer-events-none'>
                        <div
                            className='grid h-full w-full auto-cols-[5rem] grid-flow-col gap-y-2 gap-x-6 pointer-events-auto'
                            style={{
                                gridTemplateRows: 'repeat(auto-fill, 5.5rem)',
                            }}
                        >
                            {DESKTOP_ICONS.map((icon) => (
                                <DesktopIcon
                                    key={icon.id}
                                    label={icon.label}
                                    icon={icon.icon}
                                    onOpen={() => openWindow(icon.id)}
                                />
                            ))}
                        </div>
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
                                maxSize={def.maxSize ?? def.size}
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
