import { Observable } from "rxjs";
import { ImageContainer } from "../model/ImageContainer";

export interface ImageService {
    getImages(files: File[]): ImageContainer[];
    loadThumbnail(image: ImageContainer): Observable<string>;
}
