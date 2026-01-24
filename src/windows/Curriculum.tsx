import Markdown from '../components/Markdown'
import ReadableText from '../components/ReadableText'

export default () => (
    <ReadableText>
        <div className='text-[12px] leading-relaxed break-keep'>
            <Markdown
                content={`# 개요

기본적으로 Null4U는 강제되는 커리큘럼이 없습니다만, 동아리원들이 스스로 학습할 수 있도록 다양한 학습 자료와 커리큘럼을 제공하기 위해 노력하고 있습니다.

학습 방향을 잡기 어려우신 분들은 아래의 커리큘럼을 참고하셔서 스스로 학습해보시길 추천드립니다.

# 커리큘럼

Null4U의 커리큘럼은 사실상 **DevOps** 로드맵을 따라간다고 생각하시면 됩니다. ([roadmap.sh](https://roadmap.sh/devops) 참고)

- **개발 지식** - 프로그래밍 언어, 백엔드/프론트엔드 웹 개발, 버전 관리(Git) 등
- **서버/운영체제 운영** - 리눅스 서버 운영, 네트워크 기초, VM 및 컨테이너 기초 등
- [**클라우드 컴퓨팅**](https://roadmap.sh/aws) - AWS, GCP 등의 클라우드 서비스 활용 및 운영, IaC 및 매니지드 서비스 활용 등
- **컨테이너 오케스트레이션** - Docker, Kubernetes 등의 도구 활용
- **CI/CD** - Jenkins, GitHub Actions 등의 CI/CD 도구 활용
- **옵저버빌리티, 모니터링 및 로깅** - Prometheus, Grafana, ELK 스택 등의 도구 활용
- **인프라 운영 자동화** - GitOps, Ansible, Terraform 등의 도구 활용

이후 심화 과정으로는 다음과 같은 분야들을 다룰 수 있습니다. (선택 사항)

- **보안(DevSecOps)** - 네트워크 보안, 웹 보안, 시스템 보안 등
- **데이터 엔지니어링** - 빅데이터 처리, 데이터 파이프라인 구축 등
- **아키텍처 설계** - MSA, EDA, 서버리스 등
- **비용 최적화** - 클라우드 비용 관리 및 최적화 전략 등

물론 위 커리큘럼은 추상적인 가이드라인이고, 실제로는 각 동아리원들의 관심사와 목표에 따라 학습 방향이 달라질 수 있습니다. 개발만 집중하거나 보안에 더 중점을 둘 수도 있지요. 선택은 여러분의 몫입니다.

# 학습 자료

학습 자료는 동아리원 모집이 끝난 뒤 정리하여 따로 공유드릴 예정입니다. 추후 [nullforu/docs](https://github.com/nullforu/docs) 레포지토리에서 확인하실 수 있습니다.
`}
            />{' '}
        </div>
    </ReadableText>
)
