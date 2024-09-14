import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    username: "",
    password: ""
  };

  errorMessage: string | null = null;

  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  validate(): boolean {
    debugger
    if (this.loginObj.username.trim() === "" || this.loginObj.password.trim() === "") {
      this.errorMessage = "Both Username and Password fields are required.";
      return false;
    }
    this.errorMessage = null;
    return true;
  }

  onLogin() {
    if (!this.validate()) {
      return;
    }

    this.http.get('/assets/user.json').subscribe((users: any) => {
      const user = users.find((u: any) => u.username === this.loginObj.username && u.password === this.loginObj.password);
      if (user) {
        this.authService.setUserLoggedIn(true);
        this.router.navigate(['/flight']);
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    }, (error) => {
      console.error('Error fetching user data', error);
      this.errorMessage = 'Failed to load user data';
    });
  }
}
