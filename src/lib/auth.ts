// ── 교사 인증 (PIN 기반, 24시간 유효) ──

export function isTeacherAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const auth = localStorage.getItem('teacherAuth');
  const authTime = localStorage.getItem('teacherAuthTime');
  if (!auth || !authTime) return false;
  const elapsed = Date.now() - Number(authTime);
  if (elapsed > 24 * 60 * 60 * 1000) {
    localStorage.removeItem('teacherAuth');
    localStorage.removeItem('teacherAuthTime');
    return false;
  }
  return auth === 'true';
}

export function loginTeacher() {
  localStorage.setItem('teacherAuth', 'true');
  localStorage.setItem('teacherAuthTime', Date.now().toString());
}

export function logout() {
  localStorage.removeItem('teacherAuth');
  localStorage.removeItem('teacherAuthTime');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_role');
}

// ── 관리자 인증 (이메일/비밀번호) ──

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('auth_role');
  return !!token && !!role;
}

export function getAdminRole(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_role');
}

// ── 접근 코드 생성 ──

export function generateAccessCode(institutionId: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = institutionId.toUpperCase().slice(0, 2);
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
