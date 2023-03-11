import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOGIN_ENDPOINT } from "../app.constants";
import { LoginResponse } from "../auth/login.response";

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
}