import axios from 'axios';
import { HttpClient } from '../HttpClient';

export type ProgressCallback = (progress: number) => void;

export class HttpClientImpl implements HttpClient {

    private readonly instance = axios.create();

    public post<P, R>(url: string, data: P, progressCallback?: ProgressCallback): Promise<R> {
        return this.instance.request<R>({
            method: 'POST',
            url,
            data,
            onUploadProgress: event => progressCallback ? progressCallback(this.calculateProgress(event)) : null
        }).then(response => response.data)
    }

    private calculateProgress(progressEvent: ProgressEvent<EventTarget>): number {
        const { loaded, total } = progressEvent;

        return Math.round(((loaded / total) * 100));
    }
    
}