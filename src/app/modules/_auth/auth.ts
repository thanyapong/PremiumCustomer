import { createContext, useContext } from "react";
import { AuthContextType, PermissionCondition } from "./auth.d";
import { PermissionList } from "../../../Const";

const defaultAuthContext: AuthContextType = {
    isAuthenticated: false,
    authTokens: "",
    roles: [],
    permissions: [],
    user: null,
    userProfile: null,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);



export const checkPermissions = (
    permissions: AuthContextType["permissions"],
    pagePermissions: PermissionList[],
    conditon: PermissionCondition = "OR"
) => {
    if (pagePermissions.length === 0) return true;
    if (conditon === "OR") return pagePermissions.some((p) => permissions.includes(p));

    return pagePermissions.every((p) => permissions.includes(p));
};

export const checkRole = (
    roles: AuthContextType["roles"],
    pageRoles: string[],
    conditon: PermissionCondition = "OR"
) => {
    if (pageRoles.length === 0) return true;
    if (conditon === "OR") return pageRoles.some((p) => roles.includes(p));

    return pageRoles.some((p) => roles.includes(p));
};
