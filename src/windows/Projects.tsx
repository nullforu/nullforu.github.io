import Markdown from '../components/Markdown'
import ReadableText from '../components/ReadableText'

export default () => (
    <ReadableText>
        <div className='text-[12px] leading-relaxed break-keep'>
            <Markdown
                content={`# 프로젝트 목록

기본적으로 전공동아리 자체가 개인 프로젝트나 공부를 위주로 이루어지기 때문에, 동아리 차원에서 진행하는 공식적인 프로젝트는 많지 않습니다.

다만 동아리별로 팀 프로젝트를 진행하는 경우가 몇가지 있는데, Null4U에서는 다음과 같은 동아리 단위의 프로젝트를 진행하고 유지보수하고 있습니다. 
(추후 새롭게 계획될 수 있습니다.)

- **세소리(Sesori)** - 세명컴퓨터고등학교 학생들을 위한 커뮤니티 사이트 및 익명 게시판 ([sesori.org](https://sesori.org))
- **보안과 포탈** - 세명컴퓨터고등학교 스마트보안솔루션과 포탈 사이트 ([smc-secu.net](https://smc-secu.net))
- **Null4U 홈페이지** - Null4U 동아리 공식 홈페이지 (계획)

이 외에도 각 동아리원들이 개인적으로 진행하는 프로젝트를 Null4U 단위로 전환하거나 지원을 받아 협업할 수 있습니다. 
물론 메인테인은 해당 동아리원이 담당하게 되겠습니다.

# 대회 참여

또한 Null4U의 정기적인 목표 중 하나는 지방기능경기대회 또는 전국기능경기대회의 클라우드 종목에 출전하여 좋은 성적을 거두는 것입니다.

이를 위해 외부 전문가 특강이나 멘토링을 진행하기도 하며, 좋은 실적을 거두기 위해 동아리 차원에서 지원하여 노력하고 있습니다.
이에 대한 자세한 내용은 추후 따로 안내드리도록 하겠습니다.
`}
            />
        </div>
    </ReadableText>
)
