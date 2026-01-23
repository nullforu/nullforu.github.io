import Icon from '../components/Icon'
import type { WindowId } from '../types/window'

export default ({ onOpen }: { onOpen: (id: WindowId) => void }) => (
    <div className='grid grid-cols-3 gap-4 text-center text-[11px]'>
        <button
            type='button'
            onClick={() => onOpen('about')}
            className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
        >
            <Icon name='folder' className='mx-auto h-12 w-12' />
            <div>동아리 소개</div>
        </button>
        <button
            type='button'
            onClick={() => onOpen('curriculum')}
            className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
        >
            <Icon name='server' className='mx-auto h-12 w-12' />
            <div>커리큘럼</div>
        </button>
        <button
            type='button'
            onClick={() => onOpen('projects')}
            className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
        >
            <Icon name='folder' className='mx-auto h-12 w-12' />
            <div>프로젝트</div>
        </button>
        <button
            type='button'
            onClick={() => onOpen('join')}
            className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
        >
            <Icon name='doc' className='mx-auto h-12 w-12' />
            <div>모집 안내</div>
        </button>
        <button
            type='button'
            onClick={() => onOpen('contact')}
            className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
        >
            <Icon name='chat' className='mx-auto h-12 w-12' />
            <div>연락처</div>
        </button>
        <button
            type='button'
            onClick={() => onOpen('board')}
            className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
        >
            <Icon name='chat' className='mx-auto h-12 w-12' />
            <div>익명 게시판</div>
        </button>
        <button
            type='button'
            onClick={() => onOpen('terminal')}
            className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
        >
            <Icon name='terminal' className='mx-auto h-12 w-12' />
            <div>Terminal</div>
        </button>
        <button
            type='button'
            onClick={() => onOpen('bonobono')}
            className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
        >
            <Icon name='doc' className='mx-auto h-12 w-12' />
            <div>보노보노 바이러스</div>
        </button>
    </div>
)
