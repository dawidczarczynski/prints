import { ProgressCallback } from "./impl/HttpClientImpl";

export interface HttpClient {
    post<P, R>(url: string, data: P, progressCallback?: ProgressCallback): Promise<R>;
}
