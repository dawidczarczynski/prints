export interface UrlGenerator {
    generateUrlforBlob(blob: Blob): string;
    revokeUrl(url: string): void;
}
