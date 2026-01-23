import Markdown from '../components/Markdown'
import ReadableText from '../components/ReadableText'

export default () => (
    <ReadableText>
        <div className='space-y-2 text-[12px] leading-relaxed'>
            <Markdown
                content={`
# 동아리 소개

Null4U는 세명컴퓨터고등학교 스마트보안솔루션과의 클라우드/DevOps 전공 동아리입니다.  
저희 동아리는 클라우드 인프라 구축, 자동화 도구 활용, CI/CD 파이프라인 설계 등 DevOps 핵심 역량을 중심으로 활동하고 있습니다.

---

# Markdown Test

## 소제목 1

### 소제목 2

- 리스트 아이템 1
- 리스트 아이템 2
- 리스트 아이템 3

**강조 텍스트**와 *이탤릭 텍스트*를 지원합니다.

1. 순서 있는 리스트 아이템 1
2. 순서 있는 리스트 아이템 2
3. 순서 있는 리스트 아이템 3

> 인용구 예시입니다. 긴 문장을 넣으면 어떻게 보일까요?  
> 여러 줄로 구성된 인용구도 잘 처리됩니다.

\`\`\`javascript
// 코드 블록 예시
function greet(name) {
    return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

더 많은 내용을 추가하여 동아리 소개를 풍부하게 만들 수 있습니다. \`code\`
_test_
`}
            />
        </div>
    </ReadableText>
)
