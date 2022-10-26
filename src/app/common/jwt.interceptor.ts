import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpBackend,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private http:HttpBackend,private router:Router,private service:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    try{
    var jwt_token = JSON.parse(localStorage.getItem("jwt_token")!).token;
    var refresh_token = JSON.parse(localStorage.getItem("refresh_token")!).token;
    var user_name = JSON.parse(localStorage.getItem("jwt_token")!).userName;
    }catch(e){
      console.log("Error in retrieving jwt_token from local storage");
      console.log(e);
      this.router.navigate(['']);
    }
    var new_request = request.clone({
      setHeaders:{
        "Authorization": 'Bearer ' + jwt_token
      }
    });

    return next.handle(new_request).pipe(catchError(err => {
      console.log("JWT Authorization failed. Trying to refresh the Token.!");
      var second_req = new_request;

      if(err instanceof HttpErrorResponse){
        console.log("Inside HttpErrorResponse Handler");
        console.log(err.status);
        if(err.status === 401 || err.status ===0){
          console.log("Refreshing JWT token using Refresh Token");
          console.log(user_name + ' [' + jwt_token + '] [' + refresh_token + ']');
          
          return this.service.refreshToken(user_name!,jwt_token!,refresh_token!).pipe(
            switchMap((result:any) =>{
            console.log("Refresh Token :");
            console.log(result);

            jwt_token = result.jwtToken.token;
            refresh_token = result.refreshToken.token;
            user_name = result.jwtToken.userName;

            localStorage.setItem("jwt_token",JSON.stringify(result.jwtToken));
            localStorage.setItem("refresh_token",JSON.stringify(result.refreshToken));

            second_req = request.clone({
              setHeaders:{
                "Authorization": 'Bearer ' + jwt_token,
                "Accept-Language": 'fr-FR'
              }
                      
            });

            return next.handle(second_req);  
          }),catchError((err) => {
            console.log("Refresh token expired too. Redirecting to Sign In");
            console.log(err);
            this.router.navigate(['']);
            return throwError(() => new Error('test'));
          })
        )}
      }
      this.router.navigate(['']);
      return next.handle(second_req);

    }));
  }
}
