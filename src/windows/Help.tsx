import Markdown from '../components/Markdown'
import ReadableText from '../components/ReadableText'

export default () => (
    <ReadableText>
        <div className='space-y-2 text-[12px] leading-relaxed'>
            <Markdown
                content={`
테스트
`}
            />
        </div>
    </ReadableText>
)
