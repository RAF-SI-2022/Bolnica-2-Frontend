import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOGIN_ENDPOINT, RESET_PASSWORD_ENDPOINT, UPDATE_PASSWORD_ENDPOINT } from "../app.constants";
import { LoginResponse } from "../dto/response/login.response";
import jwt_decode,{ JwtPayload } from "jwt-decode";
import { ResetPasswordResponse } from "../dto/request/employee.request";

export interface CurrentUser {
    departmentName: string,
    exp: number,
    firstName: string,
    hospitalName: string,
    iat: number,
    lastName: string,
    pbb: string,
    pbo: string,
    permissions: string[],
    profession: string,
    sub: string,
    title: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient,
                private router: Router) {
    }

    login(username: string, password: string) {
        return this.httpClient.post<LoginResponse>(LOGIN_ENDPOINT, {username, password});
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    forgotPassword(email: string) {
        return this.httpClient.post<ResetPasswordResponse>(RESET_PASSWORD_ENDPOINT, {email: email}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }

    resetPassword(resetToken: string, newPassword: string) {
        return this.httpClient.post<ResetPasswordResponse>(UPDATE_PASSWORD_ENDPOINT, {resetToken: resetToken, password: newPassword}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    setSession(token: string): void {
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode<CurrentUser>(token);
        localStorage.setItem('lbz', decodedToken.sub);
        localStorage.setItem('permissions', JSON.stringify(decodedToken.permissions));
        console.log(decodedToken);
        this.router.navigate(['/']);
    }

    hasPermission(permission: string): boolean {
        return JSON.parse(localStorage.getItem('permissions')!).includes(permission);
    }

    hasEitherPermission(permissions: string[]): boolean {
        return JSON.parse(localStorage.getItem('permissions')!).some((permission: string) => permissions.includes(permission));
    }
}