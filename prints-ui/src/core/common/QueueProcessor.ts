import { Observable, Subject } from "rxjs";
import { concatMap, filter, map, tap } from 'rxjs/operators';

interface ProcessingItem<T> {
    id: string;
    item: T;
}

export class QueueProcessor<I, R> {

    private readonly queue = new Subject<ProcessingItem<I>>();
    private readonly processed = new Subject<ProcessingItem<R>>();

    public run(action: (item: I) => Observable<R>): Observable<ProcessingItem<R>> {
        return this.queue.pipe(
                concatMap(next => 
                    action(next.item).pipe(
                            map(result => ({ id: next.id, item: result })),
                            tap(processed => this.emitProcessed(processed))
                    )
                )
            );
    }

    public process(item: I, id: string): Observable<R> {
        this.addToQueue({ item, id });
        return this.getProcessed(id);
    }

    private emitProcessed(processed: ProcessingItem<R>): void {
        this.processed.next(processed);
    }

    private addToQueue(input: ProcessingItem<I>): void {
        this.queue.next(input);
    }

    private getProcessed(id: string): Observable<R> {
        return this.processed.asObservable()
            .pipe(
                filter(processed =>  processed.id === id),
                map(processed => processed.item)
            );
    }

}