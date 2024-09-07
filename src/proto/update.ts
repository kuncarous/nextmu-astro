import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { UpdateServiceClient as _nextmu_v1_UpdateServiceClient, UpdateServiceDefinition as _nextmu_v1_UpdateServiceDefinition } from './nextmu/v1/UpdateService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
      Timestamp: MessageTypeDefinition
    }
  }
  nextmu: {
    v1: {
      ChunkInfo: MessageTypeDefinition
      CreateVersionRequest: MessageTypeDefinition
      CreateVersionResponse: MessageTypeDefinition
      EditVersionRequest: MessageTypeDefinition
      FetchVersionRequest: MessageTypeDefinition
      FetchVersionResponse: MessageTypeDefinition
      ListVersionsRequest: MessageTypeDefinition
      ListVersionsResponse: MessageTypeDefinition
      ProcessVersionRequest: MessageTypeDefinition
      StartUploadVersionRequest: MessageTypeDefinition
      StartUploadVersionResponse: MessageTypeDefinition
      UpdateService: SubtypeConstructor<typeof grpc.Client, _nextmu_v1_UpdateServiceClient> & { service: _nextmu_v1_UpdateServiceDefinition }
      UploadVersionChunkRequest: MessageTypeDefinition
      UploadVersionChunkResponse: MessageTypeDefinition
      Version: MessageTypeDefinition
      VersionState: EnumTypeDefinition
      VersionType: EnumTypeDefinition
    }
  }
}

