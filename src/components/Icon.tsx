import type { IconName } from '../types/window'

const Icon = ({ name, className }: { name: IconName; className?: string }) => {
    switch (name) {
        case 'disk':
            return (
                <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
                    <rect x='10' y='6' width='44' height='52' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <rect x='18' y='12' width='28' height='14' fill='#111111' />
                    <rect x='18' y='32' width='28' height='18' fill='#ffffff' stroke='#111111' strokeWidth='2' />
                    <circle cx='32' cy='41' r='4' fill='#111111' />
                </svg>
            )
        case 'doc':
            return (
                <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
                    <path d='M14 6h26l10 10v42H14z' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <path d='M40 6v14h14' fill='#ffffff' stroke='#111111' />
                    <line x1='20' y1='30' x2='44' y2='30' stroke='#111111' strokeWidth='2' />
                    <line x1='20' y1='38' x2='44' y2='38' stroke='#111111' strokeWidth='2' />
                </svg>
            )
        case 'server':
            return (
                <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
                    <rect x='12' y='8' width='40' height='14' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <rect x='12' y='26' width='40' height='14' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <rect x='12' y='44' width='40' height='12' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <circle cx='20' cy='15' r='2' fill='#111111' />
                    <circle cx='20' cy='33' r='2' fill='#111111' />
                    <circle cx='20' cy='50' r='2' fill='#111111' />
                </svg>
            )
        case 'chat':
            return (
                <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
                    <rect x='10' y='12' width='44' height='30' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <path d='M22 42l-6 10 14-8' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <circle cx='24' cy='26' r='2' fill='#111111' />
                    <circle cx='32' cy='26' r='2' fill='#111111' />
                    <circle cx='40' cy='26' r='2' fill='#111111' />
                </svg>
            )
        case 'terminal':
            return (
                <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
                    <rect x='8' y='12' width='48' height='40' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <polyline points='16,20 28,32 16,44' fill='none' stroke='#111111' strokeWidth='3' />
                    <line x1='32' y1='44' x2='48' y2='44' stroke='#111111' strokeWidth='3' />
                </svg>
            )
        case 'help':
            return (
                <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
                    <circle cx='32' cy='32' r='24' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <path
                        d='M24 26c0-4.4 3.6-8 8-8s8 3.6 8 8c0 3.2-1.8 5.4-4.4 6.8-2.2 1.2-3.6 2.4-3.6 5.2'
                        fill='none'
                        stroke='#111111'
                        strokeWidth='3'
                        strokeLinecap='round'
                    />
                    <circle cx='32' cy='44' r='2.5' fill='#111111' />
                </svg>
            )
        case 'folder':
        default:
            return (
                <svg viewBox='0 0 64 64' className={className} aria-hidden='true'>
                    <path d='M8 22h18l6-8h24v36H8z' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                    <rect x='8' y='22' width='48' height='28' fill='#ffffff' stroke='#111111' strokeWidth='3' />
                </svg>
            )
    }
}

export default Icon
