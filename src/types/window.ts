export type WindowId = 'system' | 'about' | 'curriculum' | 'projects' | 'join' | 'contact' | 'bonobono'

export type WindowDefinition = {
    id: WindowId
    title: string
    subtitle?: string
    size: { w: number; h: number }
    defaultPos: { x: number; y: number }
}

export type WindowState = {
    open: boolean
    z: number
    pos: { x: number; y: number }
    size: { w: number; h: number }
}

export type IconName = 'folder' | 'disk' | 'doc' | 'server' | 'chat'

export type DesktopIconDefinition = {
    id: WindowId
    label: string
    icon: IconName
}

export const WINDOW_MAX_SIZE: Record<WindowId, { w: number; h: number }> = {
    system: { w: 720, h: 460 },
    about: { w: 640, h: 420 },
    curriculum: { w: 680, h: 440 },
    projects: { w: 700, h: 440 },
    join: { w: 580, h: 380 },
    contact: { w: 520, h: 320 },
    bonobono: { w: 500, h: 500 },
}
