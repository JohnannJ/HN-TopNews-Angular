import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap, map, publishReplay, refCount } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import { Post } from '../_models/post';

const CACHE_SIZE = 1;
const PAGE_SIZE = 30;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = environment.apiUrl;
  ids;
  posts;

  constructor(private http: HttpClient) {}

  getPostsCache() {
    if (!this.ids) {
      this.http.get(this.baseUrl + 'topPosts.json').pipe(
        map(data => (this.ids = data)),
        publishReplay(1), // this tells Rx to cache the latest emitted
        refCount()
      );
    }

    return this.ids;
  }

  getPostsDetails() {
    return this.getPostsCache().pipe(
      mergeMap((ids: number[]) => this.getPosts(ids.slice(0)))
    );
  }

  getPostsDetailsCache() {
    if (!this.posts) {

     this.getTopPosts()
      .pipe(mergeMap((ids: number[]) => this.getPosts(ids.slice(0))))
      .pipe(
        map(data => (this.posts = data)),
        publishReplay(1), // this tells Rx to cache the latest emitted
        refCount()
      );
    }

    return this.posts;
  }

  getPosts(ids: number[]) {
    return from(ids).pipe(
      mergeMap((id: number) => this.getPost(id) as Observable<Post>)
    );
  }

  getTopPosts(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + 'topPosts.json');
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + 'post/' + id + '.json');
  }
}
