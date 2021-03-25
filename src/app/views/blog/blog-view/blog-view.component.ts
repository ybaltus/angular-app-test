import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostModel} from '../../../models/Post.model';
import {BlogService} from '../../../services/blog.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit, OnDestroy {
  posts: PostModel[];
  postSubscription: Subscription;
  postsUrl: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    // this.posts = this.blogService.posts;
    this.postSubscription = this.blogService.postsSubject.subscribe(
      (posts: any[])=>{
        // this.posts = this.blogService.getPostsOnline(this.postsUrl);
        this.posts = posts;
      }
    );

    this.blogService.getPostsOnline(this.postsUrl);
    this.blogService.emitPosts();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
