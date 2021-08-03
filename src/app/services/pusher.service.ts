import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PusherService {
  connection(): Echo {
    throw new Error('Method not implemented.');
  }
  userId!: string | null;
  echo!: Echo;
  publicStream$: Subject<any> = new Subject<any>();
  privateStream$: Subject<any> = new Subject<any>();

  constructor() {}

  conected(){
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
    this.userId = localStorage.getItem("user-id");
    this.echo.channel("posts").listen("PublicPush", (data: any) => {
      console.log('подписка');
      this.publicStream$.next(data.data);
    });

    this.echo.private(`user.${this.userId}`).listen("UserPush",(data: any) => {
      console.log('user', this.userId);
      this.privateStream$.next(data.data);
    });
    return this.echo;
  }

  disconected(echo: Echo){
    echo.channel("posts").stopListening("PublicPush");
    console.log(localStorage.getItem("user-id"))
    echo.private(`user.${localStorage.getItem("user-id")}`).stopListening("UserPush");
  }

}

