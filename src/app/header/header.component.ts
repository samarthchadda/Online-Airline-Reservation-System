import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;

  private userSubject :Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void
  {
    //subscribing the SUBJECT
                                                //here we get a user object
   this.userSubject = this.authService.userSub.subscribe(user=>
    {
            //if user is present , then it means we are logged in
            this.isAuthenticated  = !user ? false: true;
                                //the Above is same as -
                                //   !!user
            
    });
        
    //these cutom subscription needs to be manege by us (so we destroy them too)

  }

  onLogout()
  {
    this.authService.logout();
  }

  ngOnDestroy()
  {
    this.userSubject.unsubscribe();
  }

}
