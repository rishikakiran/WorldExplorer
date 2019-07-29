import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../country.service';
import { Country } from '../../country';

@Component({
  selector: 'fav-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private countriesList: Array<Country>;

  constructor(private countryService:CountryService) { 
    this.countriesList=[];
  }

  ngOnInit() {
  }

  onEnter(search : string){
    this.countryService.searchCountryByName(search).subscribe(
      (countries)=>{
        this.countriesList=[];
        this.countriesList.push(...countries);
      }
    );

    
  }

}
