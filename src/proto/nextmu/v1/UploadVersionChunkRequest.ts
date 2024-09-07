// Original file: D:/NextMU/nextmu-astro/proto/models/update.proto


export interface UploadVersionChunkRequest {
  'uploadId'?: (string);
  'concurrentId'?: (string);
  'offset'?: (number);
  'data'?: (Buffer | Uint8Array | string);
}

export interface UploadVersionChunkRequest__Output {
  'uploadId': (string);
  'concurrentId': (string);
  'offset': (number);
  'data': (Buffer);
}
