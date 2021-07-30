import { CreatePostComponent } from './component/create-post/create-post.component';
import { UserComponent } from './component/user/user.component';
import { PostComponent } from './component/post/post.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from './component/create-comment/create-comment.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MyInterceptor } from './services/myinterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    DashboardPageComponent,
    MainLayoutComponent,
    PostComponent,
    UserComponent,
    CreateCommentComponent,
    CreatePostComponent,
    PostPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true
  }, { provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
