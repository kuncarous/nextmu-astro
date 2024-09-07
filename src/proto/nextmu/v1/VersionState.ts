// Original file: D:/NextMU/nextmu-astro/proto/models/update.proto

export const VersionState = {
  PENDING: 0,
  READY: 1,
} as const;

export type VersionState =
  | 'PENDING'
  | 0
  | 'READY'
  | 1

export type VersionState__Output = typeof VersionState[keyof typeof VersionState]
