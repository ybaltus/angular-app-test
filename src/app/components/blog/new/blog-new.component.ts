import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../../services/blog.service';
import {Router} from '@angular/router';
import {PostModel} from '../../../models/Post.model';

@Component({
  selector: 'app-blog-new',
  templateUrl: './blog-new.component.html',
  styleUrls: ['./blog-new.component.scss']
})
export class BlogNewComponent implements OnInit {
  blogForm: FormGroup;

  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private router: Router
              ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.blogForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  onSubmitForm(){
    const formValues = this.blogForm.value;

    const newPost = new PostModel(
      formValues['title'],
      formValues['content']
    );
    this.blogService.createNewPost(newPost);
    this.router.navigate(['/blog']);
  }
}
