import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { PostPageComponent } from './post-page/post-page.component';

const routes: Routes =[
  {
    path:'', component: MainLayoutComponent, children:[
      {path:'', redirectTo:'/login', pathMatch:'full'},
      {path:'login', component: LoginPageComponent},
      {path:'register', component: RegisterPageComponent},
      {path:'posts/:id', component: PostPageComponent},
      {path:'home', component: DashboardPageComponent, canActivate:[AuthGuard]},
      {path:'**', redirectTo:'/home', pathMatch:'full'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService, CommentService, PostService]
})
export class AppRoutingModule {

}
