import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { PusherService } from '../services/pusher.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup ;
  message!:string;

  constructor(
    private auth: AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private pusher: PusherService
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if(params['loginAgain']){
        this.message="Введите данные"
      }else{
        this.message =''
      }
    })
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ])
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    const user: User={
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe((response)=>{
      this.form.reset();
      if(response.user){
        this.router.navigate(['home']);
      }else{
        this.message ='Данного пользователя не существует'
      }
    }, error => {
      console.error(error);
      this.message= error.error.message
    })
  }


}
