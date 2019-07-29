import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AuthGuardService } from '../../auth-guard.service';

const routes: Routes = [
  {
    path:'countries',
    children:[
      {
        path:'',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path:'search',
        component: SearchComponent,
        canActivate : [AuthGuardService]
      },
      {
        path:'favourites',
        component: FavoritesComponent,
        canActivate : [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
