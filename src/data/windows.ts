import type { DesktopIconDefinition, WindowDefinition } from '../types/window'

export const WINDOW_DEFINITIONS: WindowDefinition[] = [
    {
        id: 'system',
        title: 'System Disk',
        subtitle: 'Copyright (C) 2026 Null4U. All rights reserved.',
        size: { w: 520, h: 300 },
        defaultPos: { x: 60, y: 80 },
    },
    {
        id: 'about',
        title: 'Null4U 소개',
        subtitle: 'DevOps/Cloud 전공동아리 Null4U를 소개합니다.',
        size: { w: 420, h: 260 },
        defaultPos: { x: 140, y: 180 },
    },
    {
        id: 'curriculum',
        title: '커리큘럼',
        subtitle: 'Null4U 커리큘럼 정보 및 학습 자료입니다.',
        size: { w: 460, h: 280 },
        defaultPos: { x: 330, y: 120 },
    },
    {
        id: 'projects',
        title: '프로젝트 & 대회',
        subtitle: 'Null4U의 프로젝트 및 대회 참여 기록입니다.',
        size: { w: 480, h: 300 },
        defaultPos: { x: 210, y: 320 },
    },
    {
        id: 'join',
        title: '모집 안내',
        subtitle: 'Null4U 동아리 가입 안내 및 절차입니다.',
        size: { w: 420, h: 240 },
        defaultPos: { x: 580, y: 200 },
    },
    {
        id: 'contact',
        title: '연락처',
        subtitle: 'Null4U와 연락할 수 있는 방법들입니다.',
        size: { w: 360, h: 220 },
        defaultPos: { x: 640, y: 360 },
    },
    {
        id: 'bonobono',
        title: '보노보노 바이러스',
        subtitle: '아이고!',
        size: { w: 300, h: 300 },
        defaultPos: { x: 400, y: 400 },
    },
]

export const DESKTOP_ICONS: DesktopIconDefinition[] = [
    { id: 'system', label: 'System Disk', icon: 'disk' },
    { id: 'about', label: 'Null4U 소개', icon: 'folder' },
    { id: 'curriculum', label: '커리큘럼', icon: 'server' },
    { id: 'projects', label: '프로젝트', icon: 'folder' },
    { id: 'join', label: '모집 안내', icon: 'doc' },
    { id: 'contact', label: '연락처', icon: 'chat' },
    { id: 'bonobono', label: '보노보노 바이러스', icon: 'doc' },
]
