export default () => (
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
