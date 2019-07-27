import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostItemComponent } from './posts/post-item/post-item.component';

import { DataViewModule} from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { NavComponent } from './nav/nav.component';
import { PostsService } from './_services/posts.service';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      PostListComponent,
      PostItemComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      DropdownModule ,
      DataViewModule
   ],
   providers: [PostsService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
