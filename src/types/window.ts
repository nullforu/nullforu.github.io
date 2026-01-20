export type WindowId = 'system' | 'about' | 'curriculum' | 'projects' | 'join' | 'contact'

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
