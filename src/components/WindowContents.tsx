import Icon from './Icon'
import type { WindowId } from '../types/window'

export const WINDOW_MAX_SIZE: Record<WindowId, { w: number; h: number }> = {
    system: { w: 720, h: 460 },
    about: { w: 640, h: 420 },
    curriculum: { w: 680, h: 440 },
    projects: { w: 700, h: 440 },
    join: { w: 580, h: 380 },
    contact: { w: 520, h: 320 },
}

export const SystemDiskContent = ({ onOpen }: { onOpen: (id: WindowId) => void }) => (
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
    </div>
)

export const AboutContent = () => (
    <div className='space-y-2 text-[12px] leading-relaxed'>
        <p>Null4U는 세명컴퓨터고등학교 스마트보안솔루션과의 클라우드/DevOps 전공 동아리입니다.</p>
        <div className='border-t border-mac-ink' />
        {/* <div className='grid gap-1'>
            <div>활동 키워드: IaC · CI/CD · 컨테이너 · 모니터링</div>
            <div>멘토링: 전공 선배 및 산업체 멘토 정기 세션</div>
            <div>핵심 목표: 실전형 DevOps 포트폴리오</div>
        </div> */}
        {Array.from({ length: 50 }).map((_, index) => (
            <p key={index}>널퐁유 대충 긴 글 ㅇㅇㅇ</p>
        ))}
    </div>
)

export const CurriculumContent = () => (
    <div className='space-y-2 text-[12px]'>
        <div className='font-semibold'>학기 커리큘럼</div>
        <div className='border-t border-mac-ink' />
        <ul className='space-y-1'>
            <li>1. 클라우드 기초: 네트워크, 리눅스, 가상화</li>
            <li>2. 컨테이너 실습: Docker, Kubernetes 실습</li>
            <li>3. 자동화 파이프라인: GitHub Actions, Argo CD</li>
            <li>4. 관측성: 로그/메트릭/트레이싱 대시보드 구축</li>
            <li>5. 서비스 운영: 장애 대응, 비용 최적화 워크숍</li>
        </ul>
    </div>
)

export const ProjectsContent = () => (
    <div className='space-y-2 text-[12px]'>
        <div className='font-semibold'>대표 프로젝트</div>
        <div className='border-t border-mac-ink' />
        <ul className='space-y-1'>
            <li>학교 행사 예약 시스템: IaC 기반 배포 자동화</li>
            <li>스마트 출결 알림봇: Slack/Webhook 자동화</li>
            <li>교내 공공 API: 서버리스 기반 데이터 제공</li>
            <li>경진대회 출전: 보안/클라우드 분야 수상 경험</li>
        </ul>
    </div>
)

export const JoinContent = () => (
    <div className='space-y-2 text-[12px]'>
        <div className='font-semibold'>모집 안내</div>
        <div className='border-t border-mac-ink' />
        <div className='space-y-1'>
            <div>대상: 1~3학년 전공 트랙 희망자</div>
            <div>활동 시간: 주 2회 방과후 + 프로젝트 스프린트</div>
            <div>준비물: 노트북, 꾸준함, 협업 의지</div>
            <div>지원 방법: 지도교사 상담 후 지원서 제출</div>
        </div>
    </div>
)

export const ContactContent = () => (
    <div className='space-y-2 text-[12px]'>
        <div className='font-semibold'>연락처</div>
        <div className='border-t border-mac-ink' />
        <div className='space-y-1'>
            <div>담당 교사: 정보보안/클라우드 연구실</div>
            <div>오픈채팅: Null4U DevOps (학교 계정 확인)</div>
            <div>문의: null4u@smc.hs.kr</div>
        </div>
    </div>
)
