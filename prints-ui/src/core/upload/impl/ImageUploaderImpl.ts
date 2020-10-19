import { merge, Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { inject, injectable } from "tsyringe";

import { HttpClient } from "../../common/HttpClient";
import { QueueProcessor } from "../../common/QueueProcessor";
import { ImageContainer } from "../../model/ImageContainer";
import { ImageUploader } from "../ImageUploader";
import { UploadProgressResult, UploadProgress } from "./UploadProgress";
import { TYPES } from "../../ioc/types";

@injectable()
export class ImageUploaderImpl implements ImageUploader {

    private readonly uploadUrl = 'http://localhost:8080/image';
    private readonly uploadProgress = new UploadProgress();

    constructor(
        @inject(TYPES.HttpClient) private readonly httpClient: HttpClient,
        @inject(TYPES.UploadProcessor) private readonly uploadProcessor: QueueProcessor<ImageContainer, UploadProgressResult>
    ) {
        this.uploadProcessor
            .run((image => this.uploadSingleImage(image)))
            .subscribe();
    }

    public uploadImages(images: ImageContainer[]): Observable<UploadProgressResult> {
        this.uploadProgress.addItems(images.length);

        return merge(...images.map(image => this.uploadProcessor.process(image, image.id)));
    }

    private uploadSingleImage(image: ImageContainer): Observable<UploadProgressResult> {
        return new Observable<number>(observer => {
            this.httpClient
                .post<FormData, number>(
                    this.uploadUrl, 
                    this.getPayload(image.blob),
                    (progress: number) => observer.next(progress)
                )
                .catch(err => observer.error(err))
                .finally(() => observer.complete());
        })
        .pipe(
            map(progress => this.uploadProgress.getUploadProgress(progress, image.name)),
            finalize(() => this.uploadProgress.nextItem())
        );
    }

    private getPayload(blob: File): FormData {
        const payload = new FormData();
        payload.set('file', blob);

        return payload;
    }

}