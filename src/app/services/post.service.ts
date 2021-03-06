import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Links, Meta, Post } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(numberPage: number): Observable<{data:Post[], links: Links, meta: Meta}>{
    return this.http.get<{data:Post[], links: Links, meta: Meta}>(`posts?page=${numberPage}`)
  };

  addPost(post:Post): Observable<Post>{
    return this.http.post<Post>('posts',post)
  };

  deletePost(postId: any): Observable<{response: boolean}>{
    return this.http.delete<{response: boolean}>(`posts/${postId}`)
  };

}
