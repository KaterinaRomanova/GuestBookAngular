import { PusherService } from './../../services/pusher.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Comment } from 'src/app/interfaces';
import { CommentService } from 'src/app/services/comment.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // postId! : number;
  // comments: Comment[] = [];
  // currentPage: number = 1;
  // pageSize!: number;
  // totalItem!: number;
  // itemPerPage!: number;
  // meta!: Meta;

  // constructor(
  //   private commentService: CommentService,
  //   private route: ActivatedRoute,
  //   private location: Location,
  //   private router: Router,
  //   private pusher: PusherService
  //   ) {}

  ngOnInit(): void {
  //   this.postId = this.route.snapshot.params.id;
  //   this.commentService.getComments(this.postId, 1)
  //   .subscribe((response)=>{
  //     console.log(response)
  //     this.comments = response.data;
  //     this.totalItem = response.meta.total
  //     this.itemPerPage = response.meta.per_page
  //   });
  //   console.log('post works')
  //   this.pusher.stream2$
  //   .subscribe((data)=>{
  //     console.log(data);
  //     if(this.comments.length > 14){
  //       this.comments.pop();
  //     }
  //     switch(data.type) {
  //       case "post_added":
  //         this.comments.unshift(data.data);
  //         console.log('доб',this.comments)
  //         break;
  //       case "post_deleted":
  //         this.comments = this.comments.filter(p=>p.id !== data.data.id);
  //         break;
  //       }
  //   })
  }

  // delete(commentId: any){
  //   this.commentService.deleteComment(this.route.snapshot.params.id, commentId)
  //     .subscribe(()=>{
  //       this.comments = this.comments.filter(p=>p.id !== commentId);
  //     })
  // }

  // getComments(currentPage: number){
  //   this.commentService.getComments(this.postId, currentPage)
  //   .subscribe((response)=>{
  //     this.comments = response.data;
  //   })
  // }

  // goBack(){
  //   this.location.back();
  // }

}
