import { Observable } from 'rxjs';
import type { RxStorageInstance, RxStorageChangeEvent, RxDocumentData, BulkWriteRow, RxStorageBulkWriteResponse, RxStorageQueryResult, RxJsonSchema, RxStorageInstanceCreationParams, EventBulk, StringKeys, RxConflictResultionTask, RxConflictResultionTaskSolution, RxStorageDefaultCheckpoint, RxStorageCountResult, DefaultPreparedQuery, RxStorageInfoResult } from '../../types/index.d.ts';
import type { DexieSettings, DexieStorageInternals } from '../../types/plugins/dexie.d.ts';
import { RxStorageDexie } from './rx-storage-dexie.ts';
export declare class RxStorageInstanceDexie<RxDocType> implements RxStorageInstance<RxDocType, DexieStorageInternals, DexieSettings, RxStorageDefaultCheckpoint> {
    readonly storage: RxStorageDexie;
    readonly databaseName: string;
    readonly collectionName: string;
    readonly schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>;
    readonly internals: DexieStorageInternals;
    readonly options: Readonly<DexieSettings>;
    readonly settings: DexieSettings;
    readonly primaryPath: StringKeys<RxDocumentData<RxDocType>>;
    private changes$;
    readonly instanceId: number;
    closed?: Promise<void>;
    constructor(storage: RxStorageDexie, databaseName: string, collectionName: string, schema: Readonly<RxJsonSchema<RxDocumentData<RxDocType>>>, internals: DexieStorageInternals, options: Readonly<DexieSettings>, settings: DexieSettings);
    bulkWrite(documentWrites: BulkWriteRow<RxDocType>[], context: string): Promise<RxStorageBulkWriteResponse<RxDocType>>;
    findDocumentsById(ids: string[], deleted: boolean): Promise<RxDocumentData<RxDocType>[]>;
    query(preparedQuery: DefaultPreparedQuery<RxDocType>): Promise<RxStorageQueryResult<RxDocType>>;
    count(preparedQuery: DefaultPreparedQuery<RxDocType>): Promise<RxStorageCountResult>;
    info(): Promise<RxStorageInfoResult>;
    getChangedDocumentsSince(limit: number, checkpoint?: RxStorageDefaultCheckpoint): Promise<{
        documents: RxDocumentData<RxDocType>[];
        checkpoint: RxStorageDefaultCheckpoint;
    }>;
    changeStream(): Observable<EventBulk<RxStorageChangeEvent<RxDocumentData<RxDocType>>, RxStorageDefaultCheckpoint>>;
    cleanup(minimumDeletedTime: number): Promise<boolean>;
    getAttachmentData(_documentId: string, _attachmentId: string, _digest: string): Promise<string>;
    remove(): Promise<void>;
    close(): Promise<void>;
    conflictResultionTasks(): Observable<RxConflictResultionTask<RxDocType>>;
    resolveConflictResultionTask(_taskSolution: RxConflictResultionTaskSolution<RxDocType>): Promise<void>;
}
export declare function createDexieStorageInstance<RxDocType>(storage: RxStorageDexie, params: RxStorageInstanceCreationParams<RxDocType, DexieSettings>, settings: DexieSettings): Promise<RxStorageInstanceDexie<RxDocType>>;
