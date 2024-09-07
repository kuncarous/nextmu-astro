// Original file: D:/NextMU/nextmu-astro/proto/models/update.proto

import type { Version as _nextmu_v1_Version, Version__Output as _nextmu_v1_Version__Output } from '../../nextmu/v1/Version';

export interface ListVersionsResponse {
  'availableCount'?: (number);
  'versions'?: (_nextmu_v1_Version)[];
}

export interface ListVersionsResponse__Output {
  'availableCount': (number);
  'versions': (_nextmu_v1_Version__Output)[];
}
