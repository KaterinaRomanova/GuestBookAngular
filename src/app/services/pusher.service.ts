import { AuthService } from 'src/app/services/auth.service';
import { Injectable, Input } from '@angular/core';
import Echo from 'laravel-echo';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PusherService {
  userId!: string | null;
  echo!: Echo ;
  stream1$: Subject<any> = new Subject<any>();
  stream2$: Subject<any> = new Subject<any>();
  sub1!: Subscription;
  sub2!: Subscription;
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
      this.stream1$.next(data.data);
    });

    this.echo.private(`user.${this.userId}`).listen("UserPush",(data: any) => {
      console.log('подписка');
      this.stream2$.next(data.data);
    });
  }

}

