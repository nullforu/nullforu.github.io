import Icon from '../components/Icon'
import type { WindowId } from '../types/window'

export default ({ onOpen }: { onOpen: (id: WindowId) => void }) => (
    <div className='text-center break-keep'>
        <h1 className='mb-4 text-lg font-bold'>안녕하세요, Null4U가 처음이신가요?</h1>
        <p className='mb-4'>아래의 항목을 통해 Null4U에 대해 알아보실 수 있습니다.</p>
        <p className='mb-4 mx-10'>
            사이트 이용에 도움이 필요하시면 아래의 <span className='bg-yellow-200'>도움말</span>을 참고해보세요!
        </p>
        <p className='mb-1 mx-10'>
            <span className='bg-yellow-200'>동아리 소개</span>에서 저희 동아리에 대한 정보를 확인해보실 수
            있으며,
        </p>
        <p className='mb-4 mx-10'>
            궁금한 점이 있다면 언제든지 <span className='bg-yellow-200'>연락처</span>를 통해 문의해주세요!
        </p>
        <div className='mt-6 grid text-[11px] grid-cols-3 gap-3 sm:grid-cols-4'>
            <button
                type='button'
                onClick={() => onOpen('help')}
                className='flex flex-col items-center gap-1 border-0 bg-transparent p-0 text-[inherit] font-[inherit] hover:opacity-80 appearance-none'
            >
                <Icon name='help' className='mx-auto h-12 w-12' />
                <div>도움말</div>
            </button>
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
    </div>
)
