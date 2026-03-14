'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginTeacher } from '@/lib/auth';

const DEFAULT_PIN = '1234';
const FONT = "var(--font-jua), 'Jua', system-ui, sans-serif";

/* ── PIN 로그인 (선생님) ── */
function PinLogin({ redirect }: { redirect?: string }) {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleInput(digit: string) {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError(false);
    if (newPin.length === 4) {
      const teacherPin = localStorage.getItem('teacherPin') || DEFAULT_PIN;
      if (newPin === teacherPin) {
        loginTeacher();
        router.push(redirect?.startsWith('/') ? redirect : '/teacher');
      } else {
        setShake(true); setError(true);
        setTimeout(() => { setPin(''); setShake(false); }, 800);
      }
    }
  }

  const digits = ['1','2','3','4','5','6','7','8','9','','0','←'];

  return (
    <div className="flex flex-col items-center">
      <div className={`flex gap-4 mb-8 ${shake ? 'animate-bounce' : ''}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
            i < pin.length ? error ? 'border-red-400 bg-red-100' : 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'
          }`}>
            {i < pin.length && <div className={`w-4 h-4 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`} />}
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 font-bold mb-4" style={{ fontFamily: FONT }}>PIN이 틀렸어요</p>}
      <div className="grid grid-cols-3 gap-3 w-64">
        {digits.map((d, i) => (
          <button key={i}
            onClick={() => { if (d === '←') setPin(p => p.slice(0, -1)); else if (d) handleInput(d); }}
            disabled={!d}
            style={{ fontFamily: FONT }}
            className={`h-16 rounded-2xl text-2xl font-black transition-all ${
              !d ? 'opacity-0 pointer-events-none' :
              d === '←' ? 'bg-red-100 text-red-600 hover:bg-red-200 active:scale-95' :
              'bg-white border-2 border-gray-200 text-gray-800 hover:bg-green-50 hover:border-green-300 active:scale-95 shadow-sm'
            }`}>
            {d}
          </button>
        ))}
      </div>
      <p className="text-gray-400 text-sm mt-6" style={{ fontFamily: FONT }}>기본 PIN: 1234</p>
    </div>
  );
}

/* ── 이메일 로그인 (관리자) ── */
function EmailLogin({ redirect }: { redirect?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    if (!email.trim() || !password) { setError('이메일과 비밀번호를 입력해주세요'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json() as { success: boolean; token?: string; role?: string; error?: string };
      if (!data.success) { setError(data.error ?? '로그인 실패'); return; }
      localStorage.setItem('auth_token', data.token!);
      localStorage.setItem('auth_role', data.role!);
      if (redirect?.startsWith('/')) router.push(redirect);
      else if (data.role === 'super_admin') router.push('/admin');
      else router.push('/teacher');
    } catch {
      setError('서버 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="space-y-3">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="이메일" style={{ fontFamily: FONT }}
          className="w-full border-2 border-gray-200 rounded-2xl px-5 py-3.5 text-lg focus:outline-none focus:border-green-400 transition-colors" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="비밀번호" style={{ fontFamily: FONT }}
          className="w-full border-2 border-gray-200 rounded-2xl px-5 py-3.5 text-lg focus:outline-none focus:border-green-400 transition-colors" />
      </div>
      {error && <p className="text-red-500 text-sm mt-3 text-center font-medium">{error}</p>}
      <button onClick={submit} disabled={loading} style={{ fontFamily: FONT }}
        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-black text-xl py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-60 shadow-lg">
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </div>
  );
}

/* ── 메인 ── */
function LoginPageInner() {
  const [tab, setTab] = useState<'pin' | 'email'>('pin');
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? undefined;
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
      <button onClick={() => router.push('/')}
        style={{ fontFamily: FONT }}
        className="mb-6 text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
        ← 어린이 마을로
      </button>

      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔐</div>
        <h1 className="text-3xl font-black text-gray-800" style={{ fontFamily: FONT }}>선생님 로그인</h1>
      </div>

      <div className="flex gap-2 mb-8 bg-gray-100 rounded-2xl p-1.5">
        <button onClick={() => setTab('pin')} style={{ fontFamily: FONT }}
          className={`flex-1 py-2.5 px-5 rounded-xl text-sm font-bold transition-colors ${
            tab === 'pin' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
          선생님 PIN
        </button>
        <button onClick={() => setTab('email')} style={{ fontFamily: FONT }}
          className={`flex-1 py-2.5 px-5 rounded-xl text-sm font-bold transition-colors ${
            tab === 'email' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'}`}>
          관리자 로그인
        </button>
      </div>

      {tab === 'pin' ? <PinLogin redirect={redirect} /> : <EmailLogin redirect={redirect} />}
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">불러오는 중...</div></div>}>
      <LoginPageInner />
    </Suspense>
  );
}
