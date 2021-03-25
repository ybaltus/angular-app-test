import {PostModel} from '../models/Post.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class BlogService {
  posts: PostModel[] = [];
  postsSubject = new Subject<PostModel[]>();
  // postHttpParams= new HttpParams().set('id', '1');

  constructor(
    private httpClient: HttpClient
  ) {
    // this.initThreePosts();
  }

  initThreePosts(){
    const postsData = [
      {
        id: 1,
        title: 'Mon premier post',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      },
      {
        id: 2,
        title: 'Mon deuxième post',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      },
      {
        id: 3,
        title: 'Mon troisième post',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      }
    ];

    for(let post of postsData){
      const newPost = new PostModel(post.title, post.content)
      newPost.setId(post.id);
      this.posts.push(newPost);
    }

    this.emitPosts();
  }

  getPostsOnline(postUrl){
    // this.httpClient.get(postUrl, {params: this.postHttpParams}).subscribe(data => {
    this.httpClient.get(postUrl).subscribe((datas: any[]) => {
      if(datas && datas.length > 0){
        datas.forEach((value, index) => {
          const newPost = new PostModel(value.title, value.body);
          newPost.setId(value.id);
          this.posts.push(newPost);
        })
      }
    });
  this.emitPosts();
  }

  emitPosts(){
    this.postsSubject.next(this.posts);
  }

  createNewPost(newPost: PostModel){
    const postId = this.posts[this.posts.length -1].getId() + 1;
    newPost.setId(postId);
    this.posts.push(newPost);
    this.emitPosts();
  }

  removePost(idPostToRemove: number){
    const indexToRemove = this.posts.findIndex((postElem) => {
      if(postElem.getId() === idPostToRemove){
        return true;
      }
    });

    this.posts.splice(indexToRemove, 1);
    this.emitPosts()
  }
}
