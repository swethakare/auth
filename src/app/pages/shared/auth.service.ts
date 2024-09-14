import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  private isLoggedIn = false;
  getUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
  setUserLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }
}
