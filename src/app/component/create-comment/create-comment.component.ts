import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from '../../interfaces';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Input() idPost!: any;
  form!: FormGroup;
  constructor(private commentService: CommentService) {}
  @Input() comments!: Comment[];


  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl(null, [
        Validators.maxLength(255),
        Validators.required
      ]),
    })
  }

  submit(){
    console.log(this.idPost)
    if(this.form.invalid){
      return
    }
    const comment:Comment= {
      message: this.form.value.message
    }
    this.commentService.addComment(this.idPost, comment)
    .subscribe((response)=>{
      console.log(response)
      this.comments.unshift(response);
      if(this.comments.length > 14){
        this.comments.pop();
      }
    })
  }
}
