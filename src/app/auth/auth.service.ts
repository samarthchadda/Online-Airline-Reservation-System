import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject} from 'rxjs';    //It Creates a new observable that wraps an error
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData
{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId : string;
    registered?:boolean; //it is optional
}

@Injectable ({
    providedIn :'root'

})

export class AuthService
{ 
    //storing the authenticated users as SUBJECT
                        //it is of generic type 'User'
    userSub = new Subject<User>();

    //We emit (next) a new user , whenever we have a user to login  and   also when user logout

    
    constructor(private http:HttpClient, private router:Router)
    {

    }

  
    
    login(emailUser:string, pwd:string)
    {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuvB2xeTVtJobhLDrQOi_5iCvVzvdqJWQ',
        {
            email: emailUser,
            password: pwd,
            returnSecureToken:true   
          }
        ).pipe(catchError(this.handleError),tap(resData=>{

            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            
        }));

        //we will get almost the same response , as for signing up. But 'registered' field is extra here.
    }
    

     
    logout()
    {
            //now emitting no user  (setting our User to null)
        this.userSub.next(null);
        //redirecting to different component
        this.router.navigate(['/auth']);
    }





    private handleAuthentication(email:string,userID:string, token:string, expiresIn:number)
    {
        //expiresIn in response, holds the number of seconds until the idToken expires
                        //But we need time at which idToken expires

      //current timestamp in millsec ( to which we add expiresIn)
         const expDate = new Date(new Date().getTime() + expiresIn*1000);  
          //extra '+' is added to convert it into number
         
          //creating new user
         const newUser = new User(email, userID, token, expDate);
        
         //Like ,  emitting the currently logged in user
          this.userSub.next(newUser);

          
          //storing the token in localstorage
                        //setItem() allows us to write an item to local storage(to store data there)
                                //KEY(using which we can retrieve this data later), VALUE(data we want to store corresponding to that key)
          localStorage.setItem('userData',JSON.stringify(newUser));

        
       //stringify() serializes the JS object (it converts JS object to string)
                  
    }


    autoLogin()
    {
        //now we will retrieve all data from local storage , whenever the application restarts
                        //Converts the JSON string back to the JS OBJECT
        const userInfo :{
            email:string,
            id:string,
            _token:string,
            _tokenExpDate :string //we need to convert it into Date() manually
        }               = JSON.parse(localStorage.getItem('userData'));
        console.log(userInfo);
        //checking if that data key exists
        if(!userInfo)
        {
            return;
        }
        
        const loadedUser = new User(userInfo.email,userInfo.id, userInfo._token, new Date(userInfo._tokenExpDate));

        //now we check if this user has a valid token
        if(loadedUser.token)    //get property in model
        {
            this.userSub.next(loadedUser);
             
        }

    }



    //Handling error commonly for both signup and signin
    private handleError(errorRes: HttpErrorResponse)
    {
        let errorMsg = 'An Unknown Error Occured!!';    //our default error message
         if(!errorRes.error || !errorRes.error.error){
               return throwError(errorMsg);
             }
                            
          switch(errorRes.error.error.message)
            {
              case 'EMAIL_EXISTS':
                errorMsg = 'This email exists already!';
                break;
                //for Login errors
              case 'EMAIL_NOT_FOUND':
                  errorMsg = "This email does not exist!";
                  break;
              case 'INVALID_PASSWORD':
                  errorMsg = "This password is not correct!";
                  break;
                 
            }
           return throwError(errorMsg);  

    }


}