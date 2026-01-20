import Icon from './Icon'
import type { IconName } from '../types/window'

const DesktopIcon = ({ label, icon, onOpen }: { label: string; icon: IconName; onOpen: () => void }) => (
    <button
        type='button'
        onClick={onOpen}
        className='inline-flex w-20 flex-col items-center gap-2 border-0 bg-transparent p-0 text-[11px] leading-tight text-[inherit] font-[inherit] text-mac-ink hover:opacity-80 appearance-none'
    >
        <span className='inline-flex h-12 w-12 items-center justify-center border-2 border-mac-ink bg-white pixel'>
            <Icon name={icon} className='h-10 w-10' />
        </span>
        <span className='text-center'>{label}</span>
    </button>
)

export default DesktopIcon
