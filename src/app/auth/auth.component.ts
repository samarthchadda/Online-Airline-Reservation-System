import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {
  isLoginMode =true;

   //error handling
  error:string = null;    //initially no error


  constructor(private service:AuthService, private router:Router)
  {

  }
  
  onSwitchMode()
  {   
      //changing it to OPPOSITE of what it was before
      this.isLoginMode = !this.isLoginMode;
                    //  !true -- false,    !false -- true

  }

  onSubmit(form:NgForm)
  {   
      if(!form.valid)
      {
          return; 
      }
  
      const email = form.value.email;
      const password = form.value.password;

    
      //creating variable of 'Observable' type
      let authObs : Observable<AuthResponseData>;

      
          

          //now, we will subscribe only authObs variable in end
          authObs = this.service.login(email,password);
      
          

      this.error = null;
      authObs.subscribe(responseData=>
          {
              console.log(responseData);
              
              //forwarding user to different route (also this is happening here , only when user is successfully logged-in or signed-up)
              this.router.navigate(['/flightList']);

          },
          errorMessage=>
          {
              console.log(errorMessage);
              this.error = errorMessage;                   
            
          });

  //Resetting the Form
      form.reset();
  }


}
