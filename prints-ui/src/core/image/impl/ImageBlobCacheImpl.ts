import { injectable } from "tsyringe";
import { ImageBlobCache } from "../ImageBlobCache";

@injectable()
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