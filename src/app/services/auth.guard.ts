import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated() || localStorage.getItem('auth-token')) {
      return true
    } else {
      this.router.navigate(['/login'],{
        queryParams:{
          loginAgain: true
        }
      })
      this.auth.logout();
      return false
    }
  }
}

