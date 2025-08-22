import "./Const.d";

export const {
    VITE_APIGW_BASEURL,
    VITE_API_URL,
    VITE_APP_CONTACT_URL,
    VITE_APP_DESCRIPTION,
    VITE_APP_NAME,
    VITE_APP_SINCE,
    VITE_APP_VERSION,
    VITE_BASE_URL,
    VITE_CA_URL,
    VITE_AGREEMENT_URL,
    VITE_SUCCESS_URL,
    VITE_FAIL_URL,
    VITE_CANCEL_URL,
    VITE_ERROR_URL,
    VITE_PENDING_URL,
    VITE_SHARED_LINK_URL,
    MODE,
} = window.__CONST__ENV__;

export const APP_INFO = {
    name: VITE_APP_NAME,
    version: VITE_APP_VERSION,
    since: VITE_APP_SINCE,
    description: VITE_APP_DESCRIPTION,
    contactUrl: VITE_APP_CONTACT_URL,
    mode: MODE,
};

export const VERSION_CHECKER = {
    ENABLE_VERSION_CHECKER: true,
    CONFIRM_BEFORE_REFRESH: true,
    CHECK_VERSION_EVERY_MINUTE: 1,
};

export const API_URL = VITE_API_URL;
export const APIGW_URL = VITE_APIGW_BASEURL;
export const API_PRM_GW_URL = `${APIGW_URL}/premium`;
export const API_PRM_PA_GW_URL = `${APIGW_URL}/pa`;
export const API_PRMORDER_GW_URL = `${APIGW_URL}/order`;
export const API_PAYMENT_GW_URL = `${APIGW_URL}/payment`;

export const FONTS = {
    Sarabun: {
        normal: `${VITE_BASE_URL}/assets/fonts/thsarabunnew-webfont.ttf`,
        bold: `${VITE_BASE_URL}/assets/fonts/thsarabunnew_bold-webfont.ttf`,
        italics: `${VITE_BASE_URL}/assets/fonts/thsarabunnew_italic-webfont.ttf`,
        bolditalics: `${VITE_BASE_URL}/assets/fonts/thsarabunnew_bolditalic-webfont.ttf`,
    },
};

/*
 * สำหรับใช้ในการเรียกใช้งาน API ให้ใช้งานในรูปแบบ
 * const { data } = await axios.get(API_URL + "/api/...",
 *
 * สำหรับใช้ในการเรียกใช้งาน API Gateway ให้ใช้งานในรูปแบบ
 * const { data } = await axios.get(APIGW_URL + "/api/...",
 *
 * กรณีต้องการเพิ่ม Api ใหม่ ให้เพิ่ม URL ในไฟล์ .env ทั้งหมดและในไฟล์นี้ด้วย
 * เช่น PRMORDER_URL = VITE_PRMORDER_URL;
 **/

export enum PermissionList {
    none = "none",
}
