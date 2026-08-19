# Sangsangin 3회차 — Vercel 배포 실습 샘플

Next.js(App Router) 최소 구성. `Vercel 배포 따라하기` 문서와 함께 사용합니다.

## 담고 있는 것

| 기능 | 위치 | 설명 |
|---|---|---|
| 환경변수 데모 | `app/page.js` | `NEXT_PUBLIC_TEAM_NAME` 값을 화면 제목에 표시 |
| 공지사항 | `app/page.js` + `lib/supabase.js` | Supabase `notices` 테이블을 매 요청마다 조회 |

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev
```

## Supabase 준비

SQL Editor에서 실행:

```sql
create table if not exists notices (
  id         bigserial primary key,
  title      text not null,
  content    text,
  created_at timestamptz default now()
);

alter table notices enable row level security;

create policy "누구나 읽기" on notices for select using (true);

insert into notices (title, content) values
  ('환영합니다', '첫 번째 공지사항입니다.'),
  ('환경변수 실습', 'NEXT_PUBLIC_TEAM_NAME 값을 바꿔보세요.');
```

RLS 정책이 없으면 조회 결과가 빈 배열로 돌아옵니다.

## Vercel 배포

1. GitHub 저장소를 Vercel에 Import (Framework는 Next.js로 자동 인식)
2. **Settings → Environment Variables** 에 `.env.local` 과 같은 값 3개 등록
3. **Deployments → ⋯ → Redeploy**

> 환경변수는 저장만으로 반영되지 않습니다. 반드시 재배포해야 합니다.

## 메모

- 홈 화면은 `export const dynamic = 'force-dynamic'` 이라 요청마다 최신 공지를 읽어옵니다.
  이 설정이 없으면 빌드 시점 데이터가 굳어, 새 공지를 넣어도 재배포 전까지 보이지 않습니다.
