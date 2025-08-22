// Images utility file for storing and exporting image assets
import { toPng } from "html-to-image";

// Image encoding utility
export const encodeImg = async (element: HTMLElement, options?: {
    quality?: number;
    cacheBust?: boolean;
    style?: Record<string, string>;
}): Promise<string> => {
    if (!element) {
        throw new Error("Element is required for image encoding");
    }

    const defaultOptions = {
        quality: 0.95,
        cacheBust: true,
        style: {
            transform: "scale(1)",
            transformOrigin: "top left",
        },
        ...options
    };

    try {
        const dataUrl = await toPng(element, defaultOptions);
        return dataUrl;
    } catch (error) {
        throw new Error(`Failed to encode image: ${error}`);
    }
};

// Download image utility
export const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();

    // Clean up
    setTimeout(() => {
        link.remove();
    }, 100);
};

// Generate filename with timestamp
export const generateImageFilename = (prefix: string = "image", extension: string = "png"): string => {
    const timestamp = new Date().toISOString().split("T")[0];
    return `${prefix}_${timestamp}.${extension}`;
};

// Combined encode and download utility
export const encodeAndDownloadImage = async (
    element: HTMLElement,
    filename?: string,
    options?: Parameters<typeof encodeImg>[1]
): Promise<void> => {
    try {
        const dataUrl = await encodeImg(element, options);
        const finalFilename = filename || generateImageFilename("download");
        downloadImage(dataUrl, finalFilename);
    } catch (error) {
        throw error;
    }
};

// Image storage for multiple images (if needed for state management)
type ImageData = {
    id: string;
    dataUrl: string;
    filename: string;
    timestamp: Date;
};

export class ImageStore {
    private images: Map<string, ImageData> = new Map();

    // Store encoded image
    store(id: string, dataUrl: string, filename: string): void {
        this.images.set(id, {
            id,
            dataUrl,
            filename,
            timestamp: new Date()
        });
    }

    // Get stored image
    get(id: string): ImageData | undefined {
        return this.images.get(id);
    }

    // Download stored image
    download(id: string): boolean {
        const imageData = this.images.get(id);
        if (imageData) {
            downloadImage(imageData.dataUrl, imageData.filename);
            return true;
        }
        return false;
    }

    // Clear old images (optional memory management)
    clearOld(maxAge: number = 5 * 60 * 1000): void { // Default 5 minutes
        const now = new Date().getTime();
        for (const [id, data] of this.images.entries()) {
            if (now - data.timestamp.getTime() > maxAge) {
                this.images.delete(id);
            }
        }
    }

    // Clear all images
    clear(): void {
        this.images.clear();
    }

    // Get all stored images
    getAll(): ImageData[] {
        return Array.from(this.images.values());
    }
}

// Export default instance for global use
export const imageStore = new ImageStore();

// Image format utilities
export const IMAGE_FORMATS = {
    PNG: 'png',
    JPEG: 'jpeg',
    WEBP: 'webp'
} as const;

export type ImageFormat = typeof IMAGE_FORMATS[keyof typeof IMAGE_FORMATS];

// Convert image format
export const convertImageFormat = async (
    element: HTMLElement,
    format: ImageFormat = 'png',
    quality: number = 0.95
): Promise<string> => {
    switch (format) {
        case 'png':
            return await toPng(element, { quality, cacheBust: true });
        case 'jpeg':
            const { toJpeg } = await import('html-to-image');
            return await toJpeg(element, { quality, cacheBust: true });
        case 'webp':
            const { toBlob } = await import('html-to-image');
            const blob = await toBlob(element, { quality, cacheBust: true });
            return URL.createObjectURL(blob!);
        default:
            return await toPng(element, { quality, cacheBust: true });
    }
};
