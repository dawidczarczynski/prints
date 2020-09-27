import { ImageContainer } from "./ImageContainer";

export interface ImageService {
    loadImages(files: File[]): ImageContainer[]
}

export class ImageServiceImpl implements ImageService {

    public loadImages(files: File[]): ImageContainer[] {
        return files.map(file => new ImageContainer(file))
    }

}
