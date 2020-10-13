import { v4 as uuid } from 'uuid';

export class ImageContainer {

    public readonly id = uuid();

    constructor(private readonly _originalFile: File) {};

    public get name(): string {
        return this._originalFile.name;
    }

    public get blob(): File {
        return this._originalFile;
    }

}