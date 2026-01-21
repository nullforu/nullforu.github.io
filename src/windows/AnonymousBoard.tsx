import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type PostSummary = {
    id: string
    title: string
    createdAt: string
    updatedAt: string
    anonymousName: string
}

type PostDetail = PostSummary & {
    content: string
}

type PostPayload = {
    title: string
    content: string
    anonymousName: string
    password: string
}

type ViewMode = 'list' | 'create' | 'edit' | 'delete'

const PAGE_LIMIT = 6

const API_BASE_URL = 'https://4qg2ohp21j.execute-api.ap-northeast-2.amazonaws.com'

const buildApiUrl = (path: string) => {
    const base = API_BASE_URL
        ? API_BASE_URL.endsWith('/')
            ? API_BASE_URL
            : `${API_BASE_URL}/`
        : `${window.location.origin}/`
    return new URL(path.replace(/^\//, ''), base)
}

const formatDate = (value: string) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

const useLatest = <T,>(value: T) => {
    const ref = useRef(value)
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref
}

const requestJson = async <T,>(
    path: string,
    signal: AbortSignal,
    options: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
        params?: Record<string, string | null>
        body?: unknown
    } = {},
) => {
    const url = buildApiUrl(path)
    if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => {
            if (value) url.searchParams.set(key, value)
        })
    }
    const response = await fetch(url.toString(), {
        signal,
        method: options.method ?? 'GET',
        headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
        body: options.body ? JSON.stringify(options.body) : undefined,
    })
    const contentType = response.headers.get('content-type') ?? ''
    const parseBody = async () => {
        if (contentType.includes('application/json')) {
            try {
                return await response.json()
            } catch {
                return null
            }
        }
        try {
            return await response.text()
        } catch {
            return null
        }
    }

    if (!response.ok) {
        const errorBody = await parseBody()
        const message =
            typeof errorBody === 'string'
                ? errorBody
                : errorBody && typeof errorBody === 'object' && 'message' in errorBody
                  ? String((errorBody as { message?: string }).message ?? `요청 실패 (${response.status})`)
                  : `요청 실패 (${response.status})`
        throw new Error(message)
    }

    const data = (await parseBody()) as T | null
    if (data && typeof data === 'object' && 'ok' in data && data.ok === false) {
        const message = 'message' in data ? String((data as { message?: string }).message ?? '요청 실패') : '요청 실패'
        throw new Error(message)
    }
    return data as T
}

const AnonymousBoard = () => {
    const [posts, setPosts] = useState<PostSummary[]>([])
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [listLoading, setListLoading] = useState(false)
    const [listError, setListError] = useState<string | null>(null)
    const [refreshCooldown, setRefreshCooldown] = useState(0)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [selected, setSelected] = useState<PostDetail | null>(null)
    const [detailLoading, setDetailLoading] = useState(false)
    const [detailError, setDetailError] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>('list')
    const [createForm, setCreateForm] = useState<PostPayload>({
        title: '',
        content: '',
        anonymousName: '',
        password: '',
    })
    const [createLoading, setCreateLoading] = useState(false)
    const [createError, setCreateError] = useState<string | null>(null)
    const [modePassword, setModePassword] = useState('')
    const [modeError, setModeError] = useState<string | null>(null)
    const [modeLoading, setModeLoading] = useState(false)
    const [editForm, setEditForm] = useState<Omit<PostPayload, 'password'>>({
        title: '',
        content: '',
        anonymousName: '',
    })
    const listAbortRef = useRef<AbortController | null>(null)
    const detailAbortRef = useRef<AbortController | null>(null)
    const didInitialFetchRef = useRef(false)
    const listLoadingRef = useLatest(listLoading)
    const nextTokenRef = useLatest(nextToken)
    const selectedIdRef = useLatest(selectedId)

    const resetModeState = () => {
        setModePassword('')
        setModeError(null)
        setModeLoading(false)
    }

    const switchMode = (mode: ViewMode) => {
        setViewMode(mode)
        resetModeState()
        if (mode === 'create') {
            setCreateError(null)
        }
    }

    const clearSelection = () => {
        setSelected(null)
        setSelectedId(null)
        setDetailError(null)
        setDetailLoading(false)
    }

    const loadPosts = useCallback(async ({ reset }: { reset?: boolean } = {}) => {
        if (listLoadingRef.current && !reset) return
        listAbortRef.current?.abort()
        const controller = new AbortController()
        listAbortRef.current = controller
        setListLoading(true)
        setListError(null)
        const token = reset ? null : nextTokenRef.current
        try {
            if (reset) {
                setRefreshCooldown(3)
            }
            const data = await requestJson<{
                ok: boolean
                items: PostSummary[]
                nextToken: string | null
            }>('/posts', controller.signal, {
                params: {
                    limit: String(PAGE_LIMIT),
                    nextToken: token,
                },
            })
            if (!data.ok) {
                throw new Error('응답 상태가 올바르지 않습니다.')
            }
            setPosts((prev) => (reset ? data.items : [...prev, ...data.items]))
            setNextToken(data.nextToken ?? null)
            if (reset) {
                clearSelection()
            }
        } catch (error) {
            if (controller.signal.aborted) return
            setListError(error instanceof Error ? error.message : '게시글을 불러오지 못했습니다.')
        } finally {
            if (!controller.signal.aborted) {
                setListLoading(false)
            }
        }
    }, [])

    const openPost = useCallback(async (id: string) => {
        if (selectedIdRef.current === id) {
            detailAbortRef.current?.abort()
            clearSelection()
            return
        }
        detailAbortRef.current?.abort()
        const controller = new AbortController()
        detailAbortRef.current = controller
        setSelectedId(id)
        setSelected(null)
        setDetailLoading(true)
        setDetailError(null)
        try {
            const data = await requestJson<{ ok: boolean; item: PostDetail }>(`/posts/${id}`, controller.signal)
            if (!data.ok) {
                throw new Error('응답 상태가 올바르지 않습니다.')
            }
            setSelected(data.item)
        } catch (error) {
            if (controller.signal.aborted) return
            setDetailError(error instanceof Error ? error.message : '게시글을 불러오지 못했습니다.')
        } finally {
            if (!controller.signal.aborted) {
                setDetailLoading(false)
            }
        }
    }, [])

    const validatePostForm = (payload: PostPayload) => {
        if (
            !payload.title.trim() ||
            !payload.content.trim() ||
            !payload.anonymousName.trim() ||
            !payload.password.trim()
        ) {
            return '모든 항목을 입력해주세요.'
        }
        return null
    }

    const handleCreateSubmit = async () => {
        if (createLoading) return
        const message = validatePostForm(createForm)
        if (message) {
            setCreateError(message)
            return
        }
        setCreateLoading(true)
        setCreateError(null)
        const controller = new AbortController()
        try {
            const data = await requestJson<{ ok: boolean; id: string; createdAt: string }>(
                '/posts',
                controller.signal,
                {
                    method: 'POST',
                    body: createForm,
                },
            )
            if (!data.ok) {
                throw new Error('응답 상태가 올바르지 않습니다.')
            }
            setCreateForm({ title: '', content: '', anonymousName: '', password: '' })
            await loadPosts({ reset: true })
            switchMode('list')
        } catch (error) {
            setCreateError(error instanceof Error ? error.message : '게시글을 등록하지 못했습니다.')
        } finally {
            setCreateLoading(false)
        }
    }

    const openCreateMode = () => switchMode('create')

    const openEditMode = () => {
        if (!selectedId || !selected) return
        setEditForm({
            title: selected.title,
            content: selected.content,
            anonymousName: selected.anonymousName,
        })
        switchMode('edit')
    }

    const openDeleteMode = () => {
        if (!selectedId) return
        switchMode('delete')
    }

    const handleEditSubmit = async () => {
        if (!selectedId || viewMode !== 'edit' || modeLoading) return
        if (!modePassword.trim()) {
            setModeError('비밀번호를 입력해주세요.')
            return
        }
        if (!editForm.title.trim() || !editForm.content.trim() || !editForm.anonymousName.trim()) {
            setModeError('모든 항목을 입력해주세요.')
            return
        }
        setModeLoading(true)
        setModeError(null)
        const controller = new AbortController()
        try {
            const payload: PostPayload = {
                ...editForm,
                password: modePassword,
            }
            const data = await requestJson<{ ok: boolean; id: string; updatedAt: string }>(
                `/posts/${selectedId}`,
                controller.signal,
                {
                    method: 'PUT',
                    body: payload,
                },
            )
            if (!data.ok) {
                throw new Error('응답 상태가 올바르지 않습니다.')
            }
            setPosts((prev) =>
                prev.map((post) =>
                    post.id === selectedId
                        ? {
                              ...post,
                              title: editForm.title,
                              anonymousName: editForm.anonymousName,
                              updatedAt: data.updatedAt,
                          }
                        : post,
                ),
            )
            setSelected((prev) =>
                prev && prev.id === selectedId
                    ? {
                          ...prev,
                          title: editForm.title,
                          content: editForm.content,
                          anonymousName: editForm.anonymousName,
                          updatedAt: data.updatedAt,
                      }
                    : prev,
            )
            switchMode('list')
        } catch (error) {
            setModeError(error instanceof Error ? error.message : '게시글을 수정하지 못했습니다.')
        } finally {
            setModeLoading(false)
        }
    }

    const handleDeleteSubmit = async () => {
        if (!selectedId || viewMode !== 'delete' || modeLoading) return
        if (!modePassword.trim()) {
            setModeError('비밀번호를 입력해주세요.')
            return
        }
        setModeLoading(true)
        setModeError(null)
        const controller = new AbortController()
        try {
            const data = await requestJson<{ ok: boolean; id: string }>(`/posts/${selectedId}`, controller.signal, {
                method: 'DELETE',
                body: { password: modePassword },
            })
            if (!data.ok) {
                throw new Error('응답 상태가 올바르지 않습니다.')
            }
            setPosts((prev) => prev.filter((post) => post.id !== selectedId))
            clearSelection()
            switchMode('list')
        } catch (error) {
            setModeError(error instanceof Error ? error.message : '게시글을 삭제하지 못했습니다.')
        } finally {
            setModeLoading(false)
        }
    }

    useEffect(() => {
        if (didInitialFetchRef.current) return
        didInitialFetchRef.current = true
        void loadPosts({ reset: true })
        return () => {
            detailAbortRef.current?.abort()
        }
    }, [loadPosts])

    useEffect(() => {
        if (refreshCooldown <= 0) return
        const id = window.setTimeout(() => {
            setRefreshCooldown((prev) => Math.max(0, prev - 1))
        }, 1000)
        return () => window.clearTimeout(id)
    }, [refreshCooldown])

    const selectedSummary = useMemo(() => {
        if (!selectedId) return null
        return posts.find((post) => post.id === selectedId) ?? null
    }, [posts, selectedId])

    const hasMore = Boolean(nextToken)
    const showList = viewMode === 'list'

    return (
        <div className='space-y-3 text-[12px]'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='font-semibold'>익명 게시판</div>
                <div className='flex items-center gap-2'>
                    {showList ? (
                        <>
                            <button
                                type='button'
                                className='border border-mac-ink bg-white px-2 py-1 text-[11px] hover:opacity-80'
                                onClick={() => loadPosts({ reset: true })}
                                disabled={listLoading || refreshCooldown > 0}
                            >
                                새로고침{refreshCooldown > 0 ? ` (${refreshCooldown}s)` : ''}
                            </button>
                            <button
                                type='button'
                                className='border border-mac-ink bg-white px-2 py-1 text-[11px] hover:opacity-80'
                                onClick={openCreateMode}
                            >
                                글 쓰기
                            </button>
                        </>
                    ) : (
                        <button
                            type='button'
                            className='border border-mac-ink bg-white px-2 py-1 text-[11px] hover:opacity-80'
                            onClick={() => switchMode('list')}
                        >
                            목록으로
                        </button>
                    )}
                </div>
            </div>
            {showList ? (
                <>
                    <div className='border-t border-mac-ink' />
                    {listError ? <div className='border border-mac-ink bg-mac-paper px-2 py-1'>{listError}</div> : null}
                    <div className='space-y-2'>
                        {posts.length === 0 && !listLoading ? (
                            <div className='border border-mac-ink bg-mac-paper px-2 py-2 text-center'>
                                게시글이 없습니다.
                            </div>
                        ) : null}
                        <ul className='space-y-2'>
                            {posts.map((post) => {
                                const isSelected = selectedId === post.id
                                const showDetail = isSelected && (detailLoading || selected || detailError)
                                return (
                                    <li key={post.id} className='border border-mac-ink bg-mac-paper px-2 py-2'>
                                        <button
                                            type='button'
                                            className='w-full text-left hover:opacity-80'
                                            onClick={() => openPost(post.id)}
                                        >
                                            <div className='font-semibold'>{post.title}</div>
                                            <div className='mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-mac-ink/70'>
                                                <span>{post.anonymousName}</span>
                                                <span>{formatDate(post.createdAt)}</span>
                                                {isSelected ? <span className='font-semibold'>선택됨</span> : null}
                                            </div>
                                        </button>
                                        {showDetail ? (
                                            <div className='mt-2 border-t border-mac-ink pt-2 text-[11px]'>
                                                {detailError ? (
                                                    <div className='border border-mac-ink bg-mac-paper px-2 py-1'>
                                                        {detailError}
                                                    </div>
                                                ) : null}
                                                {detailLoading ? (
                                                    <div className='border border-mac-ink bg-white px-3 py-2'>
                                                        내용을 불러오는 중...
                                                    </div>
                                                ) : selected ? (
                                                    <div className='border border-mac-ink bg-white px-3 py-2'>
                                                        <div className='text-[13px] font-semibold'>
                                                            {selected.title}
                                                        </div>
                                                        <div className='mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-mac-ink/70'>
                                                            <span>{selected.anonymousName}</span>
                                                            <span>{formatDate(selected.createdAt)}</span>
                                                            {selectedSummary?.updatedAt &&
                                                            selectedSummary.updatedAt !== selectedSummary.createdAt ? (
                                                                <span>수정됨</span>
                                                            ) : null}
                                                        </div>
                                                        <p className='mt-2 whitespace-pre-wrap text-[11px]'>
                                                            {selected.content}
                                                        </p>
                                                        <div className='mt-3 flex flex-wrap gap-2'>
                                                            <button
                                                                type='button'
                                                                className='border border-mac-ink bg-white px-2 py-1 text-[11px] hover:opacity-80'
                                                                onClick={openEditMode}
                                                            >
                                                                수정
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className='border border-mac-ink bg-white px-2 py-1 text-[11px] hover:opacity-80'
                                                                onClick={openDeleteMode}
                                                            >
                                                                삭제
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='border border-mac-ink bg-white px-3 py-2'>
                                                        게시글을 불러오지 못했습니다.
                                                    </div>
                                                )}
                                            </div>
                                        ) : null}
                                    </li>
                                )
                            })}
                        </ul>
                        {listLoading ? <div className='text-[11px]'>게시글을 불러오는 중...</div> : null}
                        <div className='flex justify-center'>
                            <button
                                type='button'
                                className='border border-mac-ink bg-white px-3 py-1 text-[11px] hover:opacity-80 disabled:opacity-40'
                                onClick={() => loadPosts()}
                                disabled={listLoading || !hasMore}
                            >
                                더 불러오기
                            </button>
                        </div>
                    </div>
                </>
            ) : null}
            {viewMode === 'create' ? (
                <div className='border border-mac-ink bg-white p-2'>
                    <div className='mb-2 text-[11px] font-semibold'>글 쓰기</div>
                    {createError ? (
                        <div className='mb-2 border border-mac-ink bg-mac-paper px-2 py-1'>{createError}</div>
                    ) : null}
                    <div className='grid gap-2'>
                        <input
                            className='w-full border border-mac-ink px-2 py-1 text-[11px]'
                            placeholder='제목'
                            value={createForm.title}
                            onChange={(event) => setCreateForm((prev) => ({ ...prev, title: event.target.value }))}
                        />
                        <textarea
                            className='min-h-[100px] w-full border border-mac-ink px-2 py-1 text-[11px]'
                            placeholder='내용'
                            value={createForm.content}
                            onChange={(event) => setCreateForm((prev) => ({ ...prev, content: event.target.value }))}
                        />
                        <div className='grid gap-2 sm:grid-cols-2'>
                            <input
                                className='w-full border border-mac-ink px-2 py-1 text-[11px]'
                                placeholder='익명 닉네임'
                                value={createForm.anonymousName}
                                onChange={(event) =>
                                    setCreateForm((prev) => ({ ...prev, anonymousName: event.target.value }))
                                }
                            />
                            <input
                                className='w-full border border-mac-ink px-2 py-1 text-[11px]'
                                placeholder='비밀번호'
                                type='password'
                                value={createForm.password}
                                onChange={(event) =>
                                    setCreateForm((prev) => ({ ...prev, password: event.target.value }))
                                }
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type='button'
                                className='border border-mac-ink bg-white px-3 py-1 text-[11px] hover:opacity-80 disabled:opacity-40'
                                onClick={handleCreateSubmit}
                                disabled={createLoading}
                            >
                                {createLoading ? '등록 중...' : '등록'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            {viewMode === 'edit' ? (
                <div className='border border-mac-ink bg-white p-2'>
                    <div className='mb-2 text-[11px] font-semibold'>게시글 수정</div>
                    {!selected ? (
                        <div className='border border-mac-ink bg-mac-paper px-2 py-2 text-center'>
                            수정할 게시글을 선택해주세요.
                        </div>
                    ) : (
                        <>
                            {modeError ? (
                                <div className='mb-2 border border-mac-ink bg-mac-paper px-2 py-1'>{modeError}</div>
                            ) : null}
                            <div className='grid gap-2'>
                                <input
                                    className='w-full border border-mac-ink px-2 py-1 text-[11px]'
                                    placeholder='제목'
                                    value={editForm.title}
                                    onChange={(event) =>
                                        setEditForm((prev) => ({ ...prev, title: event.target.value }))
                                    }
                                />
                                <textarea
                                    className='min-h-[100px] w-full border border-mac-ink px-2 py-1 text-[11px]'
                                    placeholder='내용'
                                    value={editForm.content}
                                    onChange={(event) =>
                                        setEditForm((prev) => ({ ...prev, content: event.target.value }))
                                    }
                                />
                                <input
                                    className='w-full border border-mac-ink px-2 py-1 text-[11px]'
                                    placeholder='익명 닉네임'
                                    value={editForm.anonymousName}
                                    onChange={(event) =>
                                        setEditForm((prev) => ({ ...prev, anonymousName: event.target.value }))
                                    }
                                />
                                <input
                                    className='w-full border border-mac-ink px-2 py-1 text-[11px]'
                                    placeholder='비밀번호'
                                    type='password'
                                    value={modePassword}
                                    onChange={(event) => setModePassword(event.target.value)}
                                />
                                <div className='flex justify-end'>
                                    <button
                                        type='button'
                                        className='border border-mac-ink bg-white px-3 py-1 text-[11px] hover:opacity-80 disabled:opacity-40'
                                        onClick={handleEditSubmit}
                                        disabled={modeLoading}
                                    >
                                        {modeLoading ? '수정 중...' : '수정'}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : null}
            {viewMode === 'delete' ? (
                <div className='border border-mac-ink bg-white p-2'>
                    <div className='mb-2 text-[11px] font-semibold'>게시글 삭제</div>
                    {!selected ? (
                        <div className='border border-mac-ink bg-mac-paper px-2 py-2 text-center'>
                            삭제할 게시글을 선택해주세요.
                        </div>
                    ) : (
                        <>
                            <div className='mb-2 border border-mac-ink bg-mac-paper px-2 py-2 text-[11px]'>
                                <div className='font-semibold'>{selected.title}</div>
                                <div className='text-[10px] text-mac-ink/70'>{selected.anonymousName}</div>
                            </div>
                            {modeError ? (
                                <div className='mb-2 border border-mac-ink bg-mac-paper px-2 py-1'>{modeError}</div>
                            ) : null}
                            <div className='grid gap-2'>
                                <input
                                    className='w-full border border-mac-ink px-2 py-1 text-[11px]'
                                    placeholder='비밀번호'
                                    type='password'
                                    value={modePassword}
                                    onChange={(event) => setModePassword(event.target.value)}
                                />
                                <div className='flex justify-end'>
                                    <button
                                        type='button'
                                        className='border border-mac-ink bg-white px-3 py-1 text-[11px] hover:opacity-80 disabled:opacity-40'
                                        onClick={handleDeleteSubmit}
                                        disabled={modeLoading}
                                    >
                                        {modeLoading ? '삭제 중...' : '삭제'}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default AnonymousBoard
