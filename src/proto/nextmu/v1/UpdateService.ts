// Original file: D:/NextMU/nextmu-astro/proto/models/update.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateVersionRequest as _nextmu_v1_CreateVersionRequest, CreateVersionRequest__Output as _nextmu_v1_CreateVersionRequest__Output } from '../../nextmu/v1/CreateVersionRequest';
import type { CreateVersionResponse as _nextmu_v1_CreateVersionResponse, CreateVersionResponse__Output as _nextmu_v1_CreateVersionResponse__Output } from '../../nextmu/v1/CreateVersionResponse';
import type { EditVersionRequest as _nextmu_v1_EditVersionRequest, EditVersionRequest__Output as _nextmu_v1_EditVersionRequest__Output } from '../../nextmu/v1/EditVersionRequest';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../../google/protobuf/Empty';
import type { FetchVersionRequest as _nextmu_v1_FetchVersionRequest, FetchVersionRequest__Output as _nextmu_v1_FetchVersionRequest__Output } from '../../nextmu/v1/FetchVersionRequest';
import type { FetchVersionResponse as _nextmu_v1_FetchVersionResponse, FetchVersionResponse__Output as _nextmu_v1_FetchVersionResponse__Output } from '../../nextmu/v1/FetchVersionResponse';
import type { ListVersionsRequest as _nextmu_v1_ListVersionsRequest, ListVersionsRequest__Output as _nextmu_v1_ListVersionsRequest__Output } from '../../nextmu/v1/ListVersionsRequest';
import type { ListVersionsResponse as _nextmu_v1_ListVersionsResponse, ListVersionsResponse__Output as _nextmu_v1_ListVersionsResponse__Output } from '../../nextmu/v1/ListVersionsResponse';
import type { ProcessVersionRequest as _nextmu_v1_ProcessVersionRequest, ProcessVersionRequest__Output as _nextmu_v1_ProcessVersionRequest__Output } from '../../nextmu/v1/ProcessVersionRequest';
import type { StartUploadVersionRequest as _nextmu_v1_StartUploadVersionRequest, StartUploadVersionRequest__Output as _nextmu_v1_StartUploadVersionRequest__Output } from '../../nextmu/v1/StartUploadVersionRequest';
import type { StartUploadVersionResponse as _nextmu_v1_StartUploadVersionResponse, StartUploadVersionResponse__Output as _nextmu_v1_StartUploadVersionResponse__Output } from '../../nextmu/v1/StartUploadVersionResponse';
import type { UploadVersionChunkRequest as _nextmu_v1_UploadVersionChunkRequest, UploadVersionChunkRequest__Output as _nextmu_v1_UploadVersionChunkRequest__Output } from '../../nextmu/v1/UploadVersionChunkRequest';
import type { UploadVersionChunkResponse as _nextmu_v1_UploadVersionChunkResponse, UploadVersionChunkResponse__Output as _nextmu_v1_UploadVersionChunkResponse__Output } from '../../nextmu/v1/UploadVersionChunkResponse';

export interface UpdateServiceClient extends grpc.Client {
  CreateVersion(argument: _nextmu_v1_CreateVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_CreateVersionResponse__Output>): grpc.ClientUnaryCall;
  CreateVersion(argument: _nextmu_v1_CreateVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_CreateVersionResponse__Output>): grpc.ClientUnaryCall;
  CreateVersion(argument: _nextmu_v1_CreateVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_CreateVersionResponse__Output>): grpc.ClientUnaryCall;
  CreateVersion(argument: _nextmu_v1_CreateVersionRequest, callback: grpc.requestCallback<_nextmu_v1_CreateVersionResponse__Output>): grpc.ClientUnaryCall;
  createVersion(argument: _nextmu_v1_CreateVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_CreateVersionResponse__Output>): grpc.ClientUnaryCall;
  createVersion(argument: _nextmu_v1_CreateVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_CreateVersionResponse__Output>): grpc.ClientUnaryCall;
  createVersion(argument: _nextmu_v1_CreateVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_CreateVersionResponse__Output>): grpc.ClientUnaryCall;
  createVersion(argument: _nextmu_v1_CreateVersionRequest, callback: grpc.requestCallback<_nextmu_v1_CreateVersionResponse__Output>): grpc.ClientUnaryCall;
  
  EditVersion(argument: _nextmu_v1_EditVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  EditVersion(argument: _nextmu_v1_EditVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  EditVersion(argument: _nextmu_v1_EditVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  EditVersion(argument: _nextmu_v1_EditVersionRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  editVersion(argument: _nextmu_v1_EditVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  editVersion(argument: _nextmu_v1_EditVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  editVersion(argument: _nextmu_v1_EditVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  editVersion(argument: _nextmu_v1_EditVersionRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  FetchVersion(argument: _nextmu_v1_FetchVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_FetchVersionResponse__Output>): grpc.ClientUnaryCall;
  FetchVersion(argument: _nextmu_v1_FetchVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_FetchVersionResponse__Output>): grpc.ClientUnaryCall;
  FetchVersion(argument: _nextmu_v1_FetchVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_FetchVersionResponse__Output>): grpc.ClientUnaryCall;
  FetchVersion(argument: _nextmu_v1_FetchVersionRequest, callback: grpc.requestCallback<_nextmu_v1_FetchVersionResponse__Output>): grpc.ClientUnaryCall;
  fetchVersion(argument: _nextmu_v1_FetchVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_FetchVersionResponse__Output>): grpc.ClientUnaryCall;
  fetchVersion(argument: _nextmu_v1_FetchVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_FetchVersionResponse__Output>): grpc.ClientUnaryCall;
  fetchVersion(argument: _nextmu_v1_FetchVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_FetchVersionResponse__Output>): grpc.ClientUnaryCall;
  fetchVersion(argument: _nextmu_v1_FetchVersionRequest, callback: grpc.requestCallback<_nextmu_v1_FetchVersionResponse__Output>): grpc.ClientUnaryCall;
  
  ListVersions(argument: _nextmu_v1_ListVersionsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_ListVersionsResponse__Output>): grpc.ClientUnaryCall;
  ListVersions(argument: _nextmu_v1_ListVersionsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_ListVersionsResponse__Output>): grpc.ClientUnaryCall;
  ListVersions(argument: _nextmu_v1_ListVersionsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_ListVersionsResponse__Output>): grpc.ClientUnaryCall;
  ListVersions(argument: _nextmu_v1_ListVersionsRequest, callback: grpc.requestCallback<_nextmu_v1_ListVersionsResponse__Output>): grpc.ClientUnaryCall;
  listVersions(argument: _nextmu_v1_ListVersionsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_ListVersionsResponse__Output>): grpc.ClientUnaryCall;
  listVersions(argument: _nextmu_v1_ListVersionsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_ListVersionsResponse__Output>): grpc.ClientUnaryCall;
  listVersions(argument: _nextmu_v1_ListVersionsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_ListVersionsResponse__Output>): grpc.ClientUnaryCall;
  listVersions(argument: _nextmu_v1_ListVersionsRequest, callback: grpc.requestCallback<_nextmu_v1_ListVersionsResponse__Output>): grpc.ClientUnaryCall;
  
  ProcessVersion(argument: _nextmu_v1_ProcessVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  ProcessVersion(argument: _nextmu_v1_ProcessVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  ProcessVersion(argument: _nextmu_v1_ProcessVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  ProcessVersion(argument: _nextmu_v1_ProcessVersionRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  processVersion(argument: _nextmu_v1_ProcessVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  processVersion(argument: _nextmu_v1_ProcessVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  processVersion(argument: _nextmu_v1_ProcessVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  processVersion(argument: _nextmu_v1_ProcessVersionRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  StartUploadVersion(argument: _nextmu_v1_StartUploadVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_StartUploadVersionResponse__Output>): grpc.ClientUnaryCall;
  StartUploadVersion(argument: _nextmu_v1_StartUploadVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_StartUploadVersionResponse__Output>): grpc.ClientUnaryCall;
  StartUploadVersion(argument: _nextmu_v1_StartUploadVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_StartUploadVersionResponse__Output>): grpc.ClientUnaryCall;
  StartUploadVersion(argument: _nextmu_v1_StartUploadVersionRequest, callback: grpc.requestCallback<_nextmu_v1_StartUploadVersionResponse__Output>): grpc.ClientUnaryCall;
  startUploadVersion(argument: _nextmu_v1_StartUploadVersionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_StartUploadVersionResponse__Output>): grpc.ClientUnaryCall;
  startUploadVersion(argument: _nextmu_v1_StartUploadVersionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_StartUploadVersionResponse__Output>): grpc.ClientUnaryCall;
  startUploadVersion(argument: _nextmu_v1_StartUploadVersionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_StartUploadVersionResponse__Output>): grpc.ClientUnaryCall;
  startUploadVersion(argument: _nextmu_v1_StartUploadVersionRequest, callback: grpc.requestCallback<_nextmu_v1_StartUploadVersionResponse__Output>): grpc.ClientUnaryCall;
  
  UploadVersionChunk(argument: _nextmu_v1_UploadVersionChunkRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_UploadVersionChunkResponse__Output>): grpc.ClientUnaryCall;
  UploadVersionChunk(argument: _nextmu_v1_UploadVersionChunkRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_UploadVersionChunkResponse__Output>): grpc.ClientUnaryCall;
  UploadVersionChunk(argument: _nextmu_v1_UploadVersionChunkRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_UploadVersionChunkResponse__Output>): grpc.ClientUnaryCall;
  UploadVersionChunk(argument: _nextmu_v1_UploadVersionChunkRequest, callback: grpc.requestCallback<_nextmu_v1_UploadVersionChunkResponse__Output>): grpc.ClientUnaryCall;
  uploadVersionChunk(argument: _nextmu_v1_UploadVersionChunkRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_UploadVersionChunkResponse__Output>): grpc.ClientUnaryCall;
  uploadVersionChunk(argument: _nextmu_v1_UploadVersionChunkRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nextmu_v1_UploadVersionChunkResponse__Output>): grpc.ClientUnaryCall;
  uploadVersionChunk(argument: _nextmu_v1_UploadVersionChunkRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nextmu_v1_UploadVersionChunkResponse__Output>): grpc.ClientUnaryCall;
  uploadVersionChunk(argument: _nextmu_v1_UploadVersionChunkRequest, callback: grpc.requestCallback<_nextmu_v1_UploadVersionChunkResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UpdateServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateVersion: grpc.handleUnaryCall<_nextmu_v1_CreateVersionRequest__Output, _nextmu_v1_CreateVersionResponse>;
  
  EditVersion: grpc.handleUnaryCall<_nextmu_v1_EditVersionRequest__Output, _google_protobuf_Empty>;
  
  FetchVersion: grpc.handleUnaryCall<_nextmu_v1_FetchVersionRequest__Output, _nextmu_v1_FetchVersionResponse>;
  
  ListVersions: grpc.handleUnaryCall<_nextmu_v1_ListVersionsRequest__Output, _nextmu_v1_ListVersionsResponse>;
  
  ProcessVersion: grpc.handleUnaryCall<_nextmu_v1_ProcessVersionRequest__Output, _google_protobuf_Empty>;
  
  StartUploadVersion: grpc.handleUnaryCall<_nextmu_v1_StartUploadVersionRequest__Output, _nextmu_v1_StartUploadVersionResponse>;
  
  UploadVersionChunk: grpc.handleUnaryCall<_nextmu_v1_UploadVersionChunkRequest__Output, _nextmu_v1_UploadVersionChunkResponse>;
  
}

export interface UpdateServiceDefinition extends grpc.ServiceDefinition {
  CreateVersion: MethodDefinition<_nextmu_v1_CreateVersionRequest, _nextmu_v1_CreateVersionResponse, _nextmu_v1_CreateVersionRequest__Output, _nextmu_v1_CreateVersionResponse__Output>
  EditVersion: MethodDefinition<_nextmu_v1_EditVersionRequest, _google_protobuf_Empty, _nextmu_v1_EditVersionRequest__Output, _google_protobuf_Empty__Output>
  FetchVersion: MethodDefinition<_nextmu_v1_FetchVersionRequest, _nextmu_v1_FetchVersionResponse, _nextmu_v1_FetchVersionRequest__Output, _nextmu_v1_FetchVersionResponse__Output>
  ListVersions: MethodDefinition<_nextmu_v1_ListVersionsRequest, _nextmu_v1_ListVersionsResponse, _nextmu_v1_ListVersionsRequest__Output, _nextmu_v1_ListVersionsResponse__Output>
  ProcessVersion: MethodDefinition<_nextmu_v1_ProcessVersionRequest, _google_protobuf_Empty, _nextmu_v1_ProcessVersionRequest__Output, _google_protobuf_Empty__Output>
  StartUploadVersion: MethodDefinition<_nextmu_v1_StartUploadVersionRequest, _nextmu_v1_StartUploadVersionResponse, _nextmu_v1_StartUploadVersionRequest__Output, _nextmu_v1_StartUploadVersionResponse__Output>
  UploadVersionChunk: MethodDefinition<_nextmu_v1_UploadVersionChunkRequest, _nextmu_v1_UploadVersionChunkResponse, _nextmu_v1_UploadVersionChunkRequest__Output, _nextmu_v1_UploadVersionChunkResponse__Output>
}
