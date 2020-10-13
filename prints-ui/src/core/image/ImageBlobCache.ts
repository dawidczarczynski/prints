export interface ImageBlobCache {
    cache(key: string, blobUrl: string): void;
    getBlobUrl(key: string): string | null;
    clear(): void;
}
