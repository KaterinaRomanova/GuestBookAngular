import { PusherService } from './pusher.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Token, User } from "../interfaces";


@Injectable({
  providedIn:'root'
})
export class AuthService{
  private tokenValue: string | null = localStorage.getItem('auth-token');
  errorMessage:string = '';
  currentUser!: User ;
  isAdmin!: string;
  userID!: number ;

  public get token():string | null{
    return this.tokenValue;
  };

  public set token(token: string| null){
    this.tokenValue = token;
  };

  public get userInfo():number{
    return this.userID;
  };

  public set userInfo(user: number){
    this.userID = user;
  };

  constructor(
    private http: HttpClient
  ){};

  register(fd: FormData): Observable<{token: Token, user:User}>{
    return this.http.post<{token: Token, user:User}>('auth/register', fd)
    .pipe(
      tap(
        ({user, token})=>{
          localStorage.setItem('auth-token', token.access_token);
          this.tokenValue =  token.access_token;
          localStorage.setItem("user-email", user.email);
          this.isAdmin = user.is_admin? "true":"false";
          localStorage.setItem("is-admin", this.isAdmin);
          localStorage.setItem("user-id", String(user.id));
        }
      ),
      catchError((error)=>{
        return throwError(error)
      })
    )
  };

  login(user: User): Observable<{token: Token, user: User}>{
    return this.http.post<{token: Token, user:User}>('auth/login', user)
    .pipe(
      tap(
        ({token, user})=>{
          localStorage.setItem("auth-token", token.access_token);
          localStorage.setItem("user-email", user.email);
          this.isAdmin = user.is_admin? "true":"false";
          localStorage.setItem("is-admin", this.isAdmin);
          console.log(user.id)
          localStorage.setItem("user-id", String(user.id));
          this.tokenValue = token.access_token;
        }
      ),
      catchError((error)=>{
        return throwError(error)
      })
    )
  };

  isAuthenticated(): boolean{
    return !!this.tokenValue;
  };

  logout(){
    this.tokenValue = '';
    localStorage.clear();
  };

}


