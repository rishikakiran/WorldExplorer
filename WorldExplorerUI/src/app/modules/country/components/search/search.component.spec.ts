import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ContainerComponent } from '../container/container.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { MatCardModule, MatFormFieldModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent , ContainerComponent,
        FavoritesComponent,ThumbnailComponent],
      imports:[
        MatCardModule,FlexLayoutModule, HttpClientModule,
        MatSnackBarModule, MatFormFieldModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
