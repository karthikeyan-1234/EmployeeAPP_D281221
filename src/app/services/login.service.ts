import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private http:HttpClient;

  constructor(private handler:HttpBackend) { this.http = new HttpClient(handler) }

  VerifyLogin(userName: string,passWord: string){
    return this.http.post<any>("https://localhost:7265/api/authenticate/login",{UserName: userName,Password: passWord})
  }

  refreshToken(user_name:string,jwt_token:string,refresh_token:string):Observable<any>{
    return this.http.post<any>('https://localhost:7265/api/authenticate/refresh-token',
    {"userName":user_name,"jwtToken":jwt_token,"refreshToken":refresh_token});
  }
}
