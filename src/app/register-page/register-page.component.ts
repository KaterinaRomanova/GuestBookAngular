import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '../my.validators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup ;
  message!:string;
  selectedFile!: File | null;

  constructor(
    private auth: AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
      this.form = this.formBuilder.group({
        email:[null, [
          Validators.email,
          Validators.required
        ]],
        password: [null,[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255)
        ]],
        confirmPassword: [null,[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ]],
        name: [null,[
          Validators.required,
          Validators.maxLength(255)
        ]],
        file: [null,[
          Validators.maxLength(10000),
        ]]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      })
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit(){
    if(this.form.invalid){
      return
    }
    const fd = new FormData();
    fd.append('name', this.form.value.name);
    fd.append('password_confirmation', this.form.value.confirmPassword);
    fd.append('email', this.form.value.email);
    fd.append('password', this.form.value.password);
    console.log(this.selectedFile);
    if(this.selectedFile){
      fd.append('avatar', this.selectedFile, this.selectedFile.name);
    }
    this.form.reset();

    this.auth.register(fd).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/home'])
    }, error => {
      console.error(error);
      this.message= error.error.message
    })
  }

}
