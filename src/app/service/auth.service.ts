import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOGIN_ENDPOINT } from "../app.constants";
import { LoginResponse } from "../dto/response/login.response";
import jwt_decode,{ JwtPayload } from "jwt-decode";

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

    forgotPassword(): void {

    }

    logout():void{
        localStorage.clear();
        this.router.navigate(['login']);
    }

    setSession(token: string) {
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode<CurrentUser>(token);
        localStorage.setItem('lbz', decodedToken.sub);
        console.log(decodedToken);
        this.router.navigate(['/']);
    }

    hasPermission(permission: string): boolean {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode<CurrentUser>(token!);
        return decodedToken.permissions.includes(permission);
    }
}