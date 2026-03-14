export function useIsLowEndDevice(): boolean {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  const androidMatch = navigator.userAgent.match(/Android (\d+)/);

  if (cores <= 2 || memory <= 2) return true;
  if (androidMatch && parseInt(androidMatch[1]) < 10) return true;
  return false;
}

export function useIsMobile(): boolean {
  return /Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
}
