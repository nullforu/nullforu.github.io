import Markdown from '../components/Markdown'
import ReadableText from '../components/ReadableText'

export default () => (
    <ReadableText>
        <div className='space-y-2 text-[12px] leading-relaxed'>
            <Markdown
                content={`# 도움말
> 본 도움말은 PC 기준으로 작성되었습니다. 모바일에서는 일부 기능이 다를 수 있습니다.

# 구성 요소

![ss_1_main](/images/ss_1_main.png)

사이트에 방문하시면 위와 같은 화면이 보이게 됩니다. 소개할 구성 요소는 다음과 같습니다.

- **상단 메뉴 바**
- **윈도우**
- **아이콘**
- **익명 게시판**
- **폰트 변경**

# 상단 메뉴 바

File 메뉴는 윈도우(창) 위치 초기화나 모든 창 닫기 기능을 제공합니다. 

![ss_2_menu](/images/ss_2_menu.png)

View 메뉴는 여러 윈도우로 바로가기 기능을 제공합니다.

![ss_3_menu](/images/ss_3_menu.png)

마지막으로 Options 메뉴는 효과음 ON/OFF 설정 등과 같은 사이트 설정을 제공합니다.

![ss_4_menu](/images/ss_4_menu.png)

# 윈도우

윈도우(창)는 상단의 \`===\`로 표시된 부분을 드래그하여 이동할 수 있습니다. 또한 좌측 상단의 \`▢\` 버튼을 클릭하여 창을 닫을 수 있습니다.

![ss_5_window](/images/ss_5_window.png)

그리고 우측 하단의 \`▨\`을 드래그하여 창 크기를 조절할 수 있습니다.

![ss_5_2_window](/images/ss_5_2_window.png)

# 아이콘

바탕화면(데스크탑)의 아이콘을 클릭하거나 System Disk 윈도우에서 각 아이콘을 클릭하여 윈도우를 열 수 있습니다.

![ss_6_icon](/images/ss_6_icon.png)

# 익명 게시판

익명 게시판은 \`익명 게시판\` 아이콘을 클릭하여 열 수 있습니다. 익명 게시판 내에 특정 게시글을 클릭하여 게시글 내용을 확인하실 수 있습니다.

![ss_7_board](/images/ss_7_board.png)

좌측 상단의 \`글 쓰기\` 버튼을 클릭하여 게시글을 작성하실 수 있습니다.

![ss_8_board](/images/ss_8_board.png)

게시글은 익명으로 작성되며, 작성 시 유저 이름과 비밀번호를 입력하셔야 합니다.
익명 게시판은 자유롭게 이용하실 수 있으나, 타인에게 불쾌감을 주는 글이나 부적절한 글은 관리자에 의해 삭제될 수 있습니다.

# 폰트 변경

특정 윈도우(소개, 모집안내, 도움말 등)에서는 우측 상단의 \`기본 폰트 사용\` 또는 \`읽기 쉬운 폰트 사용\` 버튼을 눌러 폰트를 변경할 수 있습니다.

기본적으로는 가독성을 위해 읽기 쉬운 폰트가 적용되지만, 컨셉에 맞게 기본 폰트를 사용하고 싶으신 분들은 해당 버튼을 눌러 변경하실 수 있습니다.

![ss_9_font](/images/ss_9_font.png)
![ss_10_font](/images/ss_10_font.png)
`}
            />
        </div>
    </ReadableText>
)
