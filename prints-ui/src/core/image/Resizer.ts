import pica from 'pica';

export class Resizer {

    private readonly pica = pica({
        features: ['all'],
        concurrency: 4
    });

    public async resize(image: HTMLImageElement, canvas: HTMLCanvasElement): Promise<Blob> {
        try {
            const thumbnail = await this.pica.resize(image, canvas);
            const blob = await this.pica.toBlob(thumbnail, 'image/jpeg', 0.9);
            
            return blob;
        } catch (ex) {
            console.error('Cannot resize image', ex.message);
            throw new Error('Cannot resize image');
        }
    }

}