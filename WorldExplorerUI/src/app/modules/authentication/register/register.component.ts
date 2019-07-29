import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  newUser :User;
  constructor(private authService:AuthService,private router:Router,
  private snackBar:MatSnackBar) { 
    this.newUser=new User();
  }

  ngOnInit() {
  }

  registerUser(){
    console.log("Register User " + this.newUser.userId+" "+this.newUser.password);
    this.authService.registerNewUser(this.newUser).subscribe(
      (res)=>{
        console.log("user data "+res);
        this.router.navigate(['/login']);
      },
      (err)=>{
        this.snackBar.open("Already a registered User",'',{
          duration: 500
        });
      }
    );
    
  }

  clearForm(){
    this.newUser=new User();    
  }

}
