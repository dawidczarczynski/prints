import { Observable, of, from } from "rxjs";
import { tap } from "rxjs/operators";

import { ImageContainer } from "./ImageContainer";
import { QueueProcessor } from "../common/QueueProcessor";
import { ThumbnailGeneratorImpl } from "./ThunbnailGenerator";
import { ImageBlobCacheImpl } from "./ImageBlobCache";

export interface ImageService {
    getImages(files: File[]): ImageContainer[];
    loadThumbnail(image: ImageContainer): Observable<string>;
}

export class ImageServiceImpl implements ImageService {

    private readonly processor = new QueueProcessor<File, string>();
    private readonly thumbnailGenerator = new ThumbnailGeneratorImpl();
    private readonly imageBlobCache = new ImageBlobCacheImpl();

    constructor() {
        this.processor
            .run((input: File) => from(this.thumbnailGenerator.getThumbnail(input)))
            .subscribe()
    }

    public getImages(files: File[]): ImageContainer[] {
        return files.map(file =>  new ImageContainer(file));     
    }

    public loadThumbnail(image: ImageContainer): Observable<string> {
        const cachedThumbnail = this.imageBlobCache.getBlobUrl(image.id);
        
        return cachedThumbnail
            ? of(cachedThumbnail)
            : this.processor.process(image.blob, image.id)
                .pipe(
                    tap(thumbnail => this.imageBlobCache.cache(image.id, thumbnail))
                );
    }

}
