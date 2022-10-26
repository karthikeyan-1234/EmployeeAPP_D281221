import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName!: string;
  passWord!: string;

  constructor(private router:Router,private service:LoginService) { }

  ngOnInit(): void {
  }

  CheckLogin(){
    console.log("Verifying login..");
    console.log(this.userName + ' - ' + this.passWord);
    this.service.VerifyLogin(this.userName,this.passWord).subscribe(
    (res) => {
      console.log(res);
      localStorage.setItem("jwt_token",JSON.stringify(res.jwtToken));
      localStorage.setItem("refresh_token",JSON.stringify(res.refreshToken));
      this.router.navigate(['employee']);
    },
    (err) => {
      console.log(err);
    }
    )
  }

}
