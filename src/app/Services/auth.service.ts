import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5280/api/Auth/login'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { username: string, password: string }) {
    this.http.post<{ token: string }>(this.apiUrl, credentials)
      .subscribe(response => {
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['/dashboard']); // Redirigez vers la page souhaitée
      }, error => {
        console.error('Erreur d\'authentification', error);
      });
  }


  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
