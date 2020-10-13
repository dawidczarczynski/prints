import pica from 'pica';
import { injectable } from 'tsyringe';

import { Resizer } from '../Resizer';

@injectable()
export class ResizerImpl implements Resizer {

    private readonly pica = pica({
        features: ['all'],
        concurrency: navigator.hardwareConcurrency
    });

    public async resize(image: HTMLImageElement, canvas: OffscreenCanvas): Promise<Blob> {
        try {
            const thumbnail = await this.pica.resize(image, canvas as any);
            const blob = await this.pica.toBlob(thumbnail, 'image/jpeg', 0.9);
            
            return blob;
        } catch (ex) {
            console.error('Cannot resize image', ex.message);
            throw new Error('Cannot resize image');
        }
    }

}