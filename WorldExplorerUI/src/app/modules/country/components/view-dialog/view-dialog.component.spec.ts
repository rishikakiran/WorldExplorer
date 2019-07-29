import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDialogComponent } from './view-dialog.component';
import { MatDividerModule, MatSnackBarModule, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material';

describe('ViewDialogComponent', () => {
  let component: ViewDialogComponent;
  let fixture: ComponentFixture<ViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDialogComponent,MatDialogTitle ],
      imports: [
        MatDividerModule,
        MatSnackBarModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
