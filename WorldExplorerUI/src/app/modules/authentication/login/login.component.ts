import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser:User;
  isInvalidUser:boolean=false;
  constructor(private authService:AuthService,
    private router:Router,
  private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.newUser=new User();
  }
  loginUser(){
    this.authService.loginUser(this.newUser).subscribe(
      (data)=>{
        if(data['token'])
        {
          this.isInvalidUser=false;;
          this.snackBar.open("Successfully Logged In",'',{
            duration: 500
          });
          this.authService.setToken(data['token']);
          this.router.navigate(['/countries']);
        }
      },
    (err)=>{
      this.isInvalidUser=true;
    } );
    // this.router.navigate(['/register']);
   
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
