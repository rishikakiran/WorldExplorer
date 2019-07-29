import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../country';
import { CountryService } from '../../country.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'fav-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input()
  private isFavourite:boolean;
  @Input()
  private countriesList:Array<Country>;

  constructor(private countryService: CountryService,
  private snackBar: MatSnackBar) {
    // console.log("in container "+JSON.stringify(this.countriesList));
    this.isFavourite=false;
   }

  ngOnInit() {
  }

  addToFavlist(country:Country){
    this.countryService.saveCountryToFavorites(country).subscribe(
      (res)=>{
        this.snackBar.open(`Successfully Added ${country.name} to Favorites!!`,'',{
          duration: 1000
        });
      },
      (err)=>{
        this.snackBar.open(`${country.name} Already Exists In Favorites!!`,'',{
          duration: 1000
        });
      }
    );
  }

  deleteFromFavorites(country:Country){
    // alert("called delete "+JSON.stringify(country));
    this.countryService.deleteFavouriteCountries(country.id).subscribe(
      (res)=>{
        this.snackBar.open(`Successfully Deleted ${country.name} to Favorites!!`,'',{
          duration: 1000
        });
      }

    );


    const index=this.countriesList.indexOf(country);
    this.countriesList.splice(index,1);
  }
}
