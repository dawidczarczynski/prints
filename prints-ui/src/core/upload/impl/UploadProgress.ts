export interface UploadProgressResult {
    totalItems: number;
    totalPercentProgress: number;
    currentItem: number;
    currentItemPercentProgress: number;
    currentItemName: string;
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
            totalItems: this.totalItems,
            currentItem: this.currentItem,
            totalPercentProgress: this.countTotalPercentProgress(),
            currentItemName,
            currentItemPercentProgress
        }
    }

    private countTotalPercentProgress(): number {
        return Math.round((this.currentItem / this.totalItems) * 100);
    }

}