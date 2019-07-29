import { Injectable } from '@angular/core';


import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { Observable } from 'rxjs';

export const TOKEN_NAME:string="jwt_token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authEndPoint:string;
  token: string;

  constructor(private http:HttpClient) {
    this.authEndPoint="http://localhost:2213/api/v1/userservice";
   }

   registerNewUser(data: User){
    return this.http.post(`${this.authEndPoint}/register`,data,{responseType: 'text'});
   }

   loginUser(data: User){
      return this.http.post(`${this.authEndPoint}/login`,data);
   }

   setToken(token:string){
    return localStorage.setItem(TOKEN_NAME,token);
  }

  getToken(){
    return localStorage.getItem(TOKEN_NAME);
  }
  removeToken(){
    return localStorage.removeItem(TOKEN_NAME);
  }

  getTokenExpirationDate(token : string):Date{
    const decoded= jwt_decode(token);

    if(decoded.exp===undefined)
    return null;
    const date=new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token ?: string) :boolean{
    if(!token)
    token=this.getToken();

    if(!token)
    return true;

    const date=this.getTokenExpirationDate(token);
 
    if(date===undefined || date===null)
    {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }
}
