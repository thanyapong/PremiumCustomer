import axios from "axios";
import { VITE_CA_URL } from "../../../../Const";

const CA_URL = `${VITE_CA_URL}/signingimage`;

//----------------------------------------------------------------- CA -----------------------------------------------------------------------------
export const CaPDF = (data: any) => {
    let formData = new FormData();
    formData.append("PdfFileBase64", data.PdfFileBase64);
    formData.append("RefNo", data.RefNo);
    formData.append("FileName", data.FileName);
    formData.append("ImgFileBase64", data.ImgFileBase64);
    return axios
        .post(`${CA_URL}`, formData)
        .then((res) => {
            if (res.status === 200) {
                return res.data;
            } else {
                throw Error(res.data.msg);
            }
        })
        .catch((err) => {
            throw err;
        });
};