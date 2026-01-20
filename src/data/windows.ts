import type { DesktopIconDefinition, WindowDefinition } from '../types/window'

export const WINDOW_DEFINITIONS: WindowDefinition[] = [
    {
        id: 'system',
        title: 'System Disk',
        subtitle: '5 items    232K in disk    167K available',
        size: { w: 520, h: 300 },
        defaultPos: { x: 60, y: 80 },
    },
    {
        id: 'about',
        title: 'Null4U 소개',
        subtitle: '3 items    211K in folder    173K available',
        size: { w: 420, h: 260 },
        defaultPos: { x: 140, y: 180 },
    },
    {
        id: 'curriculum',
        title: 'DevOps 커리큘럼',
        subtitle: '5 items    227K in folder    173K available',
        size: { w: 460, h: 280 },
        defaultPos: { x: 330, y: 120 },
    },
    {
        id: 'projects',
        title: '프로젝트 & 대회',
        subtitle: '4 items    198K in folder    173K available',
        size: { w: 480, h: 300 },
        defaultPos: { x: 210, y: 320 },
    },
    {
        id: 'join',
        title: '모집 안내',
        subtitle: '4 items    168K in folder    173K available',
        size: { w: 420, h: 240 },
        defaultPos: { x: 580, y: 200 },
    },
    {
        id: 'contact',
        title: '연락처',
        subtitle: '3 items    96K in folder    173K available',
        size: { w: 360, h: 220 },
        defaultPos: { x: 640, y: 360 },
    },
]

export const DESKTOP_ICONS: DesktopIconDefinition[] = [
    { id: 'system', label: 'System Disk', icon: 'disk' },
    { id: 'about', label: 'Null4U 소개', icon: 'folder' },
    { id: 'curriculum', label: '커리큘럼', icon: 'server' },
    { id: 'projects', label: '프로젝트', icon: 'folder' },
    { id: 'join', label: '모집 안내', icon: 'doc' },
]
