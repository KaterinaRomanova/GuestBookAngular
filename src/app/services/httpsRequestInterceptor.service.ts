import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor{
  constructor(){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let header = new HttpHeaders()
    .set('Authorization', 'Bearer ' + localStorage.getItem('auth-token'))
    .set('Content-Type', 'application/json');
    const request = req.clone({headers: header, url: `https://guest-book.naveksoft.com/api/v1/${req.url}`});
    return next.handle(request);
  }
}

