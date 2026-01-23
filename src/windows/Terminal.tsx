import { useState, useRef, useEffect } from 'react'

interface Command {
    output: string
    clear?: boolean
}

const COMMANDS: Record<string, (args: string) => Command> = {
    help: () => ({
        output: `Available commands:
  help        - Show this help message
  whoami      - Display current user
  echo        - Echo the input text
  clear       - Clear the terminal screen`,
    }),
    whoami: () => ({
        output: 'null4u',
    }),
    date: () => ({
        output: new Date().toString(),
    }),
    echo: (args: string) => ({
        output: args,
    }),
    clear: () => ({
        output: '',
        clear: true,
    }),
}

type HistoryEntry = {
    command: string
    output: string
}

export default () => {
    const [history, setHistory] = useState<HistoryEntry[]>([])
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) {
            setHistory((prev) => [...prev, { command: '', output: '' }])
            setInput('')
            return
        }

        const [cmd, ...args] = input.trim().split(' ')
        const command = cmd.toLowerCase()
        const commandFunc = COMMANDS[command as keyof typeof COMMANDS]

        if (commandFunc) {
            const result = commandFunc(args.join(' '))
            if (result.clear) {
                setHistory([])
            } else {
                setHistory((prev) => [...prev, { command: input, output: result.output }])
            }
        } else {
            setHistory((prev) => [
                ...prev,
                {
                    command: input,
                    output: `bash: ${command}: command not found\nType 'help' for available commands.`,
                },
            ])
        }

        setInput('')
    }

    const handleClick = () => {
        inputRef.current?.focus()
    }

    return (
        <div className='space-y-2 text-[12px] cursor-text' onClick={handleClick}>
            {history.map((entry, index) => (
                <div key={index}>
                    {entry.command && (
                        <div className='flex gap-1'>
                            <span className='font-semibold'>null4u@terminal</span>
                            <span>%</span>
                            <span>{entry.command}</span>
                        </div>
                    )}
                    {entry.output && <pre className='whitespace-pre-wrap'>{entry.output}</pre>}
                </div>
            ))}
            <form onSubmit={handleSubmit} className='flex gap-1'>
                <span className='font-semibold'>null4u@terminal</span>
                <span>%</span>
                <input
                    ref={inputRef}
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='flex-1 bg-transparent outline-none caret-mac-ink'
                    autoFocus
                    spellCheck={false}
                />
            </form>
            <div ref={bottomRef} />
        </div>
    )
}
