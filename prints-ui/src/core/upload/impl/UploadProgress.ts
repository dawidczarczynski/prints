export interface UploadProgressResult {
    totalItems: number;
    totalPercentProgress: number;
    currentItem: number;
    currentItemPercentProgress: number;
    currentItemName: string;
    done: boolean;
}

export class UploadProgress {

    private totalItems = 0;
    private currentItem = 1;

    public nextItem(): void {
        this.currentItem +=1;
    }

    public addItems(items: number): void {
        this.totalItems += items;
    }

    public getUploadProgress(currentItemPercentProgress: number, currentItemName: string): UploadProgressResult {
        return {
            currentItemName,
            currentItemPercentProgress,
            currentItem: this.currentItem,
            totalItems: this.totalItems,
            totalPercentProgress: this.countTotalPercentProgress(),
            done: this.checkIfDone(currentItemPercentProgress)
        }
    }

    private countTotalPercentProgress(): number {
        return Math.round((this.currentItem / this.totalItems) * 100);
    }

    private checkIfDone(currentProgress: number) {
        return this.currentItem === this.totalItems && currentProgress === 100;
    }

}