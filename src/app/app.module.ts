import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

//Components
import { AppComponent } from './app.component';
import {
  AppareilComponent,
  AppareilEditComponent,
  AppareilSingleComponent,
  AppareilViewComponent,
  AuthComponent,
  BlogComponent,
  BlogNewComponent,
  BlogViewComponent,
  FourOhFourComponent,
  UserListComponent,
  UserNewComponent,
  UserViewComponent,
  UploadFichierComponent,
  ReadCsvComponent
} from './components';

//Services
import { AppareilService} from './services/appareil.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user-service';
import { BlogService } from './services/blog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UploadFileService} from './services/uploadFile.service';

//Material UI
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {ReadCsvService} from './services/read-csv.service';

//Routes
const appRoutes: Routes = [
  { path: 'appareils', canActivate:[AuthGuardService], component: AppareilViewComponent },
  { path: 'appareils/edit', canActivate:[AuthGuardService], component: AppareilEditComponent },
  { path: 'appareils/:id', canActivate:[AuthGuardService], component: AppareilSingleComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'users', component: UserViewComponent },
  { path: 'users/new', component: UserNewComponent },
  { path: 'blog', component: BlogViewComponent },
  { path: 'blog/new', canActivate:[AuthGuardService], component: BlogNewComponent },
  { path: 'upload-file', component: UploadFichierComponent},
  { path: '', component: AppareilViewComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    BlogComponent,
    AuthComponent,
    AppareilViewComponent,
    BlogViewComponent,
    AppareilSingleComponent,
    FourOhFourComponent,
    AppareilEditComponent,
    UserListComponent,
    UserNewComponent,
    BlogNewComponent,
    UserViewComponent,
    UploadFichierComponent,
    ReadCsvComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule
  ],
  providers: [
    AppareilService,
    AuthService,
    AuthGuardService,
    UserService,
    BlogService,
    UploadFileService,
    ReadCsvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
