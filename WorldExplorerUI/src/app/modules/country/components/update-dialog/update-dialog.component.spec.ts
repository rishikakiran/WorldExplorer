import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDialogComponent } from './update-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogRef, MatDialogModule } from '@angular/material';

describe('UpdateDialogComponent', () => {
  let component: UpdateDialogComponent;
  let fixture: ComponentFixture<UpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDialogComponent],
      imports:[
        FormsModule, MatFormFieldModule,MatInputModule,
        MatSnackBarModule,MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
