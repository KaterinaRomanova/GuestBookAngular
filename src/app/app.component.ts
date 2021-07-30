import { PusherService } from './services/pusher.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(push:PusherService){
    push.connection();
  }
  title = 'guest-book';

}
