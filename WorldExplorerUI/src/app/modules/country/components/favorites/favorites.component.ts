import { Component, OnInit } from '@angular/core';
import { Country } from '../../country';
import { CountryService } from '../../country.service';

@Component({
  selector: 'fav-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  private countriesList:Array<Country>;
  constructor(private countryService:CountryService) {
    this.countriesList=[];
   }

  ngOnInit() {
    this.countryService.getFavouriteCountries().subscribe(
      (res)=>{
        this.countriesList=[];
        
        //to get all details of country while displaying
        res.forEach(element => {
          var id: number=element.id;
          this.countryService.searchCountryByFullName(element.name).subscribe(
            (country)=>{
              var countryToAdd:Country=country[0];
              countryToAdd.id=element.id;
              this.countriesList.push(countryToAdd);
            }
          );
        });
        console.log("in fav service : "+JSON.stringify(this.countriesList));
      }
    );
  }

}
