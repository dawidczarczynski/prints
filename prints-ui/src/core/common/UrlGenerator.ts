export interface UrlGenerator {
    generateUrlforBlob(blob: Blob): string;
    revokeUrl(url: string): void;
}

export class UrlGeneratorImpl implements UrlGenerator {

    public generateUrlforBlob(blob: Blob): string {
        return URL.createObjectURL(blob);
    }

    public revokeUrl(url: string): void {
        try {
            URL.revokeObjectURL(url);
        } catch (ex) {
            console.error('Cannot revoke URL', ex.message);
        }
    }

}
