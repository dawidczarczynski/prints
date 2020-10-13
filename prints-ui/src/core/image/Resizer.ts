export interface Resizer {
    resize(image: HTMLImageElement, canvas: OffscreenCanvas): Promise<Blob> 
}
