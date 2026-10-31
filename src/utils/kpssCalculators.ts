import { SubjectId } from '../types/kpss';

/**
 * Calculates exact ÖSYM Net score using the standard formula: Net = Correct - (Incorrect / 4)
 * Clamped to 0 minimum and rounded to 2 decimal places.
 */
export function calculateNet(correct: number, incorrect: number): number {
  const rawNet = correct - incorrect / 4;
  const clampedNet = Math.max(0, rawNet);
  return parseFloat(clampedNet.toFixed(2));
}

/**
 * Calculates percentage score normalized against total subject questions
 */
export function calculateSuccessRate(net: number, totalQuestions: number): number {
  if (totalQuestions <= 0) return 0;
  const rate = (net / totalQuestions) * 100;
  return Math.max(0, Math.min(100, Math.round(rate)));
}

/**
 * Helper to convert seconds into MM:SS human-readable string
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedMins = mins.toString().padStart(2, '0');
  const formattedSecs = secs.toString().padStart(2, '0');
  return `${formattedMins}:${formattedSecs}`;
}

/**
 * Lightweight formula calculating approximate scaled KPSS score over 100
 * based on General Ability (GY: Türkçe %50, Matematik %50) & General Culture (GK: Tarih %45, Coğrafya %30, Vatandaşlık %15, Güncel %10)
 */
export function estimateKPSSPoints(overallNets: Partial<Record<SubjectId, number>>): number {
  const defaultNets: Record<SubjectId, number> = {
    turkce: overallNets.turkce || 0,
    matematik: overallNets.matematik || 0,
    geometri: overallNets.geometri || 0,
    tarih: overallNets.tarih || 0,
    cografya: overallNets.cografya || 0,
    vatandaslik: overallNets.vatandaslik || 0,
    guncel: overallNets.guncel || 0,
  };

  // GY Total: Türkçe (30) + Matematik (26) + Geometri (4) = 60
  // GK Total: Tarih (27) + Coğrafya (18) + Vatandaşlık (9) + Güncel (6) = 60
  const gyTotalNet = defaultNets.turkce + defaultNets.matematik + defaultNets.geometri; // max 60
  const gkTotalNet =
    defaultNets.tarih +
    defaultNets.cografya +
    defaultNets.vatandaslik +
    defaultNets.guncel; // max 60

  const gyScaled = (gyTotalNet / 60) * 30;
  const gkScaled = (gkTotalNet / 60) * 30;

  const estimatedP100 = 40 + gyScaled + gkScaled;
  return parseFloat(Math.min(100, estimatedP100).toFixed(2));
}

/**
 * Helper to save a test attempt to local storage
 */
export function saveTestAttempt(attempt: any): void {
  try {
    const existingRaw = localStorage.getItem('kpss_test_history');
    const history = existingRaw ? JSON.parse(existingRaw) : [];
    history.unshift(attempt);
    // Keep last 50 attempts
    const trimmed = history.slice(0, 50);
    localStorage.setItem('kpss_test_history', JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed to save test attempt to localStorage:', err);
  }
}

/**
 * Helper to retrieve test history from local storage
 */
export function getTestHistory(): any[] {
  try {
    const existingRaw = localStorage.getItem('kpss_test_history');
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch (err) {
    console.error('Failed to read test history from localStorage:', err);
    return [];
  }
}
