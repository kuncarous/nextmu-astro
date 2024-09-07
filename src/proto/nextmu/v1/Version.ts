// Original file: D:/NextMU/nextmu-astro/proto/models/update.proto

import type { VersionState as _nextmu_v1_VersionState, VersionState__Output as _nextmu_v1_VersionState__Output } from '../../nextmu/v1/VersionState';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../../google/protobuf/Timestamp';

export interface Version {
  'id'?: (string);
  'version'?: (string);
  'description'?: (string);
  'state'?: (_nextmu_v1_VersionState);
  'filesCount'?: (number);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'updatedAt'?: (_google_protobuf_Timestamp | null);
}

export interface Version__Output {
  'id': (string);
  'version': (string);
  'description': (string);
  'state': (_nextmu_v1_VersionState__Output);
  'filesCount': (number);
  'createdAt': (_google_protobuf_Timestamp__Output | null);
  'updatedAt': (_google_protobuf_Timestamp__Output | null);
}
