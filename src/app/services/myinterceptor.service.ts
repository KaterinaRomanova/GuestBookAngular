import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MyInterceptor implements HttpInterceptor{
  constructor(){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let header = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('auth-token'))
    .set('Content-Type', 'application/json');
    const request = req.clone({headers: header});
    return next.handle(request);
  }
}

