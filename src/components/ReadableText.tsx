import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type ReadableTextProps = {
    children: ReactNode
}

export default function ReadableText({ children }: ReadableTextProps) {
    const [useReadableFont, setUseReadableFont] = useState(() => {
        const stored = localStorage.getItem('useReadableFont')
        if (!stored) localStorage.setItem('useReadableFont', 'true')
        return stored === 'true'
    })

    useEffect(() => {
        localStorage.setItem('useReadableFont', String(useReadableFont))
    }, [useReadableFont])

    return (
        <div className='relative mx-2'>
            <button
                type='button'
                onClick={() => setUseReadableFont((prev) => !prev)}
                className='absolute top-0 right-0 z-10 border border-mac-ink bg-white px-2 py-0.5 text-[10px] hover:opacity-80'
                title={useReadableFont ? '기본 폰트로 변경' : '읽기 쉬운 폰트로 변경'}
            >
                {useReadableFont ? '기본 폰트 사용' : <span className='font-pretendard'>읽기 쉬운 폰트 사용</span>}
            </button>
            <div className={useReadableFont ? 'font-pretendard' : ''}>{children}</div>
        </div>
    )
}
