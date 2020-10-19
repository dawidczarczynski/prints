import { inject, injectable } from "tsyringe";
import { Observable, of, from } from "rxjs";
import { tap } from "rxjs/operators";

import { ImageContainer } from "../../model/ImageContainer";
import { QueueProcessor } from "../../common/QueueProcessor";
import { ThumbnailGenerator } from "../ThumbnailGenerator";
import { ImageBlobCache } from "../ImageBlobCache";
import { ImageService } from "../ImageService";
import { ImageUploader } from "../../upload/ImageUploader";
import { UploadProgressResult } from "../../upload/impl/UploadProgress";

import { TYPES } from "../../ioc/types";

@injectable()
export class ImageServiceImpl implements ImageService {

    private images: ImageContainer[] = [];

    constructor(
        @inject(TYPES.ThumbnailGenerator) private readonly thumbnailGenerator: ThumbnailGenerator,
        @inject(TYPES.ImageBlobCache) private readonly imageBlobCache: ImageBlobCache,
        @inject(TYPES.ImageFileProcessor) private readonly processor: QueueProcessor<File, string>,
        @inject(TYPES.ImageUploader) private readonly uploader: ImageUploader
    ) {
        this.processor
            .run((input: File) => from(this.thumbnailGenerator.getThumbnail(input)))
            .subscribe()
    }

    public getImages(files: File[]): ImageContainer[] {
        const images = files.map(file =>  new ImageContainer(file));   
        this.images = [ ...this.images, ...images ];

        return images;
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

    public uploadImages(): Observable<UploadProgressResult> {
        return this.uploader.uploadImages(this.images);
    }
    
}
