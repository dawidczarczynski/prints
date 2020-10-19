import { Observable } from "rxjs";

import { ImageContainer } from "../model/ImageContainer";
import { UploadProgressResult } from "./impl/UploadProgress";

export interface ImageUploader {
    uploadImages(images: ImageContainer[]): Observable<UploadProgressResult>
}
