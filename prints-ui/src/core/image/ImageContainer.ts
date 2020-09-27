import { v4 as uuid } from 'uuid';

export class ImageContainer {

    public readonly id = uuid();
    private _thumbnailBlob!: Promise<string>;
    private _originalFile!: File;

    private constructor() {};

    public get name(): string {
        return this._originalFile.name;
    }

    public get thumbnail(): Promise<string> {
        return this._thumbnailBlob;
    }

    public static Builder = class Builder {
        
        private imageContainer = new ImageContainer();

        public setThumbnail(blob: Promise<string>): Builder {
            this.imageContainer._thumbnailBlob = blob;

            return this;
        }

        public setOriginalFile(file: File): Builder {
            this.imageContainer._originalFile = file;

            return this;
        }

        public build(): ImageContainer {
            if (this.imageContainer._originalFile && this.imageContainer._thumbnailBlob) {
                return this.imageContainer;
            } else {
                throw new Error('ImageContainer object is not constructed in proper way');
            }
        }
        
    }

}