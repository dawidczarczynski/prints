import pica from 'pica';

export interface ThumbnailGenerator {
    getThumbnail(blob: Blob): Promise<string>
}

const THUMB_WIDTH = 300;
const THUMB_HEIGHT = 300; 

export class ThumbnailGeneratorImpl implements ThumbnailGenerator {

    private readonly pica = pica({
        features: ['all'],
        concurrency: 4
    });

    public async getThumbnail(input: Blob): Promise<string> {
        try {
            const image = await this.readBlobAsImage(input);
            const thumbnail = await this.pica.resize(image, this.getCanvas(image.width, image.height));
            const blob = await this.pica.toBlob(thumbnail, 'image/jpeg', 0.9);
            
            this.clearImage(image);

            return URL.createObjectURL(blob);
        } catch (ex) {
            console.error('Thumbnail generation error', ex.message);
            throw new Error('Cannot generate thumbnail');
        }
    }

    private readBlobAsImage(blob: Blob): Promise<HTMLImageElement> {
        const image = new Image();

        return new Promise((resolve, reject) => {
            image.onerror = reject;
            image.onload = () => resolve(image);
            image.src = URL.createObjectURL(blob);
        });
    }

    private clearImage(image: HTMLImageElement): void {
        URL.revokeObjectURL(image.src);
    } 

    private getCanvas(imageWidth: number, imageHeight: number): HTMLCanvasElement {
        const [ width, height ] = this.getThumbnailSize(imageWidth, imageHeight);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        return canvas;
    }
 
    private getThumbnailSize(width: number, height: number): number[] {
        return width > height 
            ? [ THUMB_WIDTH, height * (THUMB_WIDTH / width) ]
            : [ width * (THUMB_HEIGHT / height), THUMB_HEIGHT ]
    }
    
}
