export function workerUrl(action: 'createSubtitle' | 'updateSubtitle'): string {
  const base = process.env.FLASKAPI_URL || 'http://127.0.0.1:6000/api';
  return `${base.replace(/\/$/, '')}/${action}`;
}
