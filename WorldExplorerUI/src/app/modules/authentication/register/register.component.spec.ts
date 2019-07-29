import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Location } from '@angular/common';
import { of } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from '../auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatCardModule, MatDividerModule, MatSnackBarModule, MatButtonModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

const testConfig = {
  userData: {
    firstName: 'test',
    lastName: 'testLast',
    userId: 'testUser',
    password: 'testPass'
  }
}

class AuthServiceStub {
  currentUser: any;
  
  constructor() {

   }

  register(credentials) {
    if(credentials.userId == testConfig.userData.userId) {
      console.log('data:::', this.currentUser);
      return of(credentials.userId);
    } else {
      return of(false);
    }
  }
}

class dummy {

}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let spyUser: any;
  let routes: Router;
  let location: Location;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [FormsModule, MatFormFieldModule,
        MatCardModule,MatDividerModule,MatSnackBarModule,
        MatButtonModule, BrowserAnimationsModule, HttpClientModule,MatInputModule,
        RouterTestingModule.withRoutes(
          [{path: '', component: dummy}]
        )
      ],
      providers: [{provide: AuthService, useClass: AuthServiceStub}]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain four input box for values', () => {
    let firstName = fixture.debugElement.query(By.css('.firstName'));
    let lastName = fixture.debugElement.query(By.css('.lastName'));
    let userId = fixture.debugElement.query(By.css('.inputId'));
    let password = fixture.debugElement.query(By.css('.inputPass'));
    let registerButton = fixture.debugElement.query(By.css('.registerMe'));
    let clearForm = fixture.debugElement.query(By.css('.clearForm'));

    let userIdInput = userId.nativeElement;
    let passwordInput = password.nativeElement;
    let registerButtonInput = registerButton.nativeElement;
    let clearFormButton = clearForm.nativeElement;

    expect(userIdInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(registerButtonInput).toBeTruthy();
    expect(clearFormButton).toBeTruthy();
  });

  it('should register user and navigate to login then', () => {
    let firstName = fixture.debugElement.query(By.css('.firstName'));
    let lastName = fixture.debugElement.query(By.css('.lastName'));
    let userId = fixture.debugElement.query(By.css('.inputId'));
    let password = fixture.debugElement.query(By.css('.inputPass'));
    let registerButton = fixture.debugElement.query(By.css('.registerMe'));
    let clearForm = fixture.debugElement.query(By.css('.clearForm'));

    let firstNameInput= firstName.nativeElement;
    let lastNameInput= lastName.nativeElement;
    let userIdInput = userId.nativeElement;
    let passwordInput = password.nativeElement;
    let registerButtonInput = registerButton.nativeElement;
    let clearFormButton = clearForm.nativeElement;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      firstNameInput.value= 'test',
      lastNameInput.value='testLast',
      userIdInput.value = 'testuser';
      passwordInput.value = 'testpass';
      userIdInput.dispatchEvent(new Event('inptut'));
      passwordInput.dispatchEvent(new Event('inptut'));
      registerButtonInput.click();
    }).then(() => {
      expect(location.path()).toBe('');
    });
  });
});
