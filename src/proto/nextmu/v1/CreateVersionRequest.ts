// Original file: D:/NextMU/nextmu-astro/proto/models/update.proto

import type { VersionType as _nextmu_v1_VersionType, VersionType__Output as _nextmu_v1_VersionType__Output } from '../../nextmu/v1/VersionType';

export interface CreateVersionRequest {
  'type'?: (_nextmu_v1_VersionType);
  'description'?: (string);
}

export interface CreateVersionRequest__Output {
  'type': (_nextmu_v1_VersionType__Output);
  'description': (string);
}
