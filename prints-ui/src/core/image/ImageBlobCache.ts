export interface ImageBlobCache {
    cache(key: string, blobUrl: string): void;
    getBlobUrl(key: string): string | null;
    clear(): void;
}

export class ImageBlobCacheImpl implements ImageBlobCache {

    private readonly inMemoryCache = new Map<string, string>();

    public cache(key: string, blobUrl: string): void {
        this.inMemoryCache.set(key, blobUrl);
    }

    public getBlobUrl(key: string): string | null {
        return this.inMemoryCache.get(key) || null;
    }

    public clear(): void {
        this.inMemoryCache.clear();
    }

}