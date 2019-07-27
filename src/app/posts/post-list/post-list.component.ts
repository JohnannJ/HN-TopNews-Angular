import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostsService } from '../../_services/posts.service';
import { Post } from '../../_models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  postIds: number[] = [];
  
  selectedPost: Post;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  constructor(
    private postService: PostsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {

   //  this.spinner.show();

    this.postService.getTopPosts().subscribe(data => this.postIds = data);

    this.sortOptions = [
      { label: 'Newest First', value: '!time' },
      { label: 'Oldest First', value: 'time' }
    ];
  }

  selectPost(event: Event, postId: number) {
    this.postService.getPost(postId).subscribe(itm => {
      this.selectedPost = itm;
    },
    error => {console.log ('Error fetching item');
    });
    this.displayDialog = true;
    event.preventDefault();
  }

  

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedPost = null;
  }
}
