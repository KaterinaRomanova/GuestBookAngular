import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/interfaces';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;
  @Input() posts!: Post[];
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.maxLength(255),
        Validators.required
      ]),
      message: new FormControl(null, [
        Validators.maxLength(65535),
        Validators.required
      ])
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    const post:Post= {
      title: this.form.value.title,
      message: this.form.value.message
    }
    this.form.reset();
    this.postService.addPost(post)
    .subscribe((response)=>{
      // this.posts.unshift(response);
      // if(this.posts.length > 14){
      // this.posts.pop();
      // }
    })

  }
}
