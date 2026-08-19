import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const teamName = process.env.NEXT_PUBLIC_TEAM_NAME
  const isSet = Boolean(teamName)
  const displayName = isSet ? `${teamName} 사이트` : '우리 팀 사이트'

  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  const { data: notices, error: noticesError } = hasSupabaseEnv
    ? await supabase.from('notices').select('*').order('created_at', { ascending: false })
    : { data: null, error: null }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#fff',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 24px rgba(15, 23, 42, 0.06)',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            margin: '0 auto 20px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: 14,
          }}
        >
          VS
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{displayName}</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 8 }}>
          Vercel 배포 따라하기 데모 페이지
        </p>

        <span
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            color: isSet ? '#15803d' : '#94a3b8',
            background: isSet ? '#dcfce7' : '#f1f5f9',
          }}
        >
          {isSet ? '● 환경변수 적용됨' : '○ 아직 설정 안 됨'}
        </span>

        <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 24 }}>
          <code>NEXT_PUBLIC_TEAM_NAME</code> 값을 바꾸고 재배포하면 위 이름이 바뀝니다.
        </p>

        <hr style={{ margin: '28px 0', border: 0, borderTop: '1px solid #e2e8f0' }} />

        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, textAlign: 'left' }}>공지사항</h2>

        {!hasSupabaseEnv ? (
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 12, textAlign: 'left' }}>
            아직 Supabase 연결 전입니다. 환경변수를 넣고 재배포하면 여기에 데이터가 표시됩니다.
          </p>
        ) : noticesError ? (
          <p style={{ color: '#b91c1c', fontSize: 13, marginTop: 12, textAlign: 'left' }}>
            공지사항을 불러오지 못했습니다 — {noticesError.message}
          </p>
        ) : notices?.length ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', textAlign: 'left' }}>
            {notices.map((n) => (
              <li
                key={n.id}
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <strong style={{ fontSize: 14 }}>{n.title}</strong>
                <p style={{ color: '#64748b', fontSize: 13, margin: '4px 0 0' }}>{n.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 12, textAlign: 'left' }}>
            아직 등록된 공지사항이 없습니다.
          </p>
        )}
      </div>
    </main>
  )
}
