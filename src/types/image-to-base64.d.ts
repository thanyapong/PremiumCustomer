declare module 'image-to-base64' {
    function imageToBase64(imagePath: string): Promise<string>;
    export = imageToBase64;
}

declare module 'image-to-base64/browser' {
    function imageToBase64(imagePath: string): Promise<string>;
    export = imageToBase64;
}
