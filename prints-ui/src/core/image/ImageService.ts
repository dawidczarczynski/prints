import { Observable } from "rxjs";
import { ImageContainer } from "../model/ImageContainer";
import { UploadProgressResult } from "../upload/impl/UploadProgress";

export interface ImageService {
    getImages(files: File[]): ImageContainer[];
    loadThumbnail(image: ImageContainer): Observable<string>;
    uploadImages(): Observable<UploadProgressResult>;
}
