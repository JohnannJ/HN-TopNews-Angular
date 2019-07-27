import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../_models/post';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input() postId: number;
  post: Post;
  constructor(private postService: PostsService) {}

  ngOnInit() {


    this.postService.getPost(this.postId).subscribe(itm => {
        this.post = itm;
      },
      error => {console.log ('Error fetching item');
      });
    }

}
