import { TestBed, fakeAsync, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { HttpClientModule , HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';


const testConfig = {

  addUser: {
    positive: {
      firstName: 'test',
      lastName: 'testLast',
      userId: 'testUser',
      password: 'testPass'
    }
  },

  loginUser: {
    positive: {
      firstName: '',
      lastName: '',
      userId: 'testUser',
      password: 'testPass'
    }
  }
}


describe('AuthServiceService', () => {
  let authService : AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.get(AuthService);

  });

  it('should be created Auth Service', 
   inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should register user data', fakeAsync(() => {
    let data = testConfig.addUser.positive;
    inject([AuthService, HttpTestingController], (backend: HttpTestingController) => {
      const mockReq = backend.expectOne(authService.authEndPoint);
      expect(mockReq.request.url).toEqual(authService.authEndPoint, 'request url should match with json server api url');
      expect(mockReq.request.method).toBe('POST', 'Should handle requested method type');
      mockReq.flush(data);
      backend.verify();
    });
    authService.registerNewUser(data).subscribe((res: any) => {
      expect(res).toBeDefined();
      expect(res._body).toBe(data, 'data should be same');
    });
  }));

  it('should login user', fakeAsync(() => {
    let userData = testConfig.loginUser.positive;
    inject([AuthService, HttpTestingController], (backend: HttpTestingController) => {
      const mockReq = backend.expectOne(authService.authEndPoint);
      expect(mockReq.request.url).toEqual(authService.authEndPoint, 'request url should match with json server api url');
      expect(mockReq.request.method).toBe('POST', 'Should handle requested method type');
      mockReq.flush(userData);
      backend.verify();
    });
    authService.loginUser(userData).subscribe((res: any) => {
      expect(res).toBeDefined();
      expect(res._body).toBe(userData, 'data should be same');
    });
  }));

});
