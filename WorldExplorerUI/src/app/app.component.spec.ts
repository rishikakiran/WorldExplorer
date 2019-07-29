import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { Location } from '@angular/common';
import { MatIconModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routes: Router;
  let location:Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        HttpClientModule,
        MatSnackBarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    routes = TestBed.get(Router);
    fixture = TestBed.createComponent(AppComponent);
     location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'WorldExplorerUI'`, () => {
    expect(component.title).toEqual('WorldExplorerUI');
  });

  it(`should have 'World Explorer' on Mat ToolBar, on click navigate to landing page`, () => {
    
    let header = fixture.debugElement.query(By.css('.title'));

    let headerButton=header.nativeElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // userIdInput.value = 'testuser';
      // passwordInput.value = 'testpass';
      // userIdInput.dispatchEvent(new Event('inptut'));
      // passwordInput.dispatchEvent(new Event('inptut'));
      headerButton.click();
    }).then(() => {
      expect(location.path()).toBe('/');
    });
  });

});
