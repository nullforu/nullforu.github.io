import Icon from './Icon'
import type { WindowId } from '../types/window'

export const WINDOW_MAX_SIZE: Record<WindowId, { w: number; h: number }> = {
    system: { w: 720, h: 460 },
    about: { w: 640, h: 420 },
    curriculum: { w: 680, h: 440 },
    projects: { w: 700, h: 440 },
    join: { w: 580, h: 380 },
    contact: { w: 520, h: 320 },
    bonobono: { w: 500, h: 500 },
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

export const BonobonoContent = () => (
    <div className='space-y-2 text-[12px]'>
        <img
            src='https://i.pinimg.com/1200x/b0/df/95/b0df95cfc6f31293d002d4d6daac253c.jpg'
            alt='Bonobono Virus'
            className='mx-auto w-full text-center'
        />
        <div className='font-semibold text-center'>당신의 컴퓨터가 보노보노 바이러스에 감염되었습니다.. 유감.</div>
        <div className='border-t border-mac-ink' />
        <div>
            1. 개요[편집] 즐거운 일은 어째서 끝나버리게 될까? 헛소리하지 마 인마![7] 보노보노의 주인공. 종족은 해달.
            사는 곳은 바다가 있는 절벽가. 이름은 아빠가 지어줬다. 유래는 돌을 바다에 던졌을 때 난 소리인
            봉쨩(ぼんちゃん)에서. 작명 과정을 지켜본 멍멍이 아빠도 어이없어한 네이밍 센스다. 2. 특징[편집] 보노보노
            1986년 보노보노1993 보노보노 1995년 보노보노 극장판 보노보노 1화 방영분 1권이 발매되던 1986년 초창기 시절
            1993년 극장판 1995년 4월 20일 방영분 2002년 극장판 2016년 4월 2일 방영분 순진하고 온순한 성격에 따뜻한
            마음씨를 가진 캐릭터. 행동은 느릿느릿하고 말투도 조금 어벙하다. 보노보노 아빠도 행태가 똑같은 걸 보면 유전인
            듯. 그 느릿느릿하고 어벙한 말투가 워낙 특징적이라 전혀 특별할 것 없이 단순히 친구들을 부르는 대사인
            ’너부리야~ 포로리야~’ 만 가지고도 누가봐도 알 수 있게끔 보노보노 흉내를 낼 수 있다. 아빠에겐 보노라고 줄여서
            불리지만 더빙판에선 평범하게 불린다. 그러나 16년판에선 더빙판에서도 보노라고 부르기 시작했다. 처음엔 도통
            화내는 일이 없어서 보노보노가 화내는 일은 정말 레어한 이벤트였다. 그런데 화가 났어도 본인만 알지 주변은
            아무도 몰라서 혼자 난감해했을 정도. 당시 화났던 이유는 아기곰이 자꾸 자신의 말을 따라해서였는데, 화가 나봤자
            보노보노가 한 행동은 아기곰이 따라하지 못하게 말을 쓸데없이 길게 하는 것 정도였다. 그러나 작품이 나오면서
            보노보노도 성격이 많이 변해 고함치면서 츳코미거는 일은 예삿일이 됐다. 사실상 어리바리한 바보에서 태클 담당
            요원으로 변신하는 대단한 성장을 이루었다. 조개가 없으면 곤란해진다. 포로리는 호두없이 곤란해지지 않지만 들고
            싶어한다. 해달의 주식이 조개이기 때문이다. 해달이기 때문에 피하지방이 없어서 비상식량으로 늘 조개를 가지고
            다닌다. 손에 들고 다니는 것 이외에도 겨드랑이 밑의 가죽에 스페어를 두고 있으며[8] 없어지면 엄청 난감해한다.
            조개는 비상식 외에도 감정 표시를 할 때나 누굴 부를 때 콩콩콩 두드리면서 소리를 내는 데 쓰기도 한다. 또 바다
            수영을 잘하고 잠수도 할줄 안다. 하지만 물고기는 아직 잡을줄 몰라서 아빠가 잡아주는걸 먹는다. 해양 동물답게
            육지에선 좀 느린 편. 너부리와 포로리와 비교하면 확연히 아리가 난다. 야옹이 형을 처음 발견해 구조한 것이
            보노보노였다. 그것이 계기였는지 혼자 노는 감이 있는 야옹이 형과도 상당히 친밀한 사이로, 뺀질대고 도망치는
            야옹이 형에게 강제로 대답을 끌어내는 재주를 선보이기도 했다. 방식이 민첩하게 몸을 날려서 붙잡은 뒤 말을 돌릴
            때마다 압박의 강도를 올려나갔는 것이었데, 당시 보노보노가 이 정도로 막 대한 것은 야옹이 형이 유일했다.
            보노보노가 어떤 캐릭터였는지를 생각하면 놀라울 따름. 41권에서 어머니에 관한 이야기가 밝혀졌다.[9] 사고
            방식이 특이해서 세상 여러 가지 일에 대해서 궁금하게 여긴다. 보노보노가 문득 궁금하게 여기는 것을 친구들과
            함께 탐구하고 다니는 것이 애니메이션의 주요한 패턴. 너무 어처구니 없는 것을 궁금해하거나 느려 터지게
            행동하는 바람에 너부리에게 얻어맞는 일도 허다하다. 포로리를 쫓아오는 누나 아로리한테 같이 쫓기는 등 엉뚱한
            면도 있다. 잔걱정도 많은데 그게 다 엉뚱한 상상이라는게 문제. 단골손님은 동굴아저씨로 언제 어디서나 희한한
            이유로 동굴에 갇히는 상상을 많이 한다. 한번은 독버섯을 잘못 먹고 폭력적으로 변하기도 했는데, 그 포스는
            두려울 정도. 너부리를 한 방에 이기기도 한다. 포로리의 감기 에피소드에서 너부리가 매달린 줄이 끊어지려 하자
            줄을 잡고 혼자서 버텨내는 걸로 보아 힘 자체는 의외로 센 편이긴 한데, 아로리가 너부리를 이기기 위해
            보노보노를 훈련시킨답시고 호두를 때리게 했었는데 때리는 것조차 느렸던 걸 생각하면 평소에는 그저 맹한 상태를
            유지하는 걸지도 모른다. 혹시 보노보노의 아빠도 이런 식으로 사신 해달이 된게 아닐지. 아니면 그 폭력적인
            모습이야말로 유전의 증거? 명대사는 "헛소리 하지마 인마."[10] 당황했거나 곤란할 때는 꼭 땀을 분출한다.참고로
            이 땀 연출은 보노보노 만화의 트레이드 마크? 아무튼 땀을 분출하면서 꼭 경쾌한 뾰뾰뾰뾰옹~[11] 하는 효과음이
            삽입된다. 여담으로 MBC에서 방영 중인 황금어장 실화극장 시절 이 보노보노의 땀 연출 자막과 효과음이
            사용되었는데 역시나 멤버 한 명이 말문이 막히거나 한 방 먹을 때 많이 나왔다. 즉, 무한도전의 해골 자막 같은
            효과. 물론 이 시절만 사용되었고, 무릎팍도사와 라디오 스타로 개편된 이후 보노보노 땀 자막은 더 이상 사용하지
            않는다. 어렸을 때는 어두운 밤이 무서워서 아빠 배 위에 잤다고 했다. 비만풀을 먹고 살 찐 보노보노도 있는데
            특유의 푹신한 귀여움 때문에 나름 인기가 있다.# 연재 초반에는 통통한 외모였으나 권수가 진행되면서 상당히
            갸름해졌다. 애니 2016판도 이걸 반영해서 95년판에 비해 상당히 늘씬하다. 3. 작중 행적[편집] 원작에서는 큰
            이야기는 없으며 세계관 시간으로부터 2~3년전에 태어나자마자 어머니 라코를 잃고 보노보노 아빠랑 같이 오순도순
            지내며 살아오고 있었다. 갑자기 바다에서 떠내려온 야옹이형을 처음 발견하게 된다. 그리고 아빠랑 같이 올라올 수
            있게 도와주었고 먹을 것을 주었다고 한다. 처음에는 아무 말도 없었지만 나중에 시간이 지나면서 두 사람은
            단짝처럼 지내게 되고 후에는 고민상담 등으로 자주 야옹이형을 만나게 된다. 93년 극장판에서는 보노보노가
            길거리에서 걸어가고 있으며 포로리를 만나기 위해 포로리가 있는 나무로 간다. 그리고 둘이서 재미있게 논다.
            그리고 너부리랑 같이 만나서 큰 동물이 어디있는지 알아내기 위해 찾아다닌다. 아버지랑 같이 어느 곳으로 여행을
            하기도 한다. 95년판에선 동굴아저씨에게 잡히는 장면이 무려 10번 이상이나 된다. 4. 조별과제 밈[편집] 상세 내용
            아이콘 자세한 내용은 좆같은 보노보노 문서를 참고하십시오. 5. 기타[편집] external/imgdata... 월드 오브
            탱크에서 등장하는 AMX-40 기병전차는 특유의 형상과 프랑스 전차의 특징인 파란색 도색으로 인해 한국에서
            보노보노라는 별명이 붙었다.# 심지어 자작 보노보노 스킨도 있다.# 영어권에서는 오리라는 별명으로 불린다. 이는
            월탱 공식 유튜브에서 미운 오리 새끼를 패러디한 영상이 올라왔을 정도로 준공식으로 인정받고 있다.#
        </div>
    </div>
)
