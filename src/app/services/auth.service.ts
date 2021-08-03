import { PusherService } from './pusher.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Token, User } from "../interfaces";
import Echo from 'laravel-echo';


@Injectable({
  providedIn:'root'
})
export class AuthService{
  private tokenValue: string | null = localStorage.getItem('auth-token');
  errorMessage:string = '';
  currentUser!: User ;
  isAdmin!: string;
  userID!: number ;
  echo!: Echo;

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
    private http: HttpClient,
    private pusher: PusherService
  ){};

  register(fd: FormData): Observable<{token: Token, user:User}>{;
    return this.http.post<{token: Token, user:User}>('auth/register', fd)
    .pipe(
      tap(
        ({user, token})=>{
          this.setInfo(token, user)
          this.echo = this.pusher.conected();
          console.log(this.echo)
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
          this.setInfo(token, user)
          this.echo = this.pusher.conected()
        }
      ),
      catchError((error)=>{
        return throwError(error)
      })
    )
  };

  setInfo(token: Token, user: User){
    this.tokenValue = token.access_token;
    this.isAdmin = user.is_admin? "true":"false";
    localStorage.setItem("auth-token", token.access_token);
    localStorage.setItem("user-email", user.email);
    localStorage.setItem("is-admin", this.isAdmin);
    localStorage.setItem("user-id", String(user.id));
  }

  isAuthenticated(): boolean{
    return !!this.tokenValue;
  };

  logout(){
    this.pusher.disconected(this.echo);
    this.tokenValue = '';
    localStorage.clear();
  };

}


