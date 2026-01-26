import { useEffect, useRef, useState } from 'react'
import type { WindowId } from '../types/window'

type MenuId = 'file' | 'edit' | 'view' | 'options' | 'menu'

type MenuBarProps = {
    compact: boolean
    soundEnabled: boolean
    onOpenWindow: (id: WindowId) => void
    onCloseAll: () => void
    onResetWindows: () => void
    onToggleSound: () => void
}

const MenuBar = ({ compact, soundEnabled, onOpenWindow, onCloseAll, onResetWindows, onToggleSound }: MenuBarProps) => {
    const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
    const [menuLeft, setMenuLeft] = useState(8)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!openMenu) return
        const handlePointer = (event: PointerEvent) => {
            const target = event.target as Node
            if (!menuRef.current?.contains(target)) {
                setOpenMenu(null)
            }
        }
        window.addEventListener('pointerdown', handlePointer)
        return () => window.removeEventListener('pointerdown', handlePointer)
    }, [openMenu])

    const closeMenu = () => setOpenMenu(null)
    const openDesktopMenu = (id: MenuId, target: HTMLElement) => {
        const container = menuRef.current
        if (!container) {
            setOpenMenu((prev) => (prev === id ? null : id))
            return
        }
        setMenuLeft(target.offsetLeft)
        setOpenMenu((prev) => (prev === id ? null : id))
    }

    return (
        <div
            ref={menuRef}
            className='relative flex h-8 items-center justify-between border-b-2 border-mac-ink bg-mac-paper px-3 text-[12px]'
        >
            <div className='flex items-center gap-4'>
                <span className='text-[14px]'></span>
                {compact ? (
                    <button
                        type='button'
                        className='border-0 bg-transparent p-0 text-[inherit] font-[inherit] appearance-none hover:opacity-80'
                        onClick={() => setOpenMenu((prev) => (prev === 'menu' ? null : 'menu'))}
                    >
                        Menu
                    </button>
                ) : (
                    <>
                        <button
                            type='button'
                            className='border-0 bg-transparent p-0 text-[inherit] font-[inherit] appearance-none hover:opacity-80'
                            onClick={(event) => openDesktopMenu('file', event.currentTarget)}
                        >
                            File
                        </button>
                        <button
                            type='button'
                            className='border-0 bg-transparent p-0 text-[inherit] font-[inherit] appearance-none hover:opacity-80'
                            onClick={(event) => openDesktopMenu('edit', event.currentTarget)}
                        >
                            Edit
                        </button>
                        <button
                            type='button'
                            className='border-0 bg-transparent p-0 text-[inherit] font-[inherit] appearance-none hover:opacity-80'
                            onClick={(event) => openDesktopMenu('view', event.currentTarget)}
                        >
                            View
                        </button>
                        <button
                            type='button'
                            className='border-0 bg-transparent p-0 text-[inherit] font-[inherit] appearance-none hover:opacity-80'
                            onClick={(event) => openDesktopMenu('options', event.currentTarget)}
                        >
                            Options
                        </button>
                    </>
                )}
            </div>
            <div className='hidden text-[11px] sm:block'>세명컴퓨터고등학교 Null4U</div>
            {openMenu ? (
                <div
                    className='absolute top-8 z-50 w-48 border-2 border-mac-ink bg-mac-paper text-[11px] shadow-[2px_2px_0_#111111]'
                    style={{ left: compact ? 8 : menuLeft }}
                >
                    {openMenu === 'menu' || openMenu === 'file' ? (
                        <div className='border-b border-mac-ink p-2'>
                            <div className='mb-1 text-[10px]'>File</div>
                            <div className='border-t border-mac-ink my-1' />
                            <button
                                type='button'
                                className='mt-1 block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onOpenWindow('system')
                                    closeMenu()
                                }}
                            >
                                System Disk 열기
                            </button>
                            <div className='border-t border-mac-ink my-1' />
                            <button
                                type='button'
                                className='block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onResetWindows()
                                    closeMenu()
                                }}
                            >
                                창 초기화
                            </button>
                            <button
                                type='button'
                                className='mt-1 block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onCloseAll()
                                    closeMenu()
                                }}
                            >
                                모든 창 닫기
                            </button>
                        </div>
                    ) : null}
                    {openMenu === 'menu' || openMenu === 'edit' ? (
                        <div className='border-b border-mac-ink p-2'>
                            <div className='mb-1 text-[10px]'>Edit</div>
                            <div className='border-t border-mac-ink my-1' />
                        </div>
                    ) : null}
                    {openMenu === 'menu' || openMenu === 'view' ? (
                        <div className='border-b border-mac-ink p-2'>
                            <div className='mb-1 text-[10px]'>View</div>
                            <div className='border-t border-mac-ink my-1' />
                            <button
                                type='button'
                                className='block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onOpenWindow('about')
                                    closeMenu()
                                }}
                            >
                                Null4U 소개
                            </button>
                            <button
                                type='button'
                                className='block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onOpenWindow('curriculum')
                                    closeMenu()
                                }}
                            >
                                커리큘럼
                            </button>
                            <button
                                type='button'
                                className='block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onOpenWindow('projects')
                                    closeMenu()
                                }}
                            >
                                프로젝트
                            </button>
                            <button
                                type='button'
                                className='block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onOpenWindow('join')
                                    closeMenu()
                                }}
                            >
                                모집 안내
                            </button>
                            <button
                                type='button'
                                className='mt-1 block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onOpenWindow('contact')
                                    closeMenu()
                                }}
                            >
                                연락처
                            </button>
                            <button
                                type='button'
                                className='mt-1 block w-full border-0 bg-transparent p-0 text-left text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
                                onClick={() => {
                                    onOpenWindow('board')
                                    closeMenu()
                                }}
                            >
                                익명 게시판
                            </button>
                        </div>
                    ) : null}
                    {openMenu === 'menu' || openMenu === 'options' ? (
                        <div className='p-2'>
                            <div className='mb-1 text-[10px]'>Options</div>
                            <div className='border-t border-mac-ink my-1' />
                            <label className='flex items-center gap-2 cursor-pointer hover:opacity-80'>
                                <input
                                    type='checkbox'
                                    checked={soundEnabled}
                                    onChange={onToggleSound}
                                    className='menu-checkbox'
                                />
                                <span>효과음</span>
                            </label>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}

export default MenuBar
