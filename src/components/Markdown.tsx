import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CollapsibleBlockquote = ({ children }: { children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [shouldCollapse, setShouldCollapse] = useState(false)
    const [hiddenLines, setHiddenLines] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current) {
            const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight)
            const height = contentRef.current.scrollHeight
            const lines = Math.round(height / lineHeight)

            if (lines > 10) {
                setShouldCollapse(true)
                setHiddenLines(lines - 10)
            }
        }
    }, [children])

    return (
        <blockquote className='border-l-2 border-mac-ink pl-2 italic mb-2 relative'>
            <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 ${
                    shouldCollapse && !isExpanded ? 'max-h-[12em]' : 'max-h-none'
                } ${shouldCollapse && !isExpanded ? 'blur-effect' : ''}`}
            >
                {children}
            </div>
            {shouldCollapse && !isExpanded && (
                <div
                    className='absolute bottom-0 left-0 right-0 h-16 pointer-events-none'
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%)',
                    }}
                />
            )}
            {shouldCollapse && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className='mt-1 text-[11px] underline hover:opacity-80 font-semibold relative z-10 cursor-pointer'
                >
                    {isExpanded ? '접기' : `(${hiddenLines}줄 더 보기)`}
                </button>
            )}
        </blockquote>
    )
}

export default function Markdown({ content }: { content: string }) {
    return (
        <ReactMarkdown
            components={{
                h1: ({ children }) => (
                    <h1 className='text-[16px] font-semibold mb-2 mt-3 pb-1 border-b-2 border-mac-ink'>{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className='text-[14px] font-semibold mb-2 mt-3 pb-1 border-b border-mac-ink'>{children}</h2>
                ),
                h3: ({ children }) => <h3 className='text-[13px] font-semibold mt-2 mb-1'>{children}</h3>,
                h4: ({ children }) => <h4 className='text-[12px] font-semibold mt-2 mb-1'>{children}</h4>,
                h5: ({ children }) => <h5 className='text-[12px] font-semibold mt-2 mb-1'>{children}</h5>,
                h6: ({ children }) => <h6 className='text-[11px] font-semibold mt-1 mb-1'>{children}</h6>,
                p: ({ children }) => <p className='text-[12px] mb-2 break-words'>{children}</p>,
                ul: ({ children }) => <ul className='list-disc list-inside mb-2 pl-1 space-y-1'>{children}</ul>,
                ol: ({ children }) => <ol className='list-decimal list-inside mb-2 space-y-1'>{children}</ol>,
                strong: ({ children }) => <strong className='font-semibold'>{children}</strong>,
                em: ({ children }) => <em className='italic'>{children}</em>,
                code: ({ className, children }) => {
                    const match = /language-(\w+)/.exec(className || '')
                    const language = match ? match[1] : ''
                    const codeString = String(children).replace(/\n$/, '')

                    if (language) {
                        return (
                            <SyntaxHighlighter
                                language={language}
                                style={coldarkCold}
                                customStyle={{
                                    margin: 0,
                                    padding: '8px',
                                    fontSize: '11px',
                                    border: '1px solid #111111',
                                    backgroundColor: '#f7f7f7',
                                    fontFamily: "'ChicagoFLF', 'DungGeunMo', 'Geneva', 'Lucida Console', monospace",
                                }}
                                PreTag='div'
                            >
                                {codeString}
                            </SyntaxHighlighter>
                        )
                    }
                    return (
                        <code className='bg-mac-ui border border-mac-ink px-1 text-[11px] font-mono'>{children}</code>
                    )
                },
                pre: ({ children }) => <div className='mb-2'>{children}</div>,
                hr: () => <hr className='border-t border-mac-ink my-2' />,
                img: ({ src, alt }) => (
                    <a href={String(src)} target='_blank' rel='noopener noreferrer' className='block mb-2'>
                        <img
                            src={src}
                            alt={alt}
                            className='max-w-full h-auto mb-2 mt-2 border border-mac-ink'
                            loading='lazy'
                        />
                    </a>
                ),
                a: ({ href, children }) => (
                    <a href={href} className='underline hover:opacity-80' target='_blank' rel='noopener noreferrer'>
                        {children}
                    </a>
                ),
                blockquote: ({ children }) => <CollapsibleBlockquote>{children}</CollapsibleBlockquote>,
            }}
        >
            {content}
        </ReactMarkdown>
    )
}
