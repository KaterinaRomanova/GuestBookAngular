
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PusherService } from './services/pusher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  
  constructor(
    private authService: AuthService,
    private pushService: PusherService,
    ){}

  title = 'guest-book';
   ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.authService.subject.next(true);
    }

    this.authService.subject.subscribe((res)=>{
      console.log(res)
      if(res){
        this.pushService.conected();
      }else if(res === false){
        this.pushService.disconected();
      }
    })
  }
}
