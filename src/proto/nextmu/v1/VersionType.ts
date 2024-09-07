// Original file: D:/NextMU/nextmu-astro/proto/models/update.proto

export const VersionType = {
  REVISION: 0,
  MINOR: 1,
  MAJOR: 2,
} as const;

export type VersionType =
  | 'REVISION'
  | 0
  | 'MINOR'
  | 1
  | 'MAJOR'
  | 2

export type VersionType__Output = typeof VersionType[keyof typeof VersionType]
