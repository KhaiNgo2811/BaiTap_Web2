import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../classes/UserLogin';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  constructor(private router: Router) {}

  user = new UserLogin();

  onLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    alert('Đăng nhập thành công!');
    this.router.navigate(['/lazyinfo']);
  }

  onLogout() {
    localStorage.setItem('isLoggedIn', 'false');
    alert('Bạn đã đăng xuất.');
    this.router.navigate(['/login']);
  }
}


