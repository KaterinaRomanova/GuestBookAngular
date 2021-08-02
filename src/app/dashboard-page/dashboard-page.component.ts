import { PusherService } from './../services/pusher.service';
import { User } from './../interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Post } from '../interfaces';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  post!: Post ;
  meta!: Meta;
  currentPage: number = 1;
  pageSize!: number;
  totalItem!: number;
  itemPerPage!: number;
  emailCurrentUser!: string | null;
  isAdmin: boolean | null = (localStorage.getItem('is-admin') === "true")? true :false;
  myEventSubscription: any;

  constructor(
    private postService: PostService,
    private pusher: PusherService
    ) {}

  ngOnInit(): void {
    this.emailCurrentUser = localStorage.getItem("user-email");
    this.postService.getPosts(this.currentPage)
    .subscribe((response)=>{
      console.log(response)
      this.posts = response.data
      this.totalItem = response.meta.total
      this.itemPerPage = response.meta.per_page
    })
    this.myEventSubscription = this.pusher.publicStream$
    .subscribe((data)=>{
      if(this.posts.length > 14){
        this.posts.pop();
      }
      switch(data.type) {
        case "post_added":
          this.posts.unshift(data.data);
          break;
        case "post_deleted":
          this.posts = this.posts.filter(p=>p.id !== data.data.id);
          break;
      }
    })
  }

  ngOnDestroy(): void{
    console.log('отписка посты')
    this.myEventSubscription.unsubscribe();
  }

  delete(postId: any){
    this.postService.deletePost(postId)
      .subscribe(()=>{
        this.posts = this.posts.filter(p=>p.id !== postId);
      })
  }

  getPosts(currentPage: number){
    this.postService.getPosts(currentPage)
    .subscribe((response)=>{
      this.posts = response.data
    })
  }

  setPostUser(post: Post){
    localStorage.setItem("post-user", post.user!.email)
  }
}
