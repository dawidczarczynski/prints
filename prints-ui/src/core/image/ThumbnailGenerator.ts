export interface ThumbnailGenerator {
    getThumbnail(blob: Blob): Promise<string>
}
