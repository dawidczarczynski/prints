export class FileLoader {
    
    public static loadFileAsBlob(file: File): Promise<string> {
        const fr = new FileReader();

        return new Promise((resolve, reject) => {
          fr.onload = () => resolve(fr.result as string);
          fr.onerror = reject;
          fr.readAsDataURL(file);
        });
    }
    
}