import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOGIN_ENDPOINT } from "./app.constants";

export interface LoginResponse {
    jwt: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient,private router:Router) {
    }

    login(username: string, password: string) {
        return this.httpClient.post<LoginResponse>(LOGIN_ENDPOINT, {username, password})
            .subscribe({
                next: (res) => this.storeToken(res.jwt),
                error: (e) => {
                    console.log(e);
                    if (e.status == 401) {
                        alert('Pogrešno korisničko ime ili lozinka. Pokušajte ponovo.');
                    }
                }
            }
        );
    }

    private storeToken(jwt: string) {
        localStorage.setItem('token', jwt);
    }

    isLoggedIn() {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token') !== null;
    }

    forgotPassword(): void {

    }

    logout():void{
        localStorage.clear();
        this.router.navigate(['']);
    }
}