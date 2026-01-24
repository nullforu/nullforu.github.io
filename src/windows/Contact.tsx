import Markdown from '../components/Markdown'
import ReadableText from '../components/ReadableText'

export default () => (
    <ReadableText>
        <div className='text-[12px] leading-relaxed break-keep'>
            <Markdown
                content={`# 문의 및 연락처

기존의 모든 동아리 부원에게 직접 연락하실 수도 있고, 담당 선생님이나 보안과 선생님께 문의를 하실 수도 있습니다.

본 안내를 작성하는 시점이 2026년 1월, 즉 겨울방학이기 때문에 개학 이후 담당 선생님이나 부원이 변경될 수 있으니 참고하시길 바랍니다.

- 동아리 부장: 3학년 김준영 [[홈페이지]](https://swua.kr) / [[Github]](https://github.com/yulmwu) / [[Discord @rlawnsdud]](https://discord.com/users/615383266412724246) / [[이메일]](mailto:normal8781@gmail.com) / [[LinkedIn]](https://www.linkedin.com/in/yulmwu/)
- 동아리 깃허브: [nullforu](https://github.com/nullforu)
- 보안과 포털: [smc-secu.net](https://smc-secu.net)에서 자유 게시판 등 활용

전공이나 진로, 기술 전망 등과 관련된 질문이 있으셔도 좋고, 동아리 활동과 관련된 질문이 있으셔도 좋습니다. 편하게 연락 주세요!
`}
            />
        </div>
    </ReadableText>
)
