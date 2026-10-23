import {inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true;
  }

  alert('Bạn chưa đăng nhập, vui lòng đăng nhập để truy cập trang này!');
  return router.parseUrl('/login');
};
