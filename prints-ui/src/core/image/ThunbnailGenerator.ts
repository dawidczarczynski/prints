import { UrlGenerator, UrlGeneratorImpl } from "../common/UrlGenerator";
import { Resizer, ResizerImpl } from "./Resizer";

export interface ThumbnailGenerator {
    getThumbnail(blob: Blob): Promise<string>
}

const THUMB_WIDTH = 300;
const THUMB_HEIGHT = 300; 

export class ThumbnailGeneratorImpl implements ThumbnailGenerator {

    private readonly resizer: Resizer = new ResizerImpl();
    private readonly url: UrlGenerator = new UrlGeneratorImpl();

    public async getThumbnail(input: File): Promise<string> {
        try {
            const image = await this.readBlobAsImage(input);
            const resized = await this.getResizedBlob(image);
            
            this.clearImage(image);

            return this.url.generateUrlforBlob(resized);
        } catch (ex) {
            console.error('Thumbnail generation error', ex.message);
            throw new Error('Cannot generate thumbnail');
        }
    }

    private readBlobAsImage(blob: File): Promise<HTMLImageElement> {
        console.log('Reading file', blob.name);
        const image = new Image();

        return new Promise((resolve, reject) => {
            image.onerror = reject;
            image.onload = () => resolve(image);
            image.src = URL.createObjectURL(blob);
        });
    }

    private getResizedBlob(image: HTMLImageElement): Promise<Blob> {
        return this.resizer.resize(
            image, 
            this.getCanvas(image.width, image.height)
        );
    }

    private clearImage(image: HTMLImageElement): void {
        this.url.revokeUrl(image.src);
    } 

    private getCanvas(imageWidth: number, imageHeight: number): OffscreenCanvas {
        const [ width, height ] = this.getThumbnailSize(imageWidth, imageHeight);

        return new OffscreenCanvas(width, height);
    }
 
    private getThumbnailSize(width: number, height: number): number[] {
        return width > height 
            ? [ THUMB_WIDTH, height * (THUMB_WIDTH / width) ]
            : [ width * (THUMB_HEIGHT / height), THUMB_HEIGHT ]
    }
    
}
