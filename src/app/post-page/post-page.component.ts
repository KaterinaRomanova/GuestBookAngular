import { PusherService } from './../services/pusher.service';
import { PostService } from 'src/app/services/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Comment, Post } from 'src/app/interfaces';
import { CommentService } from 'src/app/services/comment.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit, OnDestroy {
  postId! : number;
  comments: Comment[] = [];
  currentPage: number = 1;
  totalItem!: number;
  itemPerPage!: number;
  postUser = localStorage.getItem("post-user");
  currentUser = localStorage.getItem("user-email");
  isAdmin: boolean | null = (localStorage.getItem('is-admin') === "true")? true :false;
  meta!: Meta;
  post!:Post;
  myEventSubscription: any;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private location: Location,
    private pusher: PusherService
    ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.id;
    this.commentService.getComments(this.postId, 1)
    .subscribe((response)=>{
      this.comments = response.data;
      this.totalItem = response.meta.total
      this.itemPerPage = response.meta.per_page
    })

    this.myEventSubscription = this.pusher.privateStream$
    .subscribe((data)=>{
      if(data.data.post.user_id === data.data.user_id){return}
      if(this.comments.length > 14){
        this.comments.pop();
      }
      switch(data.type) {
        case "answer_added":
          this.comments.unshift(data.data);
          break;
        case "answer_deleted":
          this.comments = this.comments.filter(p=>p.id !== data.data.id);
          break;
        }
    })
  }

  ngOnDestroy(): void{
    console.log('отписка')
    this.myEventSubscription.unsubscribe();
  }

  delete(commentId: any){
    this.commentService.deleteComment(this.route.snapshot.params.id, commentId)
      .subscribe(()=>{
        this.comments = this.comments.filter(p=>p.id !== commentId);
      })
  }

  getComments(currentPage: number){
    this.commentService.getComments(this.postId, currentPage)
    .subscribe((response)=>{
      this.comments = response.data;
    })
  }

  goBack(){
    this.location.back();
  }

}
