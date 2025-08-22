import dayjs from "dayjs";
import imageToBase64 from "image-to-base64/browser";

/**
 * จัดรูปแบบวันที่จาก string เป็นรูปแบบที่กำหนด
 * @param dateString - สตริงวันที่ที่ต้องการจัดรูปแบบ
 * @param format - รูปแบบที่ต้องการ (ค่าเริ่มต้น: "DD/MM/YYYY HH:mm:ss")
 * @returns สตริงวันที่ที่จัดรูปแบบแล้ว หรือ undefined ถ้า input เป็น undefined
 */
export const formatDateString = (
    dateString: string | undefined,
    format: string = "DD/MM/YYYY HH:mm:ss",
    errorMessage: string | undefined = undefined
): string | undefined => {
    if (!dateString) return undefined;
    const date = dayjs(dateString);
    return date.isValid() ? date.format(format) : errorMessage;
};

export const numberWithCommas = (x: number | string, decimalPlaces: number = 2): string => {
    const numberValue = typeof x === "number" ? x.toFixed(decimalPlaces) : parseFloat(x).toFixed(decimalPlaces);
    const [integerPart, decimalPart] = numberValue.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};

export const encodeBase64 = (input: string): string => {
    return btoa(encodeURIComponent(input));
};

export const decodeBase64 = (input: string): string => {
    return decodeURIComponent(atob(input ?? ""));
};

export const encodeImg = (imgPath: string) => {
    return imageToBase64(imgPath).then((response) => {
        return "data:image/svg+xml;base64," + response;
    });
};

/**
 * Normalize product group name based on predefined mapping rules
 * @param productGroupName - Original product group name
 * @returns Normalized product group name
 */
export const normalizeProductGroupName = (productGroupName?: string): string => {
    if (!productGroupName) return "Non Display";

    const lowerName = productGroupName.toLowerCase();

    // Product group mapping rules
    const mappingRules = [
        {
            condition: (name: string, lower: string) =>
                lower.includes("ph") || name === "ประกันสุขภาพ",
            result: "ประกันสุขภาพ"
        },
        {
            condition: (name: string, lower: string) =>
                lower.includes("p30") || lower.includes("pa30") || name === "ประกันอุบัติเหตุ PA30",
            result: "ประกันอุบัติเหตุ PA30"
        },
        {
            condition: (name: string, lower: string) =>
                lower.includes("pl") || name === "ประกันชีวิต",
            result: "ประกันชีวิต"
        },
        {
            condition: (name: string, lower: string) =>
                lower.includes("house") || name === "ประกันบ้าน",
            result: "ประกันบ้าน"
        },
        {
            condition: (name: string, lower: string) =>
                lower.includes("smilepa") || name === "เบ็ดเตล็ด - SmilePA",
            result: "เบ็ดเตล็ด - SmilePA"
        },
        {
            condition: (name: string, lower: string) =>
                lower.includes("ta") && !lower.includes("smilepa") || name === "เบ็ดเตล็ด - TA",
            result: "เบ็ดเตล็ด - TA"
        },
        {
            condition: (name: string, lower: string) =>
                lower.includes("golf") || name === "เบ็ดเตล็ด - Golf",
            result: "เบ็ดเตล็ด - Golf"
        },
        {
            condition: (name: string, lower: string) =>
                lower.includes("home") || name === "เบ็ดเตล็ด - Home",
            result: "เบ็ดเตล็ด - Home"
        },
        {
            condition: (name: string, lower: string) =>
                lower.includes("criticalillness") || name === "ประกันโรคร้ายแรง",
            result: "ประกันโรคร้ายแรง"
        },
        {
            condition: (name: string, _lower: string) =>
                name.includes("ภาคบังคับ CMI") || name.includes("ภาคสมัครใจ VMI") || name === "ประกันรถยนต์",
            result: "ประกันรถยนต์"
        }
    ];

    // Find matching rule
    for (const rule of mappingRules) {
        if (rule.condition(productGroupName, lowerName)) {
            return rule.result;
        }
    }

    return "Non Display";
};

/**
 * Normalize debt details array by updating product group names
 * @param debtDetails - Array of debt detail objects
 * @returns Updated debt details array with normalized product group names
 */
export const normalizeDebtDetails = <T extends { productGroupName?: string }>(debtDetails: T[]): T[] => {
    return debtDetails.map(item => ({
        ...item,
        productGroupName: normalizeProductGroupName(item.productGroupName)
    }));
};
