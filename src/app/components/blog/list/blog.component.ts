import {Component, OnInit, Input} from '@angular/core';
import {BlogService} from '../../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() loveIts: number = 0;
  @Input() blogTitle: string;
  @Input() blogContent: string;
  @Input() id: number;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
  }

  getCurrentDate(){
    return new Date();
  }

  setColor(){
    if(this.loveIts > 0){
      return 'green';
    }else if(this.loveIts < 0){
      return 'red';
    }
  }

  onLove(){
    this.loveIts ++;
    console.log(this.loveIts);

  }

  onUnLove(){
    this.loveIts --;
    console.log(this.loveIts);
  }

  onRemove(){
    this.blogService.removePost(this.id);
  }

}
