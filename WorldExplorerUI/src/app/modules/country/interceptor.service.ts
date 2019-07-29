import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private authService:AuthService) { }

  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
   
    if(request.headers.has('DoNotIntercept')) {
      request = request.clone({
        headers: request.headers.delete(
          'DoNotIntercept'
        )
      });
      return next.handle(request);
    }else{

    }
    request= request.clone({
      setHeaders:{
        Authorization :`Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
