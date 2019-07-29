import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { SearchComponent } from './components/search/search.component';
import { ContainerComponent } from './components/container/container.component';
import { MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCardModule, MatPaginatorModule, MatGridListModule, MatTableModule, MatListModule, MatDialogModule, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CountryService } from './country.service';
import { InterceptorService } from './interceptor.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { ViewDialogComponent } from './components/view-dialog/view-dialog.component';


@NgModule({
  declarations: [ThumbnailComponent, 
    SearchComponent, 
    ContainerComponent, 
    FavoritesComponent, 
    UpdateDialogComponent, 
    ViewDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CountryRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,
    FormsModule
  ],
  entryComponents:[
    UpdateDialogComponent,
    ViewDialogComponent
  ],
  exports:[
    MatPaginatorModule,
    CountryRoutingModule,
    UpdateDialogComponent,
    ViewDialogComponent
  ],
  providers:[
    CountryService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class CountryModule { }
