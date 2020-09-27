import { ImageContainer } from "./ImageContainer";
import { ThumbnailGenerator } from "./ThunbnailGenerator";

export interface ImageService {
    loadImages(files: File[]): ImageContainer[]
}

export class ImageServiceImpl implements ImageService {

    constructor(private readonly thumbnails: ThumbnailGenerator) {}

    public loadImages(files: File[]): ImageContainer[] {
        return files.map(file => {
            const thumbnail = this.thumbnails.getThumbnail(file);

            return new ImageContainer.Builder()
                .setOriginalFile(file)
                .setThumbnail(thumbnail)
                .build();
        });     
    }


}
