import { Observable } from "rxjs";

export interface ProcessingItem<T> {
    id: string;
    item: T;
}

export interface QueueProcessor<I, R> {
    run(action: (item: I) => Observable<R>): Observable<ProcessingItem<R>>;
    process(item: I, id: string): Observable<R>;
}
