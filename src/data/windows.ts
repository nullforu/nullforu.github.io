import type { DesktopIconDefinition, WindowDefinition } from '../types/window'

export const WINDOW_DEFINITIONS: WindowDefinition[] = [
    {
        id: 'system',
        title: 'System Disk',
        subtitle: 'Copyright (C) 2026 Null4U. All rights reserved.',
        size: { w: 700, h: 400 },
        maxSize: { w: 720, h: 460 },
        centerOnOpen: true,
    },
    {
        id: 'help',
        title: '도움말',
        subtitle: 'Null4U 홈페이지 이용에 도움이 필요하신가요?',
        size: { w: 500, h: 300 },
        maxSize: { w: 700, h: 440 },
        centerOnOpen: true,
    },
    {
        id: 'about',
        title: 'Null4U 소개',
        subtitle: 'DevOps/Cloud 전공동아리 Null4U를 소개합니다.',
        size: { w: 820, h: 560 },
        maxSize: { w: 920, h: 600 },
        centerOnOpen: true,
    },
    {
        id: 'curriculum',
        title: '커리큘럼',
        subtitle: 'Null4U 커리큘럼 정보 및 학습 자료입니다.',
        size: { w: 460, h: 280 },
        maxSize: { w: 680, h: 440 },
    },
    {
        id: 'projects',
        title: '프로젝트 & 대회',
        subtitle: 'Null4U의 프로젝트 및 대회 참여 기록입니다.',
        size: { w: 480, h: 300 },
        maxSize: { w: 700, h: 440 },
    },
    {
        id: 'join',
        title: '모집 안내',
        subtitle: 'Null4U 동아리 가입 안내 및 절차입니다.',
        size: { w: 420, h: 240 },
        maxSize: { w: 580, h: 380 },
    },
    {
        id: 'contact',
        title: '연락처',
        subtitle: 'Null4U와 연락할 수 있는 방법들입니다.',
        size: { w: 360, h: 220 },
        maxSize: { w: 520, h: 320 },
    },
    {
        id: 'bonobono',
        title: '보노보노 바이러스',
        subtitle: '아이고!',
        size: { w: 300, h: 300 },
        maxSize: { w: 500, h: 500 },
    },
    {
        id: 'board',
        title: '익명 게시판',
        subtitle: '익명으로 글을 남기고 서로 소통해요.',
        size: { w: 640, h: 420 },
        maxSize: { w: 820, h: 560 },
    },
    {
        id: 'terminal',
        title: 'Terminal',
        subtitle: 'null4u@terminal',
        size: { w: 580, h: 360 },
        maxSize: { w: 720, h: 480 },
    },
]

export const DESKTOP_ICONS: DesktopIconDefinition[] = [
    { id: 'system', label: 'System Disk', icon: 'disk' },
    { id: 'about', label: 'Null4U 소개', icon: 'folder' },
    { id: 'curriculum', label: '커리큘럼', icon: 'server' },
    { id: 'projects', label: '프로젝트', icon: 'folder' },
    { id: 'join', label: '모집 안내', icon: 'doc' },
    { id: 'contact', label: '연락처', icon: 'chat' },
    { id: 'board', label: '익명 게시판', icon: 'chat' },
    { id: 'help', label: '도움말', icon: 'help' },
]
