import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PusherService {
  userId!: string | null;
  echo!: Echo ;
  publicStream$: Subject<any> = new Subject<any>();
  privateStream$: Subject<any> = new Subject<any>();

  constructor(private auth: AuthService) {}

  connection(){
    this.userId = localStorage.getItem("user-id");
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'key',
      wsHost: 'guest-book.naveksoft.com',
      wsPort: '443',
      wssPort: '443',
      wsPath: '/ws',
      encrypted: true,
      authEndpoint: 'https://guest-book.naveksoft.com/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          Accept: 'application/json'
        },
      },
      enabledTransports: ['ws', 'wss'],
      disableStats: true
    });

    this.echo.channel("posts").listen("PublicPush", (data: any) => {
      console.log('подписка');
      this.publicStream$.next(data.data);
    });

    this.echo.private(`user.${this.userId}`).listen("UserPush",(data: any) => {
      console.log('подписка');
      this.privateStream$.next(data.data);
    });
  }

}

