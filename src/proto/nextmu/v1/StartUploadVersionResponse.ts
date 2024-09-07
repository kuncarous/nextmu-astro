// Original file: D:/NextMU/nextmu-astro/proto/models/update.proto

import type { ChunkInfo as _nextmu_v1_ChunkInfo, ChunkInfo__Output as _nextmu_v1_ChunkInfo__Output } from '../../nextmu/v1/ChunkInfo';

export interface StartUploadVersionResponse {
  'uploadId'?: (string);
  'concurrentId'?: (string);
  'existingChunks'?: (_nextmu_v1_ChunkInfo)[];
}

export interface StartUploadVersionResponse__Output {
  'uploadId': (string);
  'concurrentId': (string);
  'existingChunks': (_nextmu_v1_ChunkInfo__Output)[];
}
