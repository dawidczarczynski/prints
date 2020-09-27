import { v4 as uuid } from 'uuid';
import { FileLoader } from './FileLoader';

export class ImageContainer {

    public readonly id = uuid();
    private url: Promise<string>;

    constructor(private readonly originalFile: File) {
        this.url = this.getImageUrl(originalFile);
    }

    public getName(): string {
        return this.originalFile.name;
    }
    
    public getUrl(): Promise<string> {
        return this.url;
    }

    public getOriginalFile(): File {
        return this.originalFile;
    }

    private getImageUrl(file: File): Promise<string> {
        return FileLoader.loadFileAsBlob(file);
    }

}