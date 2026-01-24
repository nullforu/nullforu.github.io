export type WindowId =
    | 'system'
    | 'help'
    | 'about'
    | 'curriculum'
    | 'projects'
    | 'join'
    | 'contact'
    | 'bonobono'
    | 'board'
    | 'terminal'

export type WindowSize = {
    w: number
    h: number
}

export type WindowDefinition = {
    id: WindowId
    title: string
    subtitle?: string
    defaultSize: WindowSize
    minSize?: WindowSize
    maxSize?: WindowSize
    centerOnOpen?: boolean
}

export type WindowState = {
    open: boolean
    z: number
    pos: { x: number; y: number }
    size: WindowSize
}

export type IconName = 'folder' | 'disk' | 'doc' | 'server' | 'chat' | 'terminal' | 'help'

export type DesktopIconDefinition = {
    id: WindowId
    label: string
    icon: IconName
}
