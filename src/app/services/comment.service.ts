import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, Links, Meta } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor( private http: HttpClient ){};

  getComments(postId: number, numberPage: number): Observable<{data:Comment[], links: Links, meta: Meta}>{
    return this.http.get<{data:Comment[], links: Links, meta: Meta}>(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers?page=${numberPage}`)
  };

  addComment(postId: number, comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers`,comment)
  };

  deleteComment(postId: any, answerId: any): Observable<{response: boolean}>{
    return this.http.delete<{response: boolean}>(`https://guest-book.naveksoft.com/api/v1/posts/${postId}/answers/${answerId}`)
  };
}
