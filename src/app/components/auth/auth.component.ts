import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {
  authStatus: boolean;
  @ViewChild('divSpinner', {static: false}) divSpinner: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
    console.log(this.divSpinner);
  }

  ngAfterViewInit() {
    // child is set
    console.log(this.divSpinner);
  }

  onSignIn(){
    this.renderer.removeAttribute(this.divSpinner.nativeElement, 'hidden');

    this.authService.signIn().then(
      ()=>{
        console.log('Sign in successfull');
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['appareils']);
      }
    )
  }

  onSignOut(){
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }
}
