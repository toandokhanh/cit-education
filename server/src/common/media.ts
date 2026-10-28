import { NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
const owners = resolve(process.cwd(), 'storage/upload-owners');
export function recordUpload(name: string, userId: number) {
  mkdirSync(owners, { recursive: true });
  writeFileSync(join(owners, name + '.owner'), String(userId), { flag: 'wx', mode: 0o600 });
}
export function assertOwnedUpload(name: string, userId: number) {
  if (typeof name !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.-]{0,160}\.mp4$/.test(name) || name.includes('..')) throw new NotFoundException('Video not found');
  let owner: string;
  try { owner = readFileSync(join(owners, name + '.owner'), 'utf8'); } catch { throw new NotFoundException('Video not found'); }
  if (owner !== String(userId)) throw new NotFoundException('Video not found');
}
